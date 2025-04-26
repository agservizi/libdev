import { type NextRequest, NextResponse } from "next/server"
import { getAllTutorials, getTutorialsByLanguage, getTutorialsByLevel, createTutorial } from "@/data/tutorials-data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const language = searchParams.get("language")
    const level = searchParams.get("level") as "principiante" | "intermedio" | "avanzato" | null

    let tutorials = getAllTutorials()

    // Filtra per linguaggio se specificato
    if (language) {
      tutorials = getTutorialsByLanguage(language)
    }

    // Filtra per livello se specificato
    if (level) {
      tutorials = getTutorialsByLevel(level)
    }

    return NextResponse.json({ tutorials })
  } catch (error) {
    console.error("Errore durante il recupero dei tutorial:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero dei tutorial" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validazione dei dati
    if (!data.title || !data.description || !data.language || !data.level || !data.slug) {
      return NextResponse.json(
        { error: true, message: "Dati mancanti. Titolo, descrizione, linguaggio, livello e slug sono obbligatori" },
        { status: 400 },
      )
    }

    // Crea il nuovo tutorial
    const newTutorial = createTutorial(data)

    return NextResponse.json({ tutorial: newTutorial, message: "Tutorial creato con successo" }, { status: 201 })
  } catch (error) {
    console.error("Errore durante la creazione del tutorial:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante la creazione del tutorial" },
      { status: 500 },
    )
  }
}
