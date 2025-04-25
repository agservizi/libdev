// Script per la migrazione e verifica del database

import { PrismaClient } from "@prisma/client"
import { getDatabaseConfig } from "./database-config"
import { applyDatabaseSchema } from "./apply-schema"
import { execSync } from "child_process"
import path from "path"
import fs from "fs"

// Funzione per verificare lo schema del database
export async function verifyDatabaseSchema(): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const prisma = new PrismaClient()

    try {
      // Verifica se le tabelle esistono
      const tablesExist = await checkTablesExist(prisma)

      if (!tablesExist) {
        console.log("Le tabelle non esistono. Applicazione dello schema...")
        await prisma.$disconnect()

        // Applica lo schema SQL
        return await applyDatabaseSchema()
      }

      // Verifica se lo schema è aggiornato
      const schemaIsUpToDate = await checkSchemaVersion(prisma)

      if (!schemaIsUpToDate) {
        console.log("Lo schema non è aggiornato. Applicazione degli aggiornamenti...")
        await prisma.$disconnect()

        // Applica lo schema SQL
        return await applyDatabaseSchema()
      }

      return { success: true, message: "Schema del database verificato e aggiornato" }
    } finally {
      await prisma.$disconnect()
    }
  } catch (error) {
    console.error("Errore nella verifica dello schema del database:", error)
    return {
      success: false,
      message: "Errore nella verifica dello schema del database",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Funzione per verificare se le tabelle esistono
async function checkTablesExist(prisma: PrismaClient): Promise<boolean> {
  try {
    // Verifica l'esistenza della tabella Project
    await prisma.project.findFirst()
    return true
  } catch (error) {
    // Se la query fallisce, probabilmente la tabella non esiste
    return false
  }
}

// Funzione per verificare la versione dello schema
async function checkSchemaVersion(prisma: PrismaClient): Promise<boolean> {
  try {
    // Verifica se esiste la tabella Setting
    const settingExists = await prisma.setting.findUnique({
      where: { id: "schemaVersion" },
    })

    if (!settingExists) {
      // Crea la versione dello schema
      await prisma.setting.create({
        data: {
          id: "schemaVersion",
          value: { version: 1, updatedAt: new Date().toISOString() },
        },
      })
      return false
    }

    // Verifica la versione dello schema
    const currentVersion = 1 // Incrementa questa versione quando lo schema cambia
    const dbVersion = (settingExists.value as any).version || 0

    if (dbVersion < currentVersion) {
      // Aggiorna la versione dello schema
      await prisma.setting.update({
        where: { id: "schemaVersion" },
        data: {
          value: { version: currentVersion, updatedAt: new Date().toISOString() },
        },
      })
      return false
    }

    return true
  } catch (error) {
    console.error("Errore nella verifica della versione dello schema:", error)
    return false
  }
}

// Funzione per eseguire le migrazioni Prisma
export async function runPrismaMigrations(): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    // Verifica se siamo in ambiente di produzione
    const isProduction = process.env.NODE_ENV === "production"

    // Comando per le migrazioni
    const command = isProduction ? "npx prisma migrate deploy" : "npx prisma migrate dev --name init"

    // Esegui il comando
    execSync(command, { stdio: "inherit" })

    return {
      success: true,
      message: `Migrazioni Prisma eseguite con successo in ambiente ${isProduction ? "production" : "development"}`,
    }
  } catch (error) {
    console.error("Errore nell'esecuzione delle migrazioni Prisma:", error)
    return {
      success: false,
      message: "Errore nell'esecuzione delle migrazioni Prisma",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Funzione per testare la connessione al database
export async function testDatabaseConnection(): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const prisma = new PrismaClient()

    try {
      // Esegui una query semplice
      await prisma.$queryRaw`SELECT 1 as test`
      return { success: true, message: "Connessione al database riuscita" }
    } finally {
      await prisma.$disconnect()
    }
  } catch (error) {
    console.error("Errore di connessione al database:", error)
    return {
      success: false,
      message: "Errore di connessione al database",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Funzione per creare un backup del database
export async function backupDatabase(): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const config = getDatabaseConfig()
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const backupDir = path.join(process.cwd(), "backups")
    const backupFile = path.join(backupDir, `backup-${timestamp}.sql`)

    // Crea la directory dei backup se non esiste
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    // Esegui il backup con pg_dump
    if (config.provider === "postgresql") {
      const connectionString = config.url
      execSync(`pg_dump "${connectionString}" > "${backupFile}"`, { stdio: "inherit" })
    } else {
      return {
        success: false,
        message: `Backup non supportato per il provider ${config.provider}`,
        error: "Provider non supportato",
      }
    }

    return {
      success: true,
      message: `Backup del database creato con successo: ${backupFile}`,
    }
  } catch (error) {
    console.error("Errore nella creazione del backup del database:", error)
    return {
      success: false,
      message: "Errore nella creazione del backup del database",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Esegui lo script se chiamato direttamente
if (require.main === module) {
  ;(async () => {
    console.log("Verifica della connessione al database...")
    const connectionTest = await testDatabaseConnection()
    console.log(connectionTest.message)

    if (connectionTest.success) {
      console.log("Verifica dello schema del database...")
      const schemaCheck = await verifyDatabaseSchema()
      console.log(schemaCheck.message)

      if (schemaCheck.success) {
        console.log("Esecuzione delle migrazioni Prisma...")
        const migrationsResult = await runPrismaMigrations()
        console.log(migrationsResult.message)
      }
    }
  })()
}
