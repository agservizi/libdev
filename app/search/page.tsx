import { Suspense } from "react"
import { notFound } from "next/navigation"
import SearchBar from "@/components/SearchBar"
import ResultSection from "@/components/ResultSection"
import ThemeToggle from "@/components/ThemeToggle"
import Link from "next/link"
import Image from "next/image"
import { getSearchResults } from "@/lib/search"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  if (!query) {
    return notFound()
  }

  const results = await getSearchResults(query)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-10">
                <Image src="/logo.png" alt="LibDev Logo" fill priority className="object-contain" />
              </div>
            </Link>
            <div className="w-full max-w-2xl">
              <SearchBar initialQuery={query} />
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="mb-6">
          <h1 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            Risultati per <span className="font-bold">"{query}"</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Trovati {results.length} risultati</p>
        </div>

        <Suspense fallback={<div>Loading results...</div>}>
          <div className="space-y-8">
            {results.map((result, index) => (
              <ResultSection key={index} result={result} />
            ))}

            {results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  Nessun risultato trovato per "{query}". Prova con un altro termine di ricerca.
                </p>
              </div>
            )}
          </div>
        </Suspense>
      </main>
    </div>
  )
}
