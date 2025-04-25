"use client"

// Import the data from the server file
import { programmingData } from "./programming-data-server"

// Re-export the data for client components
export { programmingData }

// Add any client-specific utility functions here
export function searchProgrammingData(query: string) {
  if (!query) return { languages: {} }

  const results: any = { languages: {} }
  const queryLower = query.toLowerCase()

  Object.entries(programmingData.languages).forEach(([language, data]) => {
    if (!language) return

    const languageLower = String(language).toLowerCase()
    const languageMatches = languageLower.includes(queryLower)

    if (!data || !Array.isArray(data.commands)) return

    const matchingCommands = data.commands.filter((command) => {
      if (!command) return false

      const nameMatch = command.name && String(command.name).toLowerCase().includes(queryLower)
      const descMatch = command.description && String(command.description).toLowerCase().includes(queryLower)
      const syntaxMatch = command.syntax && String(command.syntax).toLowerCase().includes(queryLower)
      const exampleMatch = command.example && String(command.example).toLowerCase().includes(queryLower)

      return nameMatch || descMatch || syntaxMatch || exampleMatch
    })

    if (languageMatches || matchingCommands.length > 0) {
      const documentation = data.documentation || "#"

      results.languages[language] = {
        commands: languageMatches ? data.commands : matchingCommands,
        documentation: documentation,
      }
    }
  })

  return results
}
