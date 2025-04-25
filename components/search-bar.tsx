"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, Loader2, ArrowRight, History, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResultsSection } from "./results-section"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Assicuriamoci che initialQuery sia una stringa
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Carica le ricerche recenti dal localStorage
  useEffect(() => {
    try {
      const savedSearches = localStorage.getItem("recentSearches")
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches))
      }
    } catch (error) {
      console.error("Errore nel caricamento delle ricerche recenti:", error)
    }
  }, [])

  // Gestisce il click esterno per chiudere i suggerimenti
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Carica i risultati iniziali se esiste una query
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])

  // Recupera i suggerimenti mentre l'utente digita
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query || query.length < 2) {
        setSuggestions([])
        return
      }

      try {
        const response = await fetch(`/api/suggestions?q=${encodeURIComponent(query)}`)

        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.message || "Errore nel recupero dei suggerimenti")
        }

        setSuggestions(data.suggestions || [])
      } catch (error) {
        console.error("Errore nel recupero dei suggerimenti:", error)
        setSuggestions([])
      }
    }

    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery || !searchQuery.trim()) {
      setError("Inserisci un termine di ricerca")
      return
    }

    setIsLoading(true)
    setShowSuggestions(false)
    setError(null)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)

      // Verifica se la risposta è ok prima di tentare di analizzare il JSON
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.message || "Errore durante la ricerca")
      }

      setResults(data)

      // Aggiorna l'URL con la query di ricerca
      router.push(`/?q=${encodeURIComponent(searchQuery)}`, { scroll: false })

      // Salva la ricerca nelle ricerche recenti
      try {
        if (!recentSearches.includes(searchQuery)) {
          const updatedSearches = [searchQuery, ...recentSearches.slice(0, 4)]
          setRecentSearches(updatedSearches)
          localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
        }
      } catch (storageError) {
        console.error("Errore nel salvataggio delle ricerche recenti:", storageError)
      }
    } catch (error) {
      console.error("Errore nella ricerca:", error)
      // Mostra un messaggio di errore all'utente
      setResults({ error: true, message: `Si è verificato un errore: ${error.message}` })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setQuery("")
    setResults(null)
    setError(null)
    router.push("/", { scroll: false })
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const popularSearches = ["JavaScript", "Python", "React", "CSS", "HTML"]

  return (
    <div className="w-full" id="search">
      <Card className="p-4 shadow-lg border-2 border-gray-100 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Cerca linguaggio, comando o sintassi..."
                className="pl-12 pr-12 py-6 h-14 rounded-lg border-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setShowSuggestions(true)
                  setError(null)
                }}
                onFocus={() => query.length >= 2 && setShowSuggestions(true)}
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancella ricerca</span>
                </Button>
              )}
            </div>
            <Button
              type="submit"
              className="ml-2 h-14 px-6 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
              <span className="sr-only">Cerca</span>
            </Button>
          </div>

          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}

          {/* Menu a discesa dei suggerimenti */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full rounded-lg bg-white dark:bg-gray-900 border shadow-lg"
            >
              <ul className="py-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Search className="h-4 w-4 mr-3 text-gray-400" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        {!results && !isLoading && (
          <div className="mt-4">
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <History className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Ricerche recenti</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center mb-2">
                <Sparkles className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Ricerche popolari</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {isLoading ? (
        <div className="mt-12 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Ricerca in corso...</p>
        </div>
      ) : results ? (
        <ResultsSection results={results} query={query} />
      ) : null}
    </div>
  )
}
