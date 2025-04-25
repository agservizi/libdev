import { type NextRequest, NextResponse } from "next/server"
import programmingData from "@/data/commands.json"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  const normalizedQuery = query.toLowerCase().trim()

  // Get suggestions from titles
  const titleSuggestions = programmingData
    .filter((item) => item.title.toLowerCase().includes(normalizedQuery))
    .map((item) => item.title)

  // Get category suggestions
  const categorySuggestions = programmingData
    .flatMap((item) => item.categories || [])
    .filter((category) => category.name.toLowerCase().includes(normalizedQuery))
    .map((category) => category.name)
    .slice(0, 3) // Limit category suggestions

  // Get command suggestions from categories
  const categoryCommandSuggestions = programmingData
    .flatMap((item) =>
      (item.categories || []).flatMap((category) =>
        category.commands.map((cmd) => ({
          syntax: cmd.syntax,
          language: item.title,
        })),
      ),
    )
    .filter((cmd) => cmd.syntax.toLowerCase().includes(normalizedQuery))
    .map((cmd) => `${cmd.syntax} (${cmd.language})`)
    .slice(0, 5) // Limit command suggestions

  // Get legacy command suggestions
  const legacyCommandSuggestions = programmingData
    .flatMap((item) =>
      (item.commands || []).map((cmd) => ({
        syntax: cmd.syntax,
        language: item.title,
      })),
    )
    .filter((cmd) => cmd.syntax.toLowerCase().includes(normalizedQuery))
    .map((cmd) => `${cmd.syntax} (${cmd.language})`)
    .slice(0, 3) // Limit legacy command suggestions

  // Combine and remove duplicates
  const allSuggestions = [
    ...new Set([
      ...titleSuggestions,
      ...categorySuggestions,
      ...categoryCommandSuggestions,
      ...legacyCommandSuggestions,
    ]),
  ].slice(0, 10) // Limit to 10 suggestions

  return NextResponse.json({ suggestions: allSuggestions })
}
