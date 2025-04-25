"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Plus, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VSCodeTerminal as TerminalType } from "@/types/vscode"

interface TerminalProps {
  terminals: TerminalType[]
  activeTerminal?: TerminalType
  onTerminalSelect: (terminal: TerminalType) => void
  onTerminalClose: (terminal: TerminalType) => void
  onTerminalCreate: () => void
  onTerminalClear: (terminal: TerminalType) => void
  onMaximize: () => void
  onClose: () => void
}

export default function Terminal({
  terminals,
  activeTerminal,
  onTerminalSelect,
  onTerminalClose,
  onTerminalCreate,
  onTerminalClear,
  onMaximize,
  onClose,
}: TerminalProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [activeTerminal?.history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() && activeTerminal) {
      // In a real implementation, this would execute the command
      const newHistory = [...activeTerminal.history, `$ ${input}`, `Comando non trovato: ${input}`]

      // Update terminal history
      onTerminalSelect({
        ...activeTerminal,
        history: newHistory,
      })

      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-2">
        <div className="flex items-center h-8 overflow-x-auto">
          {terminals.map((terminal) => (
            <TerminalTab
              key={terminal.id}
              terminal={terminal}
              isActive={terminal.id === activeTerminal?.id}
              onSelect={() => onTerminalSelect(terminal)}
              onClose={() => onTerminalClose(terminal)}
            />
          ))}
          <button className="flex items-center justify-center h-8 w-8 hover:bg-gray-700" onClick={onTerminalCreate}>
            <Plus size={16} />
          </button>
        </div>
        <div className="flex items-center">
          <button className="flex items-center justify-center h-8 w-8 hover:bg-gray-700" onClick={onMaximize}>
            <Maximize2 size={16} />
          </button>
          <button className="flex items-center justify-center h-8 w-8 hover:bg-gray-700" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div ref={terminalRef} className="flex-1 p-2 font-mono text-sm text-white overflow-auto">
        {activeTerminal?.history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-400">utente@libdev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none px-2"
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}

interface TerminalTabProps {
  terminal: TerminalType
  isActive: boolean
  onSelect: () => void
  onClose: () => void
}

function TerminalTab({ terminal, isActive, onSelect, onClose }: TerminalTabProps) {
  return (
    <div
      className={cn(
        "flex items-center h-8 px-3 cursor-pointer group",
        isActive ? "bg-gray-900 border-t-2 border-blue-500" : "hover:bg-gray-750",
      )}
      onClick={onSelect}
    >
      <span className="truncate max-w-[120px]">{terminal.name}</span>
      <button
        className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-gray-700 rounded p-0.5"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        <X size={14} />
      </button>
    </div>
  )
}
