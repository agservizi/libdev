"use client"

import { useState } from "react"
import {
  Download,
  Check,
  RefreshCw,
  ExternalLink,
  Star,
  Calendar,
  DownloadIcon,
  Code,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import type { VSCodeExtension } from "@/types/vscode"

interface ExtensionDetailProps {
  extension: VSCodeExtension
  allExtensions: VSCodeExtension[]
  onClose: () => void
  onInstall: (extension: VSCodeExtension) => Promise<void>
  onUninstall: (extension: VSCodeExtension) => Promise<void>
  onNavigate: (extensionId: string) => void
  isInstalling: boolean
  isUninstalling: boolean
}

export default function ExtensionDetail({
  extension,
  allExtensions,
  onClose,
  onInstall,
  onUninstall,
  onNavigate,
  isInstalling,
  isUninstalling,
}: ExtensionDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Trova le estensioni precedente e successiva per la navigazione
  const extensionIndex = allExtensions.findIndex((ext) => ext.id === extension.id)
  const prevExtension = extensionIndex > 0 ? allExtensions[extensionIndex - 1] : null
  const nextExtension = extensionIndex < allExtensions.length - 1 ? allExtensions[extensionIndex + 1] : null

  // Trova le dipendenze dell'estensione
  const dependencies = extension.dependencies
    ? extension.dependencies
        .map((depId) => allExtensions.find((ext) => ext.id === depId))
        .filter((dep): dep is VSCodeExtension => dep !== undefined)
    : []

  // Trova le estensioni che dipendono da questa
  const dependents = allExtensions.filter((ext) => ext.dependencies && ext.dependencies.includes(extension.id))

  // Genera statistiche fittizie per l'estensione
  const stats = {
    downloads: Math.floor(Math.random() * 1000000) + 10000,
    rating: (Math.random() * 2 + 3).toFixed(1), // Rating tra 3.0 e 5.0
    ratingCount: Math.floor(Math.random() * 1000) + 10,
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  }

  // Formatta il numero di download
  const formatDownloads = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  // Genera stelle per il rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating - fullStars >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={14} className="fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star size={14} className="text-gray-400" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={14} className="text-gray-400" />
        ))}
      </div>
    )
  }

  // Genera un changelog fittizio
  const changelog = [
    {
      version: extension.version,
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
      changes: [
        "Aggiunto supporto per nuove funzionalità",
        "Risolti problemi di prestazioni",
        "Migliorata la compatibilità con altre estensioni",
      ],
    },
    {
      version: `${Number.parseInt(extension.version.split(".")[0])}.${Number.parseInt(extension.version.split(".")[1]) - 1}.0`,
      date: new Date(Date.now() - Math.floor(Math.random() * 100000000)),
      changes: [
        "Aggiornamento importante dell'interfaccia utente",
        "Risolti bug critici",
        "Aggiunta nuova documentazione",
      ],
    },
  ]

  // Genera screenshot fittizi
  const screenshots = [
    `/placeholder.svg?height=200&width=400&query=Screenshot of ${extension.name} extension 1`,
    `/placeholder.svg?height=200&width=400&query=Screenshot of ${extension.name} extension 2`,
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-2 p-1 rounded hover:bg-gray-700" title="Torna alla lista">
            <ChevronLeft size={16} />
          </button>
          <h2 className="text-lg font-medium">{extension.name}</h2>
        </div>

        <div className="flex items-center gap-2">
          {prevExtension && (
            <button
              onClick={() => onNavigate(prevExtension.id)}
              className="p-1 rounded hover:bg-gray-700"
              title={`Precedente: ${prevExtension.name}`}
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {nextExtension && (
            <button
              onClick={() => onNavigate(nextExtension.id)}
              className="p-1 rounded hover:bg-gray-700"
              title={`Successivo: ${nextExtension.name}`}
            >
              <ChevronRight size={16} />
            </button>
          )}

          <button
            className={`px-3 py-1 rounded flex items-center gap-1 text-sm ${
              extension.isInstalled ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-500"
            }`}
            onClick={() => (extension.isInstalled ? onUninstall(extension) : onInstall(extension))}
            disabled={isInstalling || isUninstalling}
          >
            {isInstalling ? (
              <>
                <Download size={14} className="animate-pulse" />
                Installando...
              </>
            ) : isUninstalling ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Disinstallando...
              </>
            ) : extension.isInstalled ? (
              <>
                <Check size={14} />
                Disinstalla
              </>
            ) : (
              <>
                <Download size={14} />
                Installa
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Extension info */}
          <div className="flex items-start mb-6">
            <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center mr-4 flex-shrink-0">
              <Code size={32} className="text-blue-400" />
            </div>

            <div className="flex-1">
              <h1 className="text-xl font-bold">{extension.name}</h1>
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <span className="font-medium">{extension.publisher}</span>
                <span className="mx-2">•</span>
                <span>v{extension.version}</span>
                {extension.isInstalled && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-green-400 flex items-center">
                      <Check size={14} className="mr-1" />
                      Installata
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm text-gray-300 mb-3">{extension.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center" title="Valutazione">
                  {renderStars(Number.parseFloat(stats.rating))}
                  <span className="ml-1">({stats.ratingCount})</span>
                </div>

                <div className="flex items-center" title="Download">
                  <DownloadIcon size={14} className="mr-1" />
                  <span>{formatDownloads(stats.downloads)}</span>
                </div>

                <div className="flex items-center" title="Ultimo aggiornamento">
                  <Calendar size={14} className="mr-1" />
                  <span>{stats.lastUpdated.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800 border-b border-gray-700 w-full justify-start">
              <TabsTrigger value="overview">Panoramica</TabsTrigger>
              <TabsTrigger value="features">Funzionalità</TabsTrigger>
              <TabsTrigger value="changelog">Changelog</TabsTrigger>
              <TabsTrigger value="dependencies">Dipendenze</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Descrizione</h3>
                  <p className="text-sm text-gray-300">{extension.description}</p>
                  <p className="text-sm text-gray-300 mt-2">
                    Questa estensione aggiunge funzionalità avanzate per migliorare la tua esperienza di sviluppo.
                    Progettata per essere leggera e performante, si integra perfettamente con l'ambiente VS Code.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Screenshot</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {screenshots.map((src, index) => (
                      <div key={index} className="border border-gray-700 rounded overflow-hidden">
                        <img
                          src={src || "/placeholder.svg"}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Risorse</h3>
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="flex items-center text-blue-400 hover:underline text-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        toast({
                          title: "Link esterno",
                          description: "Questa funzionalità non è disponibile nella demo.",
                        })
                      }}
                    >
                      <ExternalLink size={14} className="mr-2" />
                      Documentazione
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-blue-400 hover:underline text-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        toast({
                          title: "Link esterno",
                          description: "Questa funzionalità non è disponibile nella demo.",
                        })
                      }}
                    >
                      <ExternalLink size={14} className="mr-2" />
                      Repository GitHub
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-blue-400 hover:underline text-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        toast({
                          title: "Link esterno",
                          description: "Questa funzionalità non è disponibile nella demo.",
                        })
                      }}
                    >
                      <ExternalLink size={14} className="mr-2" />
                      Segnala un problema
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Funzionalità principali</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={16} className="text-green-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Supporto avanzato per la sintassi</p>
                        <p className="text-xs text-gray-400">
                          Evidenziazione della sintassi migliorata e suggerimenti intelligenti
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Integrazione con strumenti esterni</p>
                        <p className="text-xs text-gray-400">
                          Connessione semplificata con servizi e API di terze parti
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Snippet predefiniti</p>
                        <p className="text-xs text-gray-400">
                          Raccolta di snippet pronti all'uso per velocizzare lo sviluppo
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Diagnostica in tempo reale</p>
                        <p className="text-xs text-gray-400">
                          Identificazione immediata di errori e suggerimenti per risolverli
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Comandi</h3>
                  <div className="bg-gray-800 rounded p-3 text-sm">
                    <p className="mb-2">Questa estensione aggiunge i seguenti comandi:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>
                        <code>{extension.name}.start</code>: Avvia l'estensione
                      </li>
                      <li>
                        <code>{extension.name}.configure</code>: Apre le impostazioni dell'estensione
                      </li>
                      <li>
                        <code>{extension.name}.analyze</code>: Analizza il codice corrente
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Impostazioni</h3>
                  <div className="bg-gray-800 rounded p-3 text-sm">
                    <p className="mb-2">Personalizza l'estensione con le seguenti impostazioni:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        <code>{extension.id}.enabled</code>
                        <p className="text-xs text-gray-400">Abilita o disabilita l'estensione</p>
                      </li>
                      <li>
                        <code>{extension.id}.debugMode</code>
                        <p className="text-xs text-gray-400">Attiva la modalità debug per informazioni aggiuntive</p>
                      </li>
                      <li>
                        <code>{extension.id}.autoFormat</code>
                        <p className="text-xs text-gray-400">Formatta automaticamente il codice al salvataggio</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="changelog" className="pt-4">
              <div>
                <h3 className="text-lg font-medium mb-4">Cronologia delle versioni</h3>
                <div className="space-y-6">
                  {changelog.map((release, index) => (
                    <div key={index} className="border-l-2 border-gray-700 pl-4 relative">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1"></div>
                      <div className="flex items-center mb-2">
                        <h4 className="text-md font-medium">Versione {release.version}</h4>
                        <span className="text-xs text-gray-400 ml-3">{release.date.toLocaleDateString()}</span>
                      </div>
                      <ul className="space-y-1">
                        {release.changes.map((change, changeIndex) => (
                          <li key={changeIndex} className="text-sm text-gray-300 flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dependencies" className="pt-4">
              <div className="space-y-6">
                {dependencies.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Dipendenze</h3>
                    <p className="text-sm text-gray-300 mb-3">
                      Questa estensione richiede le seguenti estensioni per funzionare correttamente:
                    </p>
                    <ul className="space-y-2">
                      {dependencies.map((dep) => (
                        <li key={dep.id} className="bg-gray-800 p-3 rounded flex items-start">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="text-sm font-medium">{dep.name}</h4>
                              {dep.isInstalled ? (
                                <span className="ml-2 text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">
                                  Installata
                                </span>
                              ) : (
                                <span className="ml-2 text-xs bg-yellow-900/50 text-yellow-400 px-2 py-0.5 rounded-full">
                                  Non installata
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{dep.description}</p>
                          </div>
                          {!dep.isInstalled && (
                            <Button size="sm" className="ml-2 flex-shrink-0" onClick={() => onInstall(dep)}>
                              <Download size={14} className="mr-1" />
                              Installa
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Dipendenze</h3>
                    <p className="text-sm text-gray-300">
                      Questa estensione non ha dipendenze e può essere utilizzata autonomamente.
                    </p>
                  </div>
                )}

                {dependents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Utilizzata da</h3>
                    <p className="text-sm text-gray-300 mb-3">Le seguenti estensioni dipendono da questa estensione:</p>
                    <ul className="space-y-2">
                      {dependents.map((dep) => (
                        <li key={dep.id} className="bg-gray-800 p-3 rounded">
                          <h4 className="text-sm font-medium">{dep.name}</h4>
                          <p className="text-xs text-gray-400 mt-1">{dep.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
