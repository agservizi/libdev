import { type NextRequest, NextResponse } from "next/server"
import { getAllProjects, getProjectsByLanguage, getProjectsByLevel, createProject } from "@/data/projects-data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const language = searchParams.get("language")
    const level = searchParams.get("level") as "principiante" | "intermedio" | "avanzato" | null

    let projects = getAllProjects()

    // Filtra per linguaggio se specificato
    if (language) {
      projects = getProjectsByLanguage(language)
    }

    // Filtra per livello se specificato
    if (level) {
      projects = getProjectsByLevel(level)
    }

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Errore durante il recupero dei progetti:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero dei progetti" },
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

    // Crea il nuovo progetto
    const newProject = createProject(data)

    return NextResponse.json({ project: newProject, message: "Progetto creato con successo" }, { status: 201 })
  } catch (error) {
    console.error("Errore durante la creazione del progetto:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante la creazione del progetto" },
      { status: 500 },
    )
  }
}
