/**
 * Configurazione specifica per Vercel
 */
import { isVercelPreview, isVercelProduction, isVercelDevelopment } from "./vercel-utils"

/**
 * Ottiene la configurazione specifica per l'ambiente Vercel corrente
 */
export function getVercelConfig() {
  // Configurazione di base
  const config = {
    usePrisma: true,
    useDatabase: true,
    useMockData: false,
    cacheEnabled: true,
    logLevel: "error",
  }

  // Configurazione specifica per l'ambiente di preview
  if (isVercelPreview()) {
    return {
      ...config,
      usePrisma: false, // Disabilita Prisma nelle preview
      useDatabase: false, // Disabilita l'accesso al database nelle preview
      useMockData: true, // Usa dati mock nelle preview
      cacheEnabled: true, // Abilita la cache nelle preview
      logLevel: "warn",
    }
  }

  // Configurazione specifica per l'ambiente di produzione
  if (isVercelProduction()) {
    return {
      ...config,
      usePrisma: true,
      useDatabase: true,
      useMockData: false,
      cacheEnabled: true,
      logLevel: "error",
    }
  }

  // Configurazione specifica per l'ambiente di sviluppo
  if (isVercelDevelopment()) {
    return {
      ...config,
      usePrisma: true,
      useDatabase: true,
      useMockData: false,
      cacheEnabled: false,
      logLevel: "info",
    }
  }

  // Configurazione predefinita per ambienti non-Vercel
  return config
}
