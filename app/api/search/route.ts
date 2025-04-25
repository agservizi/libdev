import { type NextRequest, NextResponse } from "next/server"
import { programmingData } from "@/data/programming-data-server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const queryParam = searchParams.get("q")
    // Assicuriamoci che queryParam sia una stringa prima di chiamare toLowerCase()
    const query = typeof queryParam === "string" ? queryParam.toLowerCase() : ""

    if (!query) {
      return NextResponse.json({ languages: {} })
    }

    const results: any = { languages: {} }

    // Verifichiamo che programmingData e programmingData.languages esistano
    if (!programmingData || !programmingData.languages) {
      throw new Error("Dati di programmazione non disponibili")
    }

    // Cerca in tutti i linguaggi e comandi
    Object.entries(programmingData.languages).forEach(([language, data]) => {
      // Verifichiamo che language sia una stringa valida
      if (!language) return

      // Controlla se il nome del linguaggio corrisponde alla query
      const languageLower = String(language).toLowerCase()
      const languageMatches = languageLower.includes(query)

      // Verifichiamo che data e data.commands esistano
      if (!data || !Array.isArray(data.commands)) {
        return
      }

      // Filtra i comandi che corrispondono alla query
      const matchingCommands = data.commands.filter((command) => {
        // Verifichiamo che tutti i campi del comando esistano prima di chiamare toLowerCase()
        if (!command) return false

        const nameMatch = command.name && String(command.name).toLowerCase().includes(query)
        const descMatch = command.description && String(command.description).toLowerCase().includes(query)
        const syntaxMatch = command.syntax && String(command.syntax).toLowerCase().includes(query)
        const exampleMatch = command.example && String(command.example).toLowerCase().includes(query)

        return nameMatch || descMatch || syntaxMatch || exampleMatch
      })

      // Aggiungi il linguaggio ai risultati se corrisponde o ha comandi corrispondenti
      if (languageMatches || matchingCommands.length > 0) {
        // Verifichiamo che documentation esista
        const documentation = data.documentation || "#"

        results.languages[language] = {
          commands: languageMatches ? data.commands : matchingCommands,
          documentation: documentation,
        }
      }
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error("Errore durante l'elaborazione della ricerca:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante l'elaborazione della ricerca" },
      { status: 500 },
    )
  }
}
