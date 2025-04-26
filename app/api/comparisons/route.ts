import { type NextRequest, NextResponse } from "next/server"
import { getAllLanguageComparisons } from "@/data/frameworks-data"

export async function GET(request: NextRequest) {
  try {
    const comparisons = getAllLanguageComparisons()
    return NextResponse.json({ comparisons })
  } catch (error) {
    console.error("Errore durante il recupero dei confronti tra linguaggi:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero dei confronti tra linguaggi" },
      { status: 500 },
    )
  }
}
