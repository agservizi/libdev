// Script per applicare lo schema SQL al database

import fs from "fs"
import path from "path"
import { PrismaClient } from "@prisma/client"
import { getDatabaseConfig } from "./database-config"

// Funzione per leggere il file SQL
function readSqlFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.error(`Errore nella lettura del file SQL ${filePath}:`, error)
    throw error
  }
}

// Funzione per dividere il file SQL in singole query
function splitSqlQueries(sql: string): string[] {
  // Dividi per punto e virgola, ma ignora i punti e virgola all'interno di funzioni e trigger
  const queries: string[] = []
  let currentQuery = ""
  let inFunction = false
  let inString = false
  let stringDelimiter = ""

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i]
    const nextChar = sql[i + 1] || ""

    // Gestione delle stringhe
    if ((char === "'" || char === '"') && (i === 0 || sql[i - 1] !== "\\")) {
      if (!inString) {
        inString = true
        stringDelimiter = char
      } else if (char === stringDelimiter) {
        inString = false
      }
    }

    // Ignora tutto ciò che è all'interno di stringhe
    if (inString) {
      currentQuery += char
      continue
    }

    // Gestione delle funzioni e trigger
    if (char === "$" && nextChar === "$") {
      inFunction = !inFunction
      currentQuery += char
      continue
    }

    // Gestione del punto e virgola
    if (char === ";" && !inFunction) {
      currentQuery += char
      const trimmedQuery = currentQuery.trim()
      if (trimmedQuery) {
        queries.push(trimmedQuery)
      }
      currentQuery = ""
    } else {
      currentQuery += char
    }
  }

  // Aggiungi l'ultima query se presente
  const trimmedQuery = currentQuery.trim()
  if (trimmedQuery) {
    queries.push(trimmedQuery)
  }

  return queries.filter((q) => q.length > 0)
}

// Funzione per eseguire le query SQL
async function executeSqlQueries(queries: string[]): Promise<void> {
  const prisma = new PrismaClient()

  try {
    for (const query of queries) {
      if (query.trim()) {
        try {
          await prisma.$executeRawUnsafe(query)
          console.log("Query eseguita con successo:", query.substring(0, 50) + "...")
        } catch (error) {
          console.error("Errore nell'esecuzione della query:", query.substring(0, 100) + "...")
          console.error("Dettaglio errore:", error)
          // Continua con le altre query anche se una fallisce
        }
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

// Funzione principale per applicare lo schema
export async function applyDatabaseSchema(): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    // Verifica la configurazione del database
    const config = getDatabaseConfig()
    if (!config.url) {
      return {
        success: false,
        message: "URL del database non trovato nelle variabili d'ambiente",
        error: "DATABASE_URL non definito",
      }
    }

    // Leggi il file SQL
    const schemaPath = path.join(process.cwd(), "prisma", "schema.sql")
    const schemaSql = readSqlFile(schemaPath)

    // Dividi in query
    const queries = splitSqlQueries(schemaSql)
    console.log(`Trovate ${queries.length} query da eseguire`)

    // Esegui le query
    await executeSqlQueries(queries)

    return {
      success: true,
      message: `Schema del database applicato con successo. Eseguite ${queries.length} query.`,
    }
  } catch (error) {
    console.error("Errore nell'applicazione dello schema del database:", error)
    return {
      success: false,
      message: "Errore nell'applicazione dello schema del database",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Esegui lo script se chiamato direttamente
if (require.main === module) {
  applyDatabaseSchema()
    .then((result) => {
      console.log(result.message)
      process.exit(result.success ? 0 : 1)
    })
    .catch((error) => {
      console.error("Errore imprevisto:", error)
      process.exit(1)
    })
}
