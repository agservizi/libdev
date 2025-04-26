import { type NextRequest, NextResponse } from "next/server"
import { getTutorialBySlug, updateTutorial, deleteTutorial } from "@/data/tutorials-data"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const tutorial = getTutorialBySlug(slug)

    if (!tutorial) {
      return NextResponse.json({ error: `Tutorial '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ tutorial })
  } catch (error) {
    console.error("Errore durante il recupero del tutorial:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero del tutorial" },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const data = await request.json()

    // Aggiorna il tutorial
    const updatedTutorial = updateTutorial(slug, data)

    if (!updatedTutorial) {
      return NextResponse.json({ error: `Tutorial '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ tutorial: updatedTutorial, message: "Tutorial aggiornato con successo" })
  } catch (error) {
    console.error("Errore durante l'aggiornamento del tutorial:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante l'aggiornamento del tutorial" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Elimina il tutorial
    const success = deleteTutorial(slug)

    if (!success) {
      return NextResponse.json({ error: `Tutorial '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ message: "Tutorial eliminato con successo" })
  } catch (error) {
    console.error("Errore durante l'eliminazione del tutorial:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante l'eliminazione del tutorial" },
      { status: 500 },
    )
  }
}
