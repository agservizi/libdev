"use client"

import { useState, useEffect } from "react"
import { Search, Library } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PREDEFINED_LIBRARIES } from "./LibraryManager"
import { toast } from "@/components/ui/use-toast"

interface LibrarySearchProps {
  onSelectLibrary?: (libraryId: string) => void
}

export default function LibrarySearch({ onSelectLibrary }: LibrarySearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [libraries, setLibraries] = useState(PREDEFINED_LIBRARIES)
  const [filteredLibraries, setFilteredLibraries] = useState(PREDEFINED_LIBRARIES)
  const [isUpdating, setIsUpdating] = useState(false)

  // Filtra le librerie in base al termine di ricerca
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLibraries(libraries)
      return
    }

    const filtered = libraries.filter(
      (lib) =>
        lib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lib.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredLibraries(filtered)
  }, [searchTerm, libraries])

  // Funzione per aggiornare le versioni delle librerie
  const updateLibraryVersions = async () => {
    setIsUpdating(true)
    try {
      // Aggiorna Bootstrap
      const bootstrapResponse = await fetch("https://api.cdnjs.com/libraries/bootstrap?fields=version")
      const bootstrapData = await bootstrapResponse.json()
      const latestBootstrapVersion = bootstrapData.version

      // Aggiorna Tailwind
      const tailwindResponse = await fetch("https://api.cdnjs.com/libraries/tailwindcss?fields=version")
      const tailwindData = await tailwindResponse.json()
      const latestTailwindVersion = tailwindData.version

      // Aggiorna le librerie con le nuove versioni
      const updatedLibraries = libraries.map((lib) => {
        if (lib.id === "bootstrap-css" || lib.id === "bootstrap-js") {
          return {
            ...lib,
            version: latestBootstrapVersion,
            cdnUrl: lib.cdnUrl.replace(/bootstrap@[\d.]+/, `bootstrap@${latestBootstrapVersion}`),
          }
        } else if (lib.id === "tailwind-css") {
          return {
            ...lib,
            version: latestTailwindVersion,
            cdnUrl: lib.cdnUrl.replace(/tailwindcss@[\d.]+/, `tailwindcss@${latestTailwindVersion}`),
          }
        }
        return lib
      })

      setLibraries(updatedLibraries)
      setFilteredLibraries(updatedLibraries)

      toast({
        title: "Librerie aggiornate",
        description: `Bootstrap: ${latestBootstrapVersion}, Tailwind: ${latestTailwindVersion}`,
      })
    } catch (error) {
      console.error("Errore durante l'aggiornamento delle librerie:", error)
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'aggiornamento delle librerie.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Aggiorna le versioni all'avvio del componente
  useEffect(() => {
    updateLibraryVersions()
  }, [])

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Cerca librerie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={updateLibraryVersions}
          disabled={isUpdating}
          className="flex items-center gap-1 whitespace-nowrap"
        >
          <Library size={16} className={isUpdating ? "animate-spin" : ""} />
          <span>Aggiorna</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredLibraries.map((library) => (
          <div
            key={library.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectLibrary && onSelectLibrary(library.id)}
          >
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">{library.name}</h4>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  library.category === "css"
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200"
                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
                }`}
              >
                {library.category.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">v{library.version}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{library.description}</p>
          </div>
        ))}
      </div>

      {filteredLibraries.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Nessuna libreria trovata</p>
        </div>
      )}
    </div>
  )
}
