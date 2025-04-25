import { type NextRequest, NextResponse } from "next/server"
import { programmingData } from "@/data/programming-data-server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const queryParam = searchParams.get("q")
    // Assicuriamoci che queryParam sia una stringa prima di chiamare toLowerCase()
    const query = typeof queryParam === "string" ? queryParam.toLowerCase() : ""

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] })
    }

    const suggestions: string[] = []

    // Verifichiamo che programmingData e programmingData.languages esistano
    if (!programmingData || !programmingData.languages) {
      throw new Error("Dati di programmazione non disponibili")
    }

    // Aggiungi i nomi dei linguaggi come suggerimenti
    Object.keys(programmingData.languages).forEach((language) => {
      if (!language) return

      const languageLower = String(language).toLowerCase()
      if (languageLower.includes(query) && !suggestions.includes(language)) {
        suggestions.push(language)
      }
    })

    // Aggiungi i nomi dei comandi come suggerimenti
    Object.values(programmingData.languages).forEach((data) => {
      if (!data || !Array.isArray(data.commands)) return

      data.commands.forEach((command) => {
        if (!command || !command.name) return

        const commandNameLower = String(command.name).toLowerCase()
        if (commandNameLower.includes(query) && !suggestions.includes(command.name)) {
          suggestions.push(command.name)
        }
      })
    })

    // Limita a 10 suggerimenti
    return NextResponse.json({ suggestions: suggestions.slice(0, 10) })
  } catch (error) {
    console.error("Errore durante l'elaborazione dei suggerimenti:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante l'elaborazione dei suggerimenti", suggestions: [] },
      { status: 500 },
    )
  }
}
