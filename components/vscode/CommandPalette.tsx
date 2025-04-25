"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, FileText, Settings, Package, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onCommandExecute: (command: string) => void
}

interface Command {
  id: string
  title: string
  category: string
  icon: React.ReactNode
}

export default function CommandPalette({ isOpen, onClose, onCommandExecute }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sample commands
  const commands: Command[] = [
    { id: "open-file", title: "Apri File", category: "File", icon: <FileText size={16} /> },
    { id: "save-file", title: "Salva File", category: "File", icon: <FileText size={16} /> },
    { id: "format-document", title: "Formatta Documento", category: "Editor", icon: <FileText size={16} /> },
    { id: "toggle-terminal", title: "Mostra/Nascondi Terminale", category: "Visualizza", icon: <Play size={16} /> },
    { id: "open-settings", title: "Apri Impostazioni", category: "Preferenze", icon: <Settings size={16} /> },
    { id: "install-extension", title: "Installa Estensione", category: "Estensioni", icon: <Package size={16} /> },
  ]

  // Filter commands based on query
  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(query.toLowerCase()) ||
      command.category.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === "Enter") {
      if (filteredCommands[selectedIndex]) {
        onCommandExecute(filteredCommands[selectedIndex].id)
        onClose()
      }
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-[20vh]">
      <div className="w-[600px] max-w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden" onKeyDown={handleKeyDown}>
        <div className="flex items-center p-3 border-b border-gray-700">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digita un comando o cerca..."
            className="flex-1 bg-transparent border-none outline-none text-white"
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-gray-400 text-center">Nessun comando trovato</div>
          ) : (
            filteredCommands.map((command, index) => (
              <div
                key={command.id}
                className={cn(
                  "flex items-center p-3 cursor-pointer",
                  index === selectedIndex ? "bg-gray-700" : "hover:bg-gray-700",
                )}
                onClick={() => {
                  onCommandExecute(command.id)
                  onClose()
                }}
              >
                <div className="mr-3 text-gray-400">{command.icon}</div>
                <div className="flex-1">
                  <div className="text-white">{command.title}</div>
                  <div className="text-xs text-gray-400">{command.category}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
