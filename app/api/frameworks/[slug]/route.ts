import { type NextRequest, NextResponse } from "next/server"
import { getFrameworkBySlug, updateFramework, deleteFramework } from "@/data/frameworks-data"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const framework = getFrameworkBySlug(slug)

    if (!framework) {
      return NextResponse.json({ error: `Framework '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ framework })
  } catch (error) {
    console.error("Errore durante il recupero del framework:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero del framework" },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const data = await request.json()

    // Aggiorna il framework
    const updatedFramework = updateFramework(slug, data)

    if (!updatedFramework) {
      return NextResponse.json({ error: `Framework '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ framework: updatedFramework, message: "Framework aggiornato con successo" })
  } catch (error) {
    console.error("Errore durante l'aggiornamento del framework:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante l'aggiornamento del framework" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Elimina il framework
    const success = deleteFramework(slug)

    if (!success) {
      return NextResponse.json({ error: `Framework '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ message: "Framework eliminato con successo" })
  } catch (error) {
    console.error("Errore durante l'eliminazione del framework:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante l'eliminazione del framework" },
      { status: 500 },
    )
  }
}
