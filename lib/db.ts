// Questo file gestisce la connessione al database

import { PrismaClient } from "@prisma/client"

// Previene la creazione di multiple connessioni in sviluppo
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management

declare global {
  var prisma: PrismaClient | undefined
}

const client = new PrismaClient()

export const prisma = global.prisma || client

if (process.env.NODE_ENV !== "production") global.prisma = prisma

export default prisma
