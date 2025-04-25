"use client"

import { useState } from "react"
import { Search, Copy, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Definizione dei tipi
interface Snippet {
  id: string
  title: string
  description: string
  code: string
  language: string
  category: string
}

// Importa gli snippet predefiniti
import { PREDEFINED_SNIPPETS } from "@/data/snippets"

interface SnippetLibraryProps {
  onInsertSnippet: (code: string) => void
  currentLanguage: string
}

export default function SnippetLibrary({ onInsertSnippet, currentLanguage }: SnippetLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null)

  // Filtra gli snippet in base alla ricerca e alla tab attiva
  const filteredSnippets = PREDEFINED_SNIPPETS.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab = activeTab === "all" || snippet.language === activeTab

    return matchesSearch && matchesTab
  })

  // Raggruppa gli snippet per categoria
  const snippetsByCategory = filteredSnippets.reduce(
    (acc, snippet) => {
      if (!acc[snippet.category]) {
        acc[snippet.category] = []
      }
      acc[snippet.category].push(snippet)
      return acc
    },
    {} as Record<string, Snippet[]>,
  )

  // Funzione per copiare uno snippet
  const copySnippet = (snippet: Snippet) => {
    navigator.clipboard.writeText(snippet.code)
    setCopiedSnippetId(snippet.id)
    setTimeout(() => setCopiedSnippetId(null), 2000)

    toast({
      title: "Snippet copiato",
      description: `"${snippet.title}" è stato copiato negli appunti.`,
    })
  }

  // Funzione per inserire uno snippet nell'editor
  const insertSnippet = (snippet: Snippet) => {
    onInsertSnippet(snippet.code)

    toast({
      title: "Snippet inserito",
      description: `"${snippet.title}" è stato inserito nell'editor.`,
    })
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Cerca snippet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
        <TabsList className="px-4 pt-2 bg-gray-50 dark:bg-gray-900 justify-start">
          <TabsTrigger value="all">Tutti</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="typescript">TypeScript</TabsTrigger>
          <TabsTrigger value="jsx">React</TabsTrigger>
          <TabsTrigger value="php">PHP</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="flex-grow overflow-auto p-4">
          {Object.keys(snippetsByCategory).length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Nessuno snippet trovato</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(snippetsByCategory).map(([category, snippets]) => (
                <div key={category}>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{category}</h3>
                  <div className="space-y-3">
                    {snippets.map((snippet) => (
                      <div
                        key={snippet.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden"
                      >
                        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{snippet.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{snippet.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copySnippet(snippet)}
                              title="Copia snippet"
                            >
                              {copiedSnippetId === snippet.id ? <Check size={16} /> : <Copy size={16} />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => insertSnippet(snippet)}
                              title="Inserisci snippet"
                              disabled={currentLanguage !== snippet.language}
                            >
                              Inserisci
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
                          <pre className="text-sm">
                            <code>{snippet.code.length > 200 ? `${snippet.code.slice(0, 200)}...` : snippet.code}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
