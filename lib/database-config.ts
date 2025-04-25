/**
 * Configurazione del database
 */
import { getVercelConfig } from "./vercel-config"
import { ENV } from "./env-config"

/**
 * Ottiene la configurazione del database
 */
export function getDatabaseConfig() {
  // Ottieni la configurazione di Vercel
  const vercelConfig = getVercelConfig()

  // Se siamo in un ambiente di preview di Vercel, disabilita il database
  if (!vercelConfig.useDatabase) {
    return {
      enabled: false,
      url: "",
      provider: "mock",
    }
  }

  // Cerca l'URL del database in diverse variabili d'ambiente
  const databaseUrl =
    ENV.DATABASE_URL || ENV.POSTGRES_PRISMA_URL || ENV.POSTGRES_URL || ENV.DATABASE_URL_NEON || ENV.NEON_DATABASE_URL

  // Se non è stato trovato un URL del database, disabilita il database
  if (!databaseUrl) {
    console.warn("Nessun URL del database trovato. Il database è disabilitato.")
    return {
      enabled: false,
      url: "",
      provider: "mock",
    }
  }

  // Determina il provider del database in base all'URL
  let provider = "postgresql"
  if (databaseUrl.startsWith("mysql://")) {
    provider = "mysql"
  } else if (databaseUrl.startsWith("sqlite:")) {
    provider = "sqlite"
  }

  // Restituisci la configurazione del database
  return {
    enabled: true,
    url: databaseUrl,
    provider,
  }
}
