import type { SearchResult } from "@/types/search"
import programmingData from "@/data/commands.json"
import { PREDEFINED_LIBRARIES } from "@/components/LibraryManager"

export async function getSearchResults(query: string): Promise<SearchResult[]> {
  // Check if this is a library search
  if (query.startsWith("library:")) {
    const libraryId = query.substring(8).trim()
    return searchLibraries(libraryId)
  }

  // In a real app, this would be a database query or API call
  // For now, we'll filter the JSON data
  const normalizedQuery = query.toLowerCase().trim()

  // Filter and sort results by relevance
  const results = programmingData.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(normalizedQuery)
    const descMatch = item.description.toLowerCase().includes(normalizedQuery)

    // Check for matches in categories and commands
    const categoryMatch = item.categories?.some(
      (category) =>
        category.name.toLowerCase().includes(normalizedQuery) ||
        category.commands.some(
          (cmd) =>
            cmd.syntax.toLowerCase().includes(normalizedQuery) ||
            cmd.description.toLowerCase().includes(normalizedQuery),
        ),
    )

    // Check for matches in legacy commands (if categories not present)
    const commandMatch = item.commands?.some(
      (cmd) =>
        cmd.syntax.toLowerCase().includes(normalizedQuery) || cmd.description.toLowerCase().includes(normalizedQuery),
    )

    // Check for matches in examples
    const exampleMatch = item.examples?.some(
      (example) =>
        example.title.toLowerCase().includes(normalizedQuery) || example.code.toLowerCase().includes(normalizedQuery),
    )

    return titleMatch || descMatch || categoryMatch || commandMatch || exampleMatch
  })

  // Calculate relevance score
  return results
    .map((item) => {
      let relevance = 0

      // Title matches are most important
      if (item.title.toLowerCase().includes(normalizedQuery)) {
        relevance += 10
        // Exact match gets higher score
        if (item.title.toLowerCase() === normalizedQuery) {
          relevance += 5
        }
      }

      // Description matches
      if (item.description.toLowerCase().includes(normalizedQuery)) {
        relevance += 5
      }

      // Category matches
      const categoryMatches =
        item.categories?.filter((category) => category.name.toLowerCase().includes(normalizedQuery)).length || 0

      relevance += categoryMatches * 3

      // Command matches in categories
      let commandMatches = 0
      item.categories?.forEach((category) => {
        commandMatches += category.commands.filter(
          (cmd) =>
            cmd.syntax.toLowerCase().includes(normalizedQuery) ||
            cmd.description.toLowerCase().includes(normalizedQuery),
        ).length
      })

      // Legacy command matches
      const legacyCommandMatches =
        item.commands?.filter(
          (cmd) =>
            cmd.syntax.toLowerCase().includes(normalizedQuery) ||
            cmd.description.toLowerCase().includes(normalizedQuery),
        ).length || 0

      relevance += commandMatches + legacyCommandMatches

      // Example matches
      const exampleMatches =
        item.examples?.filter(
          (example) =>
            example.title.toLowerCase().includes(normalizedQuery) ||
            example.code.toLowerCase().includes(normalizedQuery),
        ).length || 0

      relevance += exampleMatches * 2

      return {
        ...item,
        relevance,
      }
    })
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
}

// Funzione per cercare librerie specifiche
function searchLibraries(libraryId: string): SearchResult[] {
  const library = PREDEFINED_LIBRARIES.find((lib) => lib.id === libraryId)

  if (!library) {
    return []
  }

  // Converti la libreria in un risultato di ricerca
  return [
    {
      id: library.id,
      title: library.name,
      description: library.description,
      icon: "code",
      colorClass: library.category === "css" ? "bg-purple-500" : "bg-yellow-500",
      categories: [
        {
          name: "Informazioni",
          commands: [
            {
              syntax: `// ${library.name} v${library.version}`,
              description: library.description,
            },
            {
              syntax:
                library.category === "css"
                  ? `<link rel="stylesheet" href="${library.cdnUrl}">`
                  : `<script src="${library.cdnUrl}"></script>`,
              description: `Includi ${library.name} nel tuo progetto`,
            },
          ],
        },
      ],
      examples: [
        {
          title: `Esempio di ${library.name}`,
          code:
            library.category === "css"
              ? `<!-- HTML con ${library.name} -->
<link rel="stylesheet" href="${library.cdnUrl}">
<div class="container">
  <h1>Esempio di ${library.name}</h1>
  <p>Questo è un esempio di utilizzo di ${library.name}.</p>
</div>`
              : `<!-- HTML con ${library.name} -->
<script src="${library.cdnUrl}"></script>
<script>
  // Codice di esempio per ${library.name}
  document.addEventListener('DOMContentLoaded', function() {
    console.log('${library.name} caricato!');
  });
</script>`,
        },
      ],
      resources: [
        {
          title: `Documentazione ${library.name}`,
          url: library.docsUrl,
        },
      ],
    },
  ]
}

export function searchCommands(query: string, language?: string | null) {
  const normalizedQuery = query.toLowerCase().trim()

  const results = programmingData
    .filter((library) => {
      if (language && !library.categories.some((cat) => cat.name.toLowerCase() === language.toLowerCase())) {
        return false
      }

      return library.categories.some((category) =>
        category.commands.some(
          (command) =>
            command.syntax.toLowerCase().includes(normalizedQuery) ||
            command.description.toLowerCase().includes(normalizedQuery),
        ),
      )
    })
    .map((library) => {
      // Find the first matching command
      const matchingCategory = library.categories.find((category) =>
        category.commands.some(
          (command) =>
            command.syntax.toLowerCase().includes(normalizedQuery) ||
            command.description.toLowerCase().includes(normalizedQuery),
        ),
      )

      const matchingCommand = matchingCategory?.commands.find(
        (command) =>
          command.syntax.toLowerCase().includes(normalizedQuery) ||
          command.description.toLowerCase().includes(normalizedQuery),
      )

      return {
        id: library.id,
        type: "command",
        title: library.title,
        description: library.description,
        icon: library.icon,
        colorClass: library.colorClass,
        syntax: matchingCommand?.syntax || "",
        categories: library.categories,
        examples: library.examples,
        resources: library.resources,
      }
    })

  return results
}
