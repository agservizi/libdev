import { type NextRequest, NextResponse } from "next/server"
import { getProjectBySlug, updateProject, deleteProject } from "@/data/projects-data"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const project = getProjectBySlug(slug)

    if (!project) {
      return NextResponse.json({ error: `Progetto '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error("Errore durante il recupero del progetto:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero del progetto" },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const data = await request.json()

    // Aggiorna il progetto
    const updatedProject = updateProject(slug, data)

    if (!updatedProject) {
      return NextResponse.json({ error: `Progetto '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ project: updatedProject, message: "Progetto aggiornato con successo" })
  } catch (error) {
    console.error("Errore durante l'aggiornamento del progetto:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante l'aggiornamento del progetto" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Elimina il progetto
    const success = deleteProject(slug)

    if (!success) {
      return NextResponse.json({ error: `Progetto '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ message: "Progetto eliminato con successo" })
  } catch (error) {
    console.error("Errore durante l'eliminazione del progetto:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante l'eliminazione del progetto" },
      { status: 500 },
    )
  }
}
