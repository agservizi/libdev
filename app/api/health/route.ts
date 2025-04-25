import { NextResponse } from "next/server"
import { isVercelPreview } from "@/lib/vercel-utils"
import prisma from "@/lib/db"

export async function GET() {
  // Se siamo in un ambiente di preview di Vercel, restituisci uno stato di salute simulato
  if (isVercelPreview()) {
    return NextResponse.json({
      status: "ok",
      environment: "vercel-preview",
      database: "mock",
      timestamp: new Date().toISOString(),
    })
  }

  try {
    // Verifica la connessione al database
    await prisma.$queryRaw`SELECT 1`

    // Restituisci lo stato di salute
    return NextResponse.json({
      status: "ok",
      environment: process.env.NODE_ENV,
      database: "connected",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    // Gestisci gli errori
    console.error("Errore di connessione al database:", error)

    // Restituisci uno stato di errore
    return NextResponse.json(
      {
        status: "error",
        environment: process.env.NODE_ENV,
        database: "disconnected",
        error: error instanceof Error ? error.message : "Errore sconosciuto",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
