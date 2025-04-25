// Inizializzazione del database all'avvio dell'applicazione

import { loadEnvConfig } from "./env-config"
import { testDatabaseConnection, verifyDatabaseSchema, runPrismaMigrations } from "./migrate-database"

// Variabile per tenere traccia dello stato di inizializzazione
let isInitialized = false

// Funzione per inizializzare il database
export async function initDatabase() {
  console.log("Inizializzazione del database...")

  // Carica le variabili d'ambiente
  const envCheck = loadEnvConfig()
  if (!envCheck.isValid) {
    console.warn(`Variabili d'ambiente mancanti: ${envCheck.missing.join(", ")}`)
    console.warn("Verrà utilizzata la configurazione di fallback")
  }

  // Verifica la connessione al database
  const connectionTest = await testDatabaseConnection()
  if (!connectionTest.success) {
    console.error("Impossibile connettersi al database:", connectionTest.error)
    console.error("L'applicazione potrebbe non funzionare correttamente")
    return false
  }

  // Verifica e ripara lo schema del database se necessario
  const schemaCheck = await verifyDatabaseSchema()
  if (!schemaCheck.success) {
    console.error("Errore nella verifica dello schema del database:", schemaCheck.error)
    console.error("L'applicazione potrebbe non funzionare correttamente")
    return false
  }

  // Esegui le migrazioni Prisma se necessario
  try {
    const migrationsResult = await runPrismaMigrations()
    if (!migrationsResult.success) {
      console.warn("Avviso durante l'esecuzione delle migrazioni:", migrationsResult.error)
      // Continua comunque, potrebbe funzionare lo stesso
    }
  } catch (error) {
    console.warn("Errore durante l'esecuzione delle migrazioni:", error)
    // Continua comunque, potrebbe funzionare lo stesso
  }

  // Imposta lo stato di inizializzazione
  isInitialized = true
  console.log("Database inizializzato con successo")
  return true
}

// Esporta una funzione per ottenere lo stato di inizializzazione
export function getDatabaseInitStatus() {
  return isInitialized
}

// Esporta una funzione per impostare lo stato di inizializzazione
export function setDatabaseInitStatus(status: boolean) {
  isInitialized = status
}

// Inizializza il database se questo file viene eseguito direttamente
if (require.main === module) {
  initDatabase()
    .then((success) => {
      if (success) {
        console.log("Inizializzazione completata con successo")
        process.exit(0)
      } else {
        console.error("Inizializzazione fallita")
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error("Errore durante l'inizializzazione:", error)
      process.exit(1)
    })
}
