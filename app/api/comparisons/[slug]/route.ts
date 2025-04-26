import { type NextRequest, NextResponse } from "next/server"
import { getLanguageComparisonBySlug } from "@/data/frameworks-data"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const comparison = getLanguageComparisonBySlug(slug)

    if (!comparison) {
      return NextResponse.json({ error: `Confronto '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ comparison })
  } catch (error) {
    console.error("Errore durante il recupero del confronto:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero del confronto" },
      { status: 500 },
    )
  }
}
