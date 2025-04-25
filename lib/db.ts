// Importa la configurazione del database
import { getDatabaseConfig } from "./database-config"
import { PrismaClient } from "@prisma/client"
import { initDatabase, getDatabaseInitStatus } from "./init-database"
import { isVercelPreview } from "./vercel-utils"

// Verifica se siamo in un ambiente di preview di Vercel
const isPreview = isVercelPreview()

// Crea un'istanza di PrismaClient con la configurazione appropriata
const config = getDatabaseConfig()

// Configura le opzioni di Prisma
const prismaClientSingleton = () => {
  // Se siamo in un ambiente di preview di Vercel, restituisci un client mock
  if (isPreview) {
    console.warn("Prisma è disabilitato nell'ambiente di preview di Vercel. Utilizzo del client mock.")
    return createMockPrismaClient()
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: config.url,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    errorFormat: "pretty",
  })
}

// Definisci il tipo per il client Prisma
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// Gestisci il singleton di PrismaClient per evitare troppe connessioni in sviluppo
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

// Esporta il client Prisma
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// In ambiente di sviluppo, mantieni il client Prisma come singleton
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

// Inizializza il database all'avvio dell'applicazione, ma solo se non siamo in un ambiente di preview
if (!getDatabaseInitStatus() && !isPreview) {
  initDatabase().catch(console.error)
}

// Funzione per creare un client Prisma mock per gli ambienti di preview
function createMockPrismaClient() {
  // Implementa un client mock che restituisce dati di esempio
  const mockData = {
    projects: [
      {
        id: "mock-project-1",
        name: "Progetto di esempio",
        description: "Questo è un progetto di esempio per l'ambiente di preview",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    files: [
      {
        id: "mock-file-1",
        name: "esempio.js",
        path: "/esempio.js",
        content: "console.log('Questo è un file di esempio');",
        language: "javascript",
        lastModified: new Date(),
        projectId: "mock-project-1",
      },
    ],
    // Aggiungi altri dati mock per le altre tabelle
  }

  // Crea un proxy che simula le operazioni di Prisma
  return {
    project: {
      findMany: async () => mockData.projects,
      findUnique: async ({ where }: any) => mockData.projects.find((p) => p.id === where.id),
      create: async ({ data }: any) => ({
        ...data,
        id: `mock-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      update: async ({ where, data }: any) => {
        const project = mockData.projects.find((p) => p.id === where.id)
        return { ...project, ...data, updatedAt: new Date() }
      },
      delete: async ({ where }: any) => {
        const project = mockData.projects.find((p) => p.id === where.id)
        return project
      },
    },
    file: {
      findMany: async ({ where }: any) => {
        if (where?.projectId) {
          return mockData.files.filter((f) => f.projectId === where.projectId)
        }
        return mockData.files
      },
      findUnique: async ({ where }: any) => mockData.files.find((f) => f.id === where.id),
      create: async ({ data }: any) => ({ ...data, id: `mock-${Date.now()}`, lastModified: new Date() }),
      update: async ({ where, data }: any) => {
        const file = mockData.files.find((f) => f.id === where.id)
        return { ...file, ...data, lastModified: new Date() }
      },
      delete: async ({ where }: any) => {
        const file = mockData.files.find((f) => f.id === where.id)
        return file
      },
    },
    // Implementa altri modelli secondo necessità
    $connect: async () => Promise.resolve(),
    $disconnect: async () => Promise.resolve(),
  }
}

export default prisma
