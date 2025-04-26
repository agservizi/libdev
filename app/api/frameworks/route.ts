import { type NextRequest, NextResponse } from "next/server"
import {
  getAllFrameworks,
  getFrameworksByLanguage,
  getFrameworksByCategory,
  createFramework,
} from "@/data/frameworks-data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const language = searchParams.get("language")
    const category = searchParams.get("category")

    let frameworks = getAllFrameworks()

    // Filtra per linguaggio se specificato
    if (language) {
      frameworks = getFrameworksByLanguage(language)
    }

    // Filtra per categoria se specificata
    if (category) {
      frameworks = getFrameworksByCategory(category)
    }

    return NextResponse.json({ frameworks })
  } catch (error) {
    console.error("Errore durante il recupero dei framework:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero dei framework" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validazione dei dati
    if (!data.name || !data.description || !data.language || !data.category || !data.slug) {
      return NextResponse.json(
        { error: true, message: "Dati mancanti. Nome, descrizione, linguaggio, categoria e slug sono obbligatori" },
        { status: 400 },
      )
    }

    // Crea il nuovo framework
    const newFramework = createFramework(data)

    return NextResponse.json({ framework: newFramework, message: "Framework creato con successo" }, { status: 201 })
  } catch (error) {
    console.error("Errore durante la creazione del framework:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante la creazione del framework" },
      { status: 500 },
    )
  }
}
