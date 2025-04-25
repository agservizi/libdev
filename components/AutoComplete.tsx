"use client"

import { useEffect, useRef } from "react"

interface AutoCompleteProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
}

export default function AutoComplete({ suggestions, onSuggestionClick }: AutoCompleteProps) {
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        // Handle click outside if needed
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (suggestions.length === 0) return null

  return (
    <div
      ref={suggestionsRef}
      className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto"
    >
      <ul>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  )
}
