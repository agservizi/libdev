import { type NextRequest, NextResponse } from "next/server"
import librariesData from "@/data/libraries.json"
import { searchCommands } from "@/lib/search"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")
  const language = searchParams.get("language")

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  // Cerca nei comandi
  const commandResults = searchCommands(query, language)

  // Cerca nelle librerie
  const libraryResults = librariesData.libraries
    .filter((library) => {
      const matchesQuery =
        library.name.toLowerCase().includes(query.toLowerCase()) ||
        library.description.toLowerCase().includes(query.toLowerCase()) ||
        library.categories.some((cat) => cat.toLowerCase().includes(query.toLowerCase()))

      return matchesQuery
    })
    .map((library) => ({
      id: library.id,
      type: "library",
      name: library.name,
      description: library.description,
      language: library.categories[0],
      syntax: `// ${library.name} v${library.version}`,
      example: library.examples[0]?.code || "",
      url: library.documentation,
      categories: library.categories,
    }))

  // Combina i risultati
  const results = [...commandResults, ...libraryResults]

  // Ordina per rilevanza (semplificato)
  const sortedResults = results.sort((a, b) => {
    const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
    const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
    return bNameMatch - aNameMatch
  })

  return NextResponse.json({ results: sortedResults })
}
