import { type NextRequest, NextResponse } from "next/server"
import { programmingData } from "@/data/programming-data-server"

// GET - Ottieni tutte le categorie di comandi per tutti i linguaggi
export async function GET(request: NextRequest) {
  try {
    const categories: Record<string, string[]> = {}

    // Per ogni linguaggio, categorizza i comandi
    Object.entries(programmingData.languages).forEach(([language, data]) => {
      if (!data || !Array.isArray(data.commands)) return

      // Estrai le categorie dai comandi
      const languageCategories = new Set<string>()

      data.commands.forEach((command) => {
        // Utilizziamo la prima parola della descrizione come categoria
        // In un sistema reale, avresti categorie predefinite o tag
        if (command.description) {
          const firstWord = command.description.split(" ")[0]
          languageCategories.add(firstWord)
        }
      })

      categories[language] = Array.from(languageCategories)
    })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Errore durante il recupero delle categorie:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero delle categorie" },
      { status: 500 },
    )
  }
}
