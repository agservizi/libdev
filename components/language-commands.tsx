"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Code, Info, Bookmark, LinkIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

interface LanguageCommandsProps {
  commands: Array<{
    name: string
    description: string
    syntax: string
    example: string
  }>
  language: string
}

export function LanguageCommands({ commands, language }: LanguageCommandsProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({})

  const { toast } = useToast()

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(id)
    setTimeout(() => setCopiedIndex(null), 2000)

    // Mostra un toast quando il testo viene copiato
    toast({
      title: "Copiato negli appunti",
      description: "Il testo è stato copiato negli appunti",
    })
  }

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const shareCommand = (commandName: string) => {
    const url = `${window.location.origin}/linguaggi/${encodeURIComponent(language)}?cmd=${encodeURIComponent(commandName)}`

    // Utilizziamo direttamente la funzione di copia negli appunti
    copyToClipboard(url, `share-${language}-${commandName}`)

    toast({
      title: "Link copiato negli appunti",
      description: "Puoi condividere il link incollando dove preferisci",
    })
  }

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {commands.map((command, idx) => {
          // Verifichiamo che il comando e i suoi campi esistano
          if (!command) return null

          const name = command.name || "Comando senza nome"
          const description = command.description || "Nessuna descrizione disponibile"
          const syntax = command.syntax || "// Nessuna sintassi disponibile"
          const example = command.example || "// Nessun esempio disponibile"

          return (
            <Card
              key={idx}
              className="overflow-hidden border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow w-full"
            >
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center">
                      <Code className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      {name}
                    </CardTitle>
                    <p className="mt-1 text-muted-foreground">{description}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => toggleBookmark(`${language}-${name}`)}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              bookmarked[`${language}-${name}`] ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                            }`}
                          />
                          <span className="sr-only">Salva</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Salva nei preferiti</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => shareCommand(name)}
                        >
                          <LinkIcon className="h-4 w-4 text-gray-400" />
                          <span className="sr-only">Copia link</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copia link</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <Code className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300">Sintassi</span>
                  </h4>
                  <div className="relative">
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm border border-gray-200 dark:border-gray-700">
                      <code>{syntax}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:shadow"
                      onClick={() => copyToClipboard(syntax, `${language}-syntax-${idx}`)}
                    >
                      {copiedIndex === `${language}-syntax-${idx}` ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copia sintassi</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300">Esempio</span>
                  </h4>
                  <div className="relative">
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm border border-gray-200 dark:border-gray-700">
                      <code>{example}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:shadow"
                      onClick={() => copyToClipboard(example, `${language}-example-${idx}`)}
                    >
                      {copiedIndex === `${language}-example-${idx}` ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copia esempio</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
