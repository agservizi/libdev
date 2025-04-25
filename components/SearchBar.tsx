"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Library } from "lucide-react"
import AutoComplete from "./AutoComplete"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LibrarySearch from "./LibrarySearch"

export default function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"search" | "libraries">("search")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length > 1) {
      fetchSuggestions(query)
    } else {
      setSuggestions([])
    }
  }, [query])

  const fetchSuggestions = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/suggestions?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setSuggestions(data.suggestions)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setSuggestions([])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
  }

  const handleLibrarySelect = (libraryId: string) => {
    router.push(`/search?q=library:${encodeURIComponent(libraryId)}`)
  }

  return (
    <div className="relative w-full">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "search" | "libraries")}
        className="w-full"
      >
        <TabsList className="w-full mb-2">
          <TabsTrigger value="search" className="flex-1">
            <Search size={16} className="mr-2" />
            Cerca
          </TabsTrigger>
          <TabsTrigger value="libraries" className="flex-1">
            <Library size={16} className="mr-2" />
            Librerie
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="m-0">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Cerca linguaggi di programmazione, comandi, sintassi..."
                className="w-full p-4 pl-12 pr-4 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
            </div>
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Cerca
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <AutoComplete suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
          )}
        </TabsContent>

        <TabsContent value="libraries" className="m-0">
          <LibrarySearch onSelectLibrary={handleLibrarySelect} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
