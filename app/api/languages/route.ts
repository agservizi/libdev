import { type NextRequest, NextResponse } from "next/server"
import { programmingData } from "@/data/programming-data-server"

// GET - Ottieni tutti i linguaggi
export async function GET(request: NextRequest) {
  return NextResponse.json({ languages: Object.keys(programmingData.languages) })
}

// POST - Aggiungi un nuovo linguaggio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, documentation, commands } = body

    if (!name || !documentation || !commands || !Array.isArray(commands)) {
      return NextResponse.json(
        { error: "Dati mancanti o non validi. Richiesti: name, documentation, commands (array)" },
        { status: 400 },
      )
    }

    // Verifica se il linguaggio esiste già
    if (programmingData.languages[name]) {
      return NextResponse.json({ error: `Il linguaggio '${name}' esiste già` }, { status: 409 })
    }

    // Aggiungi il nuovo linguaggio
    programmingData.languages[name] = {
      documentation,
      commands,
    }

    return NextResponse.json({ message: `Linguaggio '${name}' aggiunto con successo`, language: name }, { status: 201 })
  } catch (error) {
    console.error("Errore durante l'aggiunta del linguaggio:", error)
    return NextResponse.json({ error: "Errore durante l'elaborazione della richiesta" }, { status: 500 })
  }
}
