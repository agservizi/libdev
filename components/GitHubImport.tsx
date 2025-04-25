"use client"

import { useState } from "react"
import { Github, Search, Download, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import type { ProjectFile, Language } from "./CodeEditor"

interface GitHubImportProps {
  onImport: (files: ProjectFile[]) => void
}

interface GitHubRepo {
  name: string
  full_name: string
  description: string
  html_url: string
  default_branch: string
  stargazers_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

interface GitHubContent {
  name: string
  path: string
  type: "file" | "dir"
  download_url: string | null
  content?: string
}

export default function GitHubImport({ onImport }: GitHubImportProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [repoUrl, setRepoUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<GitHubRepo[]>([])
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)
  const [importProgress, setImportProgress] = useState({ current: 0, total: 0 })

  // Funzione per cercare repository su GitHub
  const searchRepositories = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&order=desc`,
      )

      if (!response.ok) {
        throw new Error("Errore durante la ricerca dei repository")
      }

      const data = await response.json()
      setSearchResults(data.items || [])
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la ricerca dei repository.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Funzione per importare un repository da URL
  const importFromUrl = async () => {
    if (!repoUrl.trim()) return

    // Estrai owner e repo dall'URL
    const urlPattern = /github\.com\/([^/]+)\/([^/]+)/
    const match = repoUrl.match(urlPattern)

    if (!match) {
      toast({
        title: "URL non valido",
        description: "Inserisci un URL GitHub valido (es. https://github.com/username/repo).",
        variant: "destructive",
      })
      return
    }

    const [, owner, repo] = match

    try {
      setIsLoading(true)

      // Ottieni informazioni sul repository
      const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`)

      if (!repoResponse.ok) {
        throw new Error("Repository non trovato")
      }

      const repoData = await repoResponse.json()
      setSelectedRepo(repoData)

      // Importa i file dal repository
      await importRepository(owner, repo, repoData.default_branch)
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'importazione del repository.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Funzione per importare un repository selezionato
  const importSelectedRepo = async () => {
    if (!selectedRepo) return

    try {
      setIsLoading(true)

      const [, owner, repo] = selectedRepo.full_name.split("/")
      await importRepository(owner, repo, selectedRepo.default_branch)
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'importazione del repository.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Funzione per importare i file da un repository
  const importRepository = async (owner: string, repo: string, branch: string) => {
    try {
      // Ottieni il contenuto della root del repository
      const files = await fetchDirectoryContents(owner, repo, "", branch)

      if (files.length === 0) {
        toast({
          title: "Repository vuoto",
          description: "Il repository selezionato non contiene file supportati.",
          variant: "destructive",
        })
        return
      }

      // Importa i file nel progetto
      onImport(files)

      toast({
        title: "Repository importato",
        description: `Importati ${files.length} file da ${owner}/${repo}.`,
      })

      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'importazione dei file.",
        variant: "destructive",
      })
    }
  }

  // Funzione ricorsiva per ottenere il contenuto di una directory
  const fetchDirectoryContents = async (
    owner: string,
    repo: string,
    path: string,
    branch: string,
  ): Promise<ProjectFile[]> => {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`)

    if (!response.ok) {
      throw new Error(`Errore durante il recupero dei contenuti: ${response.statusText}`)
    }

    const contents: GitHubContent[] = await response.json()
    let files: ProjectFile[] = []

    // Aggiorna il progresso totale
    setImportProgress((prev) => ({ ...prev, total: prev.total + contents.length }))

    for (const item of contents) {
      // Aggiorna il progresso corrente
      setImportProgress((prev) => ({ ...prev, current: prev.current + 1 }))

      if (item.type === "dir") {
        // Ricorsivamente ottieni i file nelle sottodirectory
        const subFiles = await fetchDirectoryContents(owner, repo, item.path, branch)
        files = [...files, ...subFiles]
      } else if (item.type === "file" && item.download_url) {
        // Filtra solo i file supportati
        const extension = item.name.split(".").pop()?.toLowerCase()

        if (extension && isLanguageSupported(extension)) {
          try {
            const fileResponse = await fetch(item.download_url)
            const content = await fileResponse.text()

            files.push({
              id: `github-${item.path}`,
              name: item.name,
              language: getLanguageFromExtension(extension),
              content,
              path: `/${item.path}`,
            })
          } catch (error) {
            console.error(`Errore durante il recupero del file ${item.path}:`, error)
          }
        }
      }
    }

    return files
  }

  // Funzione per verificare se un'estensione è supportata
  const isLanguageSupported = (extension: string): boolean => {
    const supportedExtensions = ["html", "htm", "css", "js", "jsx", "ts", "tsx", "php", "json", "md", "markdown", "sql"]
    return supportedExtensions.includes(extension)
  }

  // Funzione per ottenere il linguaggio dall'estensione
  const getLanguageFromExtension = (extension: string): Language => {
    const extensionMap: Record<string, Language> = {
      html: "html",
      htm: "html",
      css: "css",
      js: "javascript",
      jsx: "jsx",
      ts: "typescript",
      tsx: "tsx",
      php: "php",
      json: "json",
      md: "markdown",
      markdown: "markdown",
      sql: "sql",
    }

    return extensionMap[extension] || "javascript"
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Github size={16} />
          <span>Importa da GitHub</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importa da GitHub</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          {/* Importa da URL */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Importa da URL</h3>
            <div className="flex gap-2">
              <Input
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                disabled={isLoading}
              />
              <Button onClick={importFromUrl} disabled={isLoading || !repoUrl.trim()}>
                Importa
              </Button>
            </div>
          </div>

          {/* Cerca repository */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Cerca repository</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Cerca repository..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchRepositories()}
                disabled={isLoading}
              />
              <Button onClick={searchRepositories} disabled={isLoading || !searchQuery.trim()}>
                <Search size={16} />
              </Button>
            </div>
          </div>

          {/* Risultati della ricerca */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Risultati della ricerca</h3>
              <div className="max-h-60 overflow-y-auto border rounded-md divide-y">
                {searchResults.map((repo) => (
                  <div
                    key={repo.full_name}
                    className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                      selectedRepo?.full_name === repo.full_name ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                    onClick={() => setSelectedRepo(repo)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{repo.full_name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {repo.description || "Nessuna descrizione"}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        ⭐ {repo.stargazers_count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Repository selezionato */}
          {selectedRepo && (
            <div className="border rounded-md p-3 bg-gray-50 dark:bg-gray-800">
              <h3 className="text-sm font-medium mb-1">Repository selezionato</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{selectedRepo.full_name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedRepo.description || "Nessuna descrizione"}
                  </p>
                </div>
                <Button onClick={importSelectedRepo} disabled={isLoading} size="sm">
                  <Download size={16} className="mr-1" />
                  Importa
                </Button>
              </div>
            </div>
          )}

          {/* Progresso importazione */}
          {isLoading && importProgress.total > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Importazione in corso...</span>
                <span>
                  {importProgress.current} / {importProgress.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(importProgress.current / importProgress.total) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Note e avvisi */}
          <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <div>
              <p>
                Verranno importati solo i file supportati dall'editor (HTML, CSS, JavaScript, TypeScript, JSX, TSX, PHP,
                JSON, Markdown, SQL).
              </p>
              <p className="mt-1">I repository molto grandi potrebbero richiedere più tempo per l'importazione.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
