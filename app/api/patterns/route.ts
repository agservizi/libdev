import { type NextRequest, NextResponse } from "next/server"
import { getAllDesignPatterns, getDesignPatternsByCategory } from "@/data/projects-data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")

    let patterns = getAllDesignPatterns()

    // Filtra per categoria se specificata
    if (category) {
      patterns = getDesignPatternsByCategory(category)
    }

    return NextResponse.json({ patterns })
  } catch (error) {
    console.error("Errore durante il recupero dei pattern di progettazione:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero dei pattern di progettazione" },
      { status: 500 },
    )
  }
}
