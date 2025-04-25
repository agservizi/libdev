/**
 * Utility per rilevare e gestire gli ambienti di Vercel
 */

/**
 * Verifica se l'applicazione è in esecuzione su Vercel
 */
export function isVercel(): boolean {
  return process.env.VERCEL === "1"
}

/**
 * Verifica se l'applicazione è in esecuzione in un ambiente di preview di Vercel
 */
export function isVercelPreview(): boolean {
  return isVercel() && process.env.VERCEL_ENV === "preview"
}

/**
 * Verifica se l'applicazione è in esecuzione in un ambiente di produzione di Vercel
 */
export function isVercelProduction(): boolean {
  return isVercel() && process.env.VERCEL_ENV === "production"
}

/**
 * Verifica se l'applicazione è in esecuzione in un ambiente di sviluppo di Vercel
 */
export function isVercelDevelopment(): boolean {
  return isVercel() && process.env.VERCEL_ENV === "development"
}

/**
 * Ottiene l'URL di base dell'applicazione su Vercel
 */
export function getVercelUrl(): string {
  if (!isVercel()) {
    return "http://localhost:3000"
  }

  const vercelUrl = process.env.VERCEL_URL
  if (!vercelUrl) {
    return "http://localhost:3000"
  }

  return `https://${vercelUrl}`
}

/**
 * Ottiene l'ID del deployment di Vercel
 */
export function getVercelDeploymentId(): string | undefined {
  return process.env.VERCEL_DEPLOYMENT_ID
}

/**
 * Ottiene l'ID del progetto di Vercel
 */
export function getVercelProjectId(): string | undefined {
  return process.env.VERCEL_PROJECT_ID
}

/**
 * Ottiene l'ID del team di Vercel
 */
export function getVercelTeamId(): string | undefined {
  return process.env.VERCEL_TEAM_ID
}

/**
 * Ottiene l'ID della regione di Vercel
 */
export function getVercelRegion(): string | undefined {
  return process.env.VERCEL_REGION
}
