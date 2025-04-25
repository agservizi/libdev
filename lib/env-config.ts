// Configurazione delle variabili d'ambiente

import fs from "fs"
import path from "path"
import dotenv from "dotenv"

// Funzione per caricare le variabili d'ambiente
export function loadEnvConfig(): { isValid: boolean; missing: string[] } {
  // Variabili d'ambiente richieste
  const requiredEnvVars = ["DATABASE_URL"]
  const missing: string[] = []

  // Carica il file .env se esiste
  const envPath = path.join(process.cwd(), ".env")
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
  }

  // Carica il file .env.local se esiste
  const envLocalPath = path.join(process.cwd(), ".env.local")
  if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath })
  }

  // Verifica le variabili d'ambiente richieste
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  }

  return {
    isValid: missing.length === 0,
    missing,
  }
}

// Funzione per ottenere una variabile d'ambiente con fallback
export function getEnvVar(name: string, fallback = ""): string {
  return process.env[name] || fallback
}

// Funzione per verificare se siamo in ambiente di produzione
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production"
}

// Funzione per verificare se siamo in ambiente di sviluppo
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development" || !process.env.NODE_ENV
}

// Funzione per verificare se siamo in ambiente di test
export function isTest(): boolean {
  return process.env.NODE_ENV === "test"
}

// Esporta le variabili d'ambiente tipizzate
export const ENV = {
  NODE_ENV: getEnvVar("NODE_ENV", "development"),
  DATABASE_URL: getEnvVar("DATABASE_URL", ""),
  POSTGRES_PRISMA_URL: getEnvVar("POSTGRES_PRISMA_URL", ""),
  POSTGRES_URL: getEnvVar("POSTGRES_URL", ""),
  DATABASE_URL_NEON: getEnvVar("DATABASE_URL_NEON", ""),
  NEON_DATABASE_URL: getEnvVar("NEON_DATABASE_URL", ""),
  PORT: Number.parseInt(getEnvVar("PORT", "3000"), 10),
  API_URL: getEnvVar("API_URL", "http://localhost:3000/api"),
  APP_URL: getEnvVar("APP_URL", "http://localhost:3000"),
}
