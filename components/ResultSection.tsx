"use client"

import { useState } from "react"
import { Code, BookOpen, ExternalLink, ChevronDown, ChevronUp, Copy, Check } from "lucide-react"
import type { SearchResult, Command } from "@/types/search"

interface ResultSectionProps {
  result: SearchResult
}

export default function ResultSection({ result }: ResultSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("commands")
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(text)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${result.colorClass}`}>
            {result.icon === "code" && <Code size={18} className="text-white" />}
            {result.icon === "book" && <BookOpen size={18} className="text-white" />}
          </div>
          <div>
            <h3 className="font-medium text-lg text-gray-900 dark:text-white">{result.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{result.description}</p>
          </div>
        </div>
        <div>{expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "commands"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("commands")}
            >
              Comandi
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "examples"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("examples")}
            >
              Esempi
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "resources"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("resources")}
            >
              Risorse
            </button>
          </div>

          <div className="p-4">
            {activeTab === "commands" && (
              <div>
                {result.categories && result.categories.length > 0 ? (
                  <div className="space-y-6">
                    {result.categories.map((category, idx) => (
                      <div key={idx}>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{category.name}</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {category.commands.map((command, cmdIdx) => (
                            <CommandItem
                              key={cmdIdx}
                              command={command}
                              onCopy={copyToClipboard}
                              isCopied={copiedCommand === command.syntax}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : result.commands && result.commands.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {result.commands.map((command, idx) => (
                      <CommandItem
                        key={idx}
                        command={command}
                        onCopy={copyToClipboard}
                        isCopied={copiedCommand === command.syntax}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Nessun comando disponibile.</p>
                )}
              </div>
            )}

            {activeTab === "examples" && (
              <div>
                {result.examples && result.examples.length > 0 ? (
                  <div className="space-y-4">
                    {result.examples.map((example, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden">
                        <div className="bg-gray-100 dark:bg-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                          {example.title}
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-200 font-mono">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Nessun esempio disponibile.</p>
                )}
              </div>
            )}

            {activeTab === "resources" && (
              <div>
                {result.resources && result.resources.length > 0 ? (
                  <div className="space-y-2">
                    {result.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline py-2"
                      >
                        <ExternalLink size={16} />
                        <span>{resource.title}</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Nessuna risorsa disponibile.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface CommandItemProps {
  command: Command
  onCopy: (text: string) => void
  isCopied: boolean
}

function CommandItem({ command, onCopy, isCopied }: CommandItemProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md group relative">
      <div className="flex justify-between">
        <p className="font-mono text-sm text-gray-800 dark:text-gray-200">{command.syntax}</p>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onCopy(command.syntax)
          }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Copy to clipboard"
        >
          {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{command.description}</p>
    </div>
  )
}
