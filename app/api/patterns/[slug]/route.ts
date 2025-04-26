import { type NextRequest, NextResponse } from "next/server"
import { getDesignPatternBySlug } from "@/data/projects-data"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const pattern = getDesignPatternBySlug(slug)

    if (!pattern) {
      return NextResponse.json({ error: `Pattern '${slug}' non trovato` }, { status: 404 })
    }

    return NextResponse.json({ pattern })
  } catch (error) {
    console.error("Errore durante il recupero del pattern:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero del pattern" },
      { status: 500 },
    )
  }
}
