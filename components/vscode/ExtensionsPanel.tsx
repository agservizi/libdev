"use client"

import { useState, useEffect } from "react"
import { Search, X, RefreshCw, Download, Check, AlertCircle, Info, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { VSCodeExtension } from "@/types/vscode"
import ExtensionDetail from "./ExtensionDetail"

interface ExtensionsPanelProps {
  onInstallExtension?: (extension: VSCodeExtension) => void
  onUninstallExtension?: (extension: VSCodeExtension) => void
}

export default function ExtensionsPanel({ onInstallExtension, onUninstallExtension }: ExtensionsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState<"installed" | "marketplace">("installed")
  const [extensions, setExtensions] = useState<VSCodeExtension[]>([])
  const [installingExtensions, setInstallingExtensions] = useState<string[]>([])
  const [uninstallingExtensions, setUninstallingExtensions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  // Stato per la vista dettagliata
  const [selectedExtension, setSelectedExtension] = useState<VSCodeExtension | null>(null)

  // Dialoghi per gestire le dipendenze
  const [dependencyDialog, setDependencyDialog] = useState<{
    isOpen: boolean
    extension: VSCodeExtension | null
    dependencies: VSCodeExtension[]
  }>({
    isOpen: false,
    extension: null,
    dependencies: [],
  })

  // Dialogo per gestire le estensioni dipendenti
  const [dependentDialog, setDependentDialog] = useState<{
    isOpen: boolean
    extension: VSCodeExtension | null
    dependents: VSCodeExtension[]
  }>({
    isOpen: false,
    extension: null,
    dependents: [],
  })

  // Carica le estensioni dall'API
  const fetchExtensions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/extensions")

      if (!response.ok) {
        throw new Error(`Errore durante il caricamento delle estensioni: ${response.status}`)
      }

      const data = await response.json()
      setExtensions(data)
    } catch (err) {
      console.error("Errore durante il caricamento delle estensioni:", err)
      setError("Impossibile caricare le estensioni. Riprova più tardi.")
    } finally {
      setIsLoading(false)
    }
  }

  // Carica le estensioni all'avvio
  useEffect(() => {
    fetchExtensions()
  }, [])

  // Cerca estensioni dall'API
  const searchExtensions = async (query: string) => {
    if (!query.trim()) {
      fetchExtensions()
      return
    }

    setIsSearching(true)
    setError(null)

    try {
      const response = await fetch(`/api/extensions?query=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error(`Errore durante la ricerca delle estensioni: ${response.status}`)
      }

      const data = await response.json()
      setExtensions(data)
    } catch (err) {
      console.error("Errore durante la ricerca delle estensioni:", err)
      setError("Impossibile completare la ricerca. Riprova più tardi.")
    } finally {
      setIsSearching(false)
    }
  }

  // Effettua la ricerca quando cambia la query
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        searchExtensions(searchQuery)
      } else {
        fetchExtensions()
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filtra le estensioni in base alla tab attiva
  const filteredExtensions = extensions.filter((ext) => {
    if (activeTab === "installed") {
      return ext.isInstalled
    } else {
      return true
    }
  })

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  const handleRefresh = () => {
    fetchExtensions()
  }

  // Trova le dipendenze di un'estensione
  const findDependencies = (extensionId: string): VSCodeExtension[] => {
    const extension = extensions.find((ext) => ext.id === extensionId)
    if (!extension || !extension.dependencies || extension.dependencies.length === 0) {
      return []
    }

    return extension.dependencies
      .map((depId) => extensions.find((ext) => ext.id === depId))
      .filter((dep): dep is VSCodeExtension => dep !== undefined && !dep.isInstalled)
  }

  // Trova le estensioni che dipendono da un'estensione
  const findDependents = (extensionId: string): VSCodeExtension[] => {
    return extensions.filter((ext) => ext.isInstalled && ext.dependencies && ext.dependencies.includes(extensionId))
  }

  // Installa un'estensione
  const handleInstallExtension = async (extension: VSCodeExtension) => {
    // Verifica se ci sono dipendenze da installare
    const dependencies = findDependencies(extension.id)

    if (dependencies.length > 0) {
      // Mostra il dialogo di conferma per le dipendenze
      setDependencyDialog({
        isOpen: true,
        extension,
        dependencies,
      })
      return
    }

    // Procedi con l'installazione
    await installExtension(extension)
  }

  // Funzione per installare effettivamente l'estensione
  const installExtension = async (extension: VSCodeExtension) => {
    setInstallingExtensions((prev) => [...prev, extension.id])

    try {
      const response = await fetch("/api/extensions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: extension.id,
          isInstalled: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Errore durante l'installazione dell'estensione: ${response.status}`)
      }

      const data = await response.json()

      // Gestisci la risposta che può includere dipendenze installate
      if (data.extension && data.installedDependencies) {
        // Aggiorna l'estensione principale
        setExtensions(extensions.map((ext) => (ext.id === data.extension.id ? data.extension : ext)))

        // Aggiorna le dipendenze installate
        if (data.installedDependencies.length > 0) {
          const updatedExtensions = [...extensions]

          data.installedDependencies.forEach((dep: VSCodeExtension) => {
            const index = updatedExtensions.findIndex((ext) => ext.id === dep.id)
            if (index !== -1) {
              updatedExtensions[index] = dep
            }
          })

          setExtensions(updatedExtensions)

          toast({
            title: "Dipendenze installate",
            description: `${data.installedDependencies.length} dipendenze sono state installate automaticamente.`,
          })
        }

        // Notifica il componente padre
        if (onInstallExtension) {
          onInstallExtension(data.extension)
        }
      } else {
        // Gestione standard per retrocompatibilità
        setExtensions(extensions.map((ext) => (ext.id === extension.id ? { ...ext, isInstalled: true } : ext)))

        // Notifica il componente padre
        if (onInstallExtension) {
          onInstallExtension(extension)
        }
      }

      toast({
        title: "Estensione installata",
        description: `${extension.name} è stata installata con successo.`,
      })
    } catch (err) {
      console.error("Errore durante l'installazione dell'estensione:", err)
      toast({
        title: "Errore di installazione",
        description: `Impossibile installare ${extension.name}. Riprova più tardi.`,
        variant: "destructive",
      })
    } finally {
      setInstallingExtensions((prev) => prev.filter((id) => id !== extension.id))
    }
  }

  // Disinstalla un'estensione
  const handleUninstallExtension = async (extension: VSCodeExtension) => {
    // Verifica se ci sono estensioni che dipendono da questa
    const dependents = findDependents(extension.id)

    if (dependents.length > 0) {
      // Mostra il dialogo di avviso per le estensioni dipendenti
      setDependentDialog({
        isOpen: true,
        extension,
        dependents,
      })
      return
    }

    // Procedi con la disinstallazione
    await uninstallExtension(extension)
  }

  // Funzione per disinstallare effettivamente l'estensione
  const uninstallExtension = async (extension: VSCodeExtension) => {
    setUninstallingExtensions((prev) => [...prev, extension.id])

    try {
      const response = await fetch("/api/extensions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: extension.id,
          isInstalled: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`Errore durante la disinstallazione dell'estensione: ${response.status}`)
      }

      const data = await response.json()

      // Aggiorna lo stato locale
      setExtensions(extensions.map((ext) => (ext.id === extension.id ? { ...ext, isInstalled: false } : ext)))

      // Notifica il componente padre
      if (onUninstallExtension) {
        onUninstallExtension(extension)
      }

      toast({
        title: "Estensione disinstallata",
        description: `${extension.name} è stata disinstallata con successo.`,
      })
    } catch (err) {
      console.error("Errore durante la disinstallazione dell'estensione:", err)
      toast({
        title: "Errore di disinstallazione",
        description: `Impossibile disinstallare ${extension.name}. Riprova più tardi.`,
        variant: "destructive",
      })
    } finally {
      setUninstallingExtensions((prev) => prev.filter((id) => id !== extension.id))
    }
  }

  // Installa un'estensione con le sue dipendenze
  const handleInstallWithDependencies = async () => {
    if (!dependencyDialog.extension) return

    setDependencyDialog((prev) => ({ ...prev, isOpen: false }))

    // Prima installa le dipendenze
    for (const dependency of dependencyDialog.dependencies) {
      await installExtension(dependency)
    }

    // Poi installa l'estensione principale
    await installExtension(dependencyDialog.extension)
  }

  // Disinstalla un'estensione forzatamente (anche se ci sono dipendenti)
  const handleForceUninstall = async () => {
    if (!dependentDialog.extension) return

    setDependentDialog((prev) => ({ ...prev, isOpen: false }))

    // Disinstalla l'estensione
    await uninstallExtension(dependentDialog.extension)

    // Avvisa che le estensioni dipendenti potrebbero non funzionare correttamente
    toast({
      title: "Attenzione",
      description: `Alcune estensioni potrebbero non funzionare correttamente dopo questa disinstallazione.`,
      variant: "destructive",
    })
  }

  // Gestisce la navigazione tra le estensioni nella vista dettagliata
  const handleNavigateToExtension = (extensionId: string) => {
    const extension = extensions.find((ext) => ext.id === extensionId)
    if (extension) {
      setSelectedExtension(extension)
    }
  }

  // Se è selezionata un'estensione, mostra la vista dettagliata
  if (selectedExtension) {
    return (
      <ExtensionDetail
        extension={selectedExtension}
        allExtensions={filteredExtensions}
        onClose={() => setSelectedExtension(null)}
        onInstall={handleInstallExtension}
        onUninstall={handleUninstallExtension}
        onNavigate={handleNavigateToExtension}
        isInstalling={installingExtensions.includes(selectedExtension.id)}
        isUninstalling={uninstallingExtensions.includes(selectedExtension.id)}
      />
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 text-sm font-medium flex items-center justify-between">
        <span>ESTENSIONI</span>
        <div className="flex items-center space-x-1">
          <button
            className="p-1 rounded hover:bg-gray-700"
            title="Aggiorna"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="p-2">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca Estensioni"
            className="pl-8 pr-8 py-1 h-8 text-sm"
            disabled={isLoading}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          {searchQuery && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              onClick={handleClearSearch}
              disabled={isLoading}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex border-b border-gray-700 px-2">
        <button
          className={`px-3 py-1 text-sm ${activeTab === "installed" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("installed")}
        >
          Installate
        </button>
        <button
          className={`px-3 py-1 text-sm ${activeTab === "marketplace" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("marketplace")}
        >
          Marketplace
        </button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-sm text-gray-400">
            <RefreshCw size={24} className="animate-spin mb-2" />
            <p>Caricamento estensioni...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-sm text-red-400">
            <AlertCircle size={24} className="mb-2" />
            <p>{error}</p>
            <button
              className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-xs"
              onClick={handleRefresh}
            >
              Riprova
            </button>
          </div>
        ) : isSearching ? (
          <div className="text-sm text-gray-400 p-2">Ricerca in corso...</div>
        ) : filteredExtensions.length === 0 ? (
          <div className="text-sm text-gray-400 p-2">
            {activeTab === "installed"
              ? "Nessuna estensione installata"
              : searchQuery
                ? "Nessuna estensione trovata per la tua ricerca"
                : "Nessuna estensione disponibile"}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExtensions.map((extension) => {
              // Trova le dipendenze non installate
              const missingDependencies = extension.dependencies
                ? extension.dependencies
                    .map((depId) => extensions.find((ext) => ext.id === depId))
                    .filter((dep): dep is VSCodeExtension => dep !== undefined && !dep.isInstalled)
                : []

              return (
                <div
                  key={extension.id}
                  className="border-b border-gray-700 pb-4 last:border-b-0 hover:bg-gray-800/50 p-2 rounded cursor-pointer"
                  onClick={() => setSelectedExtension(extension)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium">{extension.name}</h3>
                        <button
                          className="ml-2 text-gray-400 hover:text-blue-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedExtension(extension)
                          }}
                          title="Visualizza dettagli"
                        >
                          <ExternalLink size={12} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400">
                        {extension.publisher} • v{extension.version}
                      </p>
                    </div>
                    <button
                      className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                        extension.isInstalled ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-500"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        extension.isInstalled ? handleUninstallExtension(extension) : handleInstallExtension(extension)
                      }}
                      disabled={
                        installingExtensions.includes(extension.id) || uninstallingExtensions.includes(extension.id)
                      }
                    >
                      {installingExtensions.includes(extension.id) ? (
                        <>
                          <Download size={12} className="animate-pulse" />
                          Installando...
                        </>
                      ) : uninstallingExtensions.includes(extension.id) ? (
                        <>
                          <RefreshCw size={12} className="animate-spin" />
                          Disinstallando...
                        </>
                      ) : extension.isInstalled ? (
                        <>
                          <Check size={12} />
                          Disinstalla
                        </>
                      ) : (
                        <>
                          <Download size={12} />
                          Installa
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs mt-1">{extension.description}</p>

                  {/* Mostra avviso per dipendenze mancanti */}
                  {!extension.isInstalled && missingDependencies.length > 0 && (
                    <div className="mt-2 text-xs text-yellow-400 flex items-center gap-1">
                      <Info size={12} />
                      <span>
                        Richiede {missingDependencies.length}{" "}
                        {missingDependencies.length === 1 ? "dipendenza" : "dipendenze"}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Dialogo per confermare l'installazione con dipendenze */}
      <Dialog
        open={dependencyDialog.isOpen}
        onOpenChange={(open) => setDependencyDialog((prev) => ({ ...prev, isOpen: open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dipendenze richieste</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm mb-4">
              L'estensione <strong>{dependencyDialog.extension?.name}</strong> richiede le seguenti dipendenze:
            </p>
            <ul className="space-y-2 mb-4">
              {dependencyDialog.dependencies.map((dep) => (
                <li key={dep.id} className="flex items-center gap-2 text-sm">
                  <Download size={14} className="text-blue-400" />
                  <span>{dep.name}</span>
                  <span className="text-xs text-gray-400">({dep.publisher})</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-400">Queste dipendenze verranno installate automaticamente.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDependencyDialog((prev) => ({ ...prev, isOpen: false }))}>
              Annulla
            </Button>
            <Button onClick={handleInstallWithDependencies}>Installa con dipendenze</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo per avvisare delle estensioni dipendenti */}
      <Dialog
        open={dependentDialog.isOpen}
        onOpenChange={(open) => setDependentDialog((prev) => ({ ...prev, isOpen: open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attenzione: Estensioni dipendenti</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm mb-4 text-yellow-400 flex items-center gap-2">
              <AlertCircle size={16} />
              <span>
                Le seguenti estensioni dipendono da <strong>{dependentDialog.extension?.name}</strong>:
              </span>
            </p>
            <ul className="space-y-2 mb-4">
              {dependentDialog.dependents.map((dep) => (
                <li key={dep.id} className="flex items-center gap-2 text-sm">
                  <span>{dep.name}</span>
                  <span className="text-xs text-gray-400">({dep.publisher})</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-red-400">
              Disinstallando questa estensione, le estensioni dipendenti potrebbero non funzionare correttamente.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDependentDialog((prev) => ({ ...prev, isOpen: open }))}>
              Annulla
            </Button>
            <Button variant="destructive" onClick={handleForceUninstall}>
              Disinstalla comunque
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
