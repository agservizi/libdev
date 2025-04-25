"use client"

import { useState, useEffect } from "react"
import { Search, X, ChevronDown, ChevronRight, RefreshCw, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { VSCodeFile } from "@/types/vscode"

interface SearchPanelProps {
  files: VSCodeFile[]
  onFileSelect: (file: VSCodeFile) => void
}

export default function SearchPanel({ files, onFileSelect }: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Array<{ file: VSCodeFile; matches: number; lines: string[] }>>([])
  const [isSearching, setIsSearching] = useState(false)
  const [expandedResults, setExpandedResults] = useState<Record<string, boolean>>({})

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Debounce search
    const timer = setTimeout(() => {
      const results = files
        .map((file) => {
          const content = file.content
          const lines = content.split("\n")
          const matchingLines: string[] = []
          let matchCount = 0

          lines.forEach((line, index) => {
            if (line.toLowerCase().includes(searchQuery.toLowerCase())) {
              matchCount++
              // Add line number and content
              matchingLines.push(`${index + 1}: ${line.trim()}`)
            }
          })

          return {
            file,
            matches: matchCount,
            lines: matchingLines,
          }
        })
        .filter((result) => result.matches > 0)

      setSearchResults(results)
      setIsSearching(false)

      // Auto-expand first result
      if (results.length > 0) {
        setExpandedResults({
          [results[0].file.id]: true,
        })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, files])

  const toggleResultExpansion = (fileId: string) => {
    setExpandedResults((prev) => ({
      ...prev,
      [fileId]: !prev[fileId],
    }))
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 text-sm font-medium flex items-center justify-between">
        <span>SEARCH</span>
        <div className="flex items-center space-x-1">
          <button className="p-1 rounded hover:bg-gray-700" title="Refresh">
            <RefreshCw size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-700" title="Search settings">
            <Settings size={16} />
          </button>
        </div>
      </div>

      <div className="p-2 flex flex-col gap-2">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="pl-8 pr-8 py-1 h-8 text-sm"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          {searchQuery && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              onClick={handleClearSearch}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex gap-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-1 h-3 w-3" />
              Match Case
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-1 h-3 w-3" />
              Whole Word
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-1 h-3 w-3" />
              Regex
            </label>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {isSearching ? (
          <div className="p-2 text-sm text-gray-400">Searching...</div>
        ) : searchQuery.trim().length < 2 ? (
          <div className="p-2 text-sm text-gray-400">Type at least 2 characters to search</div>
        ) : searchResults.length === 0 ? (
          <div className="p-2 text-sm text-gray-400">No results found</div>
        ) : (
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-2">
              {searchResults.reduce((acc, result) => acc + result.matches, 0)} results in {searchResults.length} files
            </div>

            {searchResults.map((result) => (
              <div key={result.file.id} className="mb-2">
                <div
                  className="flex items-center text-sm hover:bg-gray-700 cursor-pointer p-1 rounded"
                  onClick={() => toggleResultExpansion(result.file.id)}
                >
                  {expandedResults[result.file.id] ? (
                    <ChevronDown size={16} className="mr-1" />
                  ) : (
                    <ChevronRight size={16} className="mr-1" />
                  )}
                  <span className="truncate">{result.file.path}</span>
                  <span className="ml-auto text-xs text-gray-400">
                    {result.matches} {result.matches === 1 ? "match" : "matches"}
                  </span>
                </div>

                {expandedResults[result.file.id] && (
                  <div className="ml-6 text-xs">
                    {result.lines.map((line, index) => (
                      <div
                        key={index}
                        className="hover:bg-gray-700 cursor-pointer p-1 truncate"
                        onClick={() => onFileSelect(result.file)}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
