import { type NextRequest, NextResponse } from "next/server"
import { programmingData } from "@/data/programming-data-server"

// GET - Ottieni statistiche sui linguaggi
export async function GET(request: NextRequest) {
  try {
    const stats = {
      totalLanguages: 0,
      totalCommands: 0,
      languageStats: [] as Array<{
        name: string
        commandCount: number
        categories: number
      }>,
    }

    // Calcola le statistiche
    stats.totalLanguages = Object.keys(programmingData.languages).length

    Object.entries(programmingData.languages).forEach(([language, data]) => {
      if (!data || !Array.isArray(data.commands)) return

      const commandCount = data.commands.length
      stats.totalCommands += commandCount

      // Calcola le categorie uniche (usando la prima parola della descrizione)
      const categories = new Set<string>()
      data.commands.forEach((command) => {
        if (command.description) {
          const firstWord = command.description.split(" ")[0]
          categories.add(firstWord)
        }
      })

      stats.languageStats.push({
        name: language,
        commandCount,
        categories: categories.size,
      })
    })

    // Ordina per numero di comandi (decrescente)
    stats.languageStats.sort((a, b) => b.commandCount - a.commandCount)

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Errore durante il recupero delle statistiche:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero delle statistiche" },
      { status: 500 },
    )
  }
}
