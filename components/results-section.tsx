"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Copy,
  Check,
  ArrowLeft,
  BookOpen,
  Code,
  FileCode,
  Search,
  Info,
  Bookmark,
  Share2,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ResultsSectionProps {
  results: {
    languages?: {
      [key: string]: {
        commands: Array<{
          name: string
          description: string
          syntax: string
          example: string
        }>
        documentation: string
      }
    }
    error?: boolean
    message?: string
  }
  query: string
}

export function ResultsSection({ results, query }: ResultsSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({})
  const router = useRouter()

  // Verifichiamo che results.languages esista e non sia vuoto
  const hasLanguages = results.languages && Object.keys(results.languages).length > 0
  const languages = hasLanguages ? Object.keys(results.languages) : []

  // Gestione dell'errore
  if (results.error) {
    return (
      <div className="mt-12 text-center w-full max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Si è verificato un errore</h3>
        <p className="text-muted-foreground mb-6">
          {results.message || "Errore durante la ricerca. Riprova più tardi."}
        </p>
        <Button variant="outline" className="text-blue-600 dark:text-blue-400" onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alla ricerca
        </Button>
      </div>
    )
  }

  // Nessun risultato trovato
  if (!hasLanguages) {
    return (
      <div className="mt-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <Search className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Nessun risultato trovato</h3>
        <p className="text-muted-foreground mb-6">
          Non abbiamo trovato risultati per "{query}". Prova con termini diversi.
        </p>
        <Button variant="outline" className="text-blue-600 dark:text-blue-400" onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alla ricerca
        </Button>
      </div>
    )
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(id)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const shareCommand = (language: string, commandName: string) => {
    const url = `${window.location.origin}/?q=${encodeURIComponent(query)}&lang=${encodeURIComponent(
      language,
    )}&cmd=${encodeURIComponent(commandName)}`

    if (navigator.share) {
      navigator
        .share({
          title: `${commandName} in ${language}`,
          text: `Guarda questo comando ${commandName} in ${language} su LibDev`,
          url,
        })
        .catch((error) => {
          console.error("Errore nella condivisione:", error)
          copyToClipboard(url, "share-url")
        })
    } else {
      copyToClipboard(url, "share-url")
    }
  }

  // Calcola il numero totale di risultati
  const totalResults = languages.reduce((acc, lang) => {
    const commands = results.languages?.[lang]?.commands || []
    return acc + commands.length
  }, 0)

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Risultati per "{query}"</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Trovati {totalResults} risultati in {languages.length} linguaggi
            </p>
          </div>
          <Button variant="outline" className="text-blue-600 dark:text-blue-400" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Nuova ricerca
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {languages.map((language) => (
            <Badge key={language} variant="secondary" className="text-sm">
              {language}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue={languages[0]} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {languages.map((language) => (
            <TabsTrigger
              key={language}
              value={language}
              className="flex-grow data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm"
            >
              {language}
            </TabsTrigger>
          ))}
        </TabsList>

        <TooltipProvider>
          {languages.map((language) => {
            // Verifichiamo che il linguaggio e i suoi comandi esistano
            const languageData = results.languages?.[language]
            if (!languageData) return null

            const commands = Array.isArray(languageData.commands) ? languageData.commands : []
            const documentation = languageData.documentation || "#"

            return (
              <TabsContent key={language} value={language} className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">{language}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{commands.length} comandi trovati</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={documentation} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Documentazione ufficiale
                    </Link>
                  </Button>
                </div>

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
                            <CardDescription className="mt-1">{description}</CardDescription>
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
                                      bookmarked[`${language}-${name}`]
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-400"
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
                                  onClick={() => shareCommand(language, name)}
                                >
                                  <Share2 className="h-4 w-4 text-gray-400" />
                                  <span className="sr-only">Condividi</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Condividi</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6 p-6">
                        <div>
                          <h4 className="text-sm font-medium mb-3 flex items-center">
                            <FileCode className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
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
              </TabsContent>
            )
          })}
        </TooltipProvider>
      </Tabs>
    </div>
  )
}
