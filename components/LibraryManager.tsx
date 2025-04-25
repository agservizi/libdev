"use client"

import { useState, useEffect } from "react"
import { Library, Check, X, Plus, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

// Definizione delle librerie supportate
export interface LibraryDefinition {
  id: string
  name: string
  category: "css" | "js"
  url: string
  description: string
  version: string
  cdnUrl: string
  docsUrl: string
}

// Librerie predefinite
export const PREDEFINED_LIBRARIES: LibraryDefinition[] = [
  {
    id: "bootstrap-css",
    name: "Bootstrap CSS",
    category: "css",
    url: "https://getbootstrap.com/",
    description: "Il framework CSS più popolare per sviluppare siti web responsive e mobile-first",
    version: "5.3.0",
    cdnUrl: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    docsUrl: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
  },
  {
    id: "bootstrap-js",
    name: "Bootstrap JS",
    category: "js",
    url: "https://getbootstrap.com/",
    description: "Componenti JavaScript per Bootstrap",
    version: "5.3.0",
    cdnUrl: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
    docsUrl: "https://getbootstrap.com/docs/5.3/getting-started/javascript/",
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    category: "css",
    url: "https://tailwindcss.com/",
    description: "Un framework CSS utility-first per la creazione rapida di design personalizzati",
    version: "3.3.3",
    cdnUrl: "https://cdn.jsdelivr.net/npm/tailwindcss@3.3.3/dist/tailwind.min.css",
    docsUrl: "https://tailwindcss.com/docs",
  },
  {
    id: "jquery",
    name: "jQuery",
    category: "js",
    url: "https://jquery.com/",
    description: "Una libreria JavaScript veloce, piccola e ricca di funzionalità",
    version: "3.7.0",
    cdnUrl: "https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js",
    docsUrl: "https://api.jquery.com/",
  },
  {
    id: "react",
    name: "React",
    category: "js",
    url: "https://reactjs.org/",
    description: "Una libreria JavaScript per costruire interfacce utente",
    version: "18.2.0",
    cdnUrl: "https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js",
    docsUrl: "https://reactjs.org/docs/getting-started.html",
  },
  {
    id: "react-dom",
    name: "React DOM",
    category: "js",
    url: "https://reactjs.org/",
    description: "Rendering di React per il DOM",
    version: "18.2.0",
    cdnUrl: "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js",
    docsUrl: "https://reactjs.org/docs/react-dom.html",
  },
  {
    id: "vue",
    name: "Vue.js",
    category: "js",
    url: "https://vuejs.org/",
    description: "Un framework JavaScript progressivo per la costruzione di interfacce utente",
    version: "3.3.4",
    cdnUrl: "https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js",
    docsUrl: "https://vuejs.org/guide/introduction.html",
  },
  {
    id: "angular",
    name: "Angular",
    category: "js",
    url: "https://angular.io/",
    description: "Una piattaforma per la costruzione di applicazioni web e mobile",
    version: "16.0.0",
    cdnUrl: "https://cdn.jsdelivr.net/npm/@angular/core@16.0.0",
    docsUrl: "https://angular.io/docs",
  },
  {
    id: "bulma",
    name: "Bulma",
    category: "css",
    url: "https://bulma.io/",
    description: "Un framework CSS moderno basato su Flexbox",
    version: "0.9.4",
    cdnUrl: "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css",
    docsUrl: "https://bulma.io/documentation/",
  },
  {
    id: "foundation",
    name: "Foundation",
    category: "css",
    url: "https://get.foundation/",
    description: "Il framework responsive più avanzato al mondo",
    version: "6.7.5",
    cdnUrl: "https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css",
    docsUrl: "https://get.foundation/sites/docs/",
  },
  {
    id: "foundation-js",
    name: "Foundation JS",
    category: "js",
    url: "https://get.foundation/",
    description: "JavaScript per il framework Foundation",
    version: "6.7.5",
    cdnUrl: "https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/js/foundation.min.js",
    docsUrl: "https://get.foundation/sites/docs/javascript.html",
  },
  {
    id: "materialize-css",
    name: "Materialize CSS",
    category: "css",
    url: "https://materializecss.com/",
    description: "Un framework CSS responsive basato su Material Design",
    version: "1.0.0",
    cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
    docsUrl: "https://materializecss.com/getting-started.html",
  },
  {
    id: "materialize-js",
    name: "Materialize JS",
    category: "js",
    url: "https://materializecss.com/",
    description: "JavaScript per il framework Materialize",
    version: "1.0.0",
    cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
    docsUrl: "https://materializecss.com/getting-started.html",
  },
  {
    id: "lodash",
    name: "Lodash",
    category: "js",
    url: "https://lodash.com/",
    description: "Una moderna libreria JavaScript di utilità",
    version: "4.17.21",
    cdnUrl: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js",
    docsUrl: "https://lodash.com/docs/",
  },
  {
    id: "moment",
    name: "Moment.js",
    category: "js",
    url: "https://momentjs.com/",
    description: "Analizza, convalida, manipola e visualizza date e orari in JavaScript",
    version: "2.29.4",
    cdnUrl: "https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js",
    docsUrl: "https://momentjs.com/docs/",
  },
  {
    id: "axios",
    name: "Axios",
    category: "js",
    url: "https://axios-http.com/",
    description: "Client HTTP basato su promesse per il browser e node.js",
    version: "1.4.0",
    cdnUrl: "https://cdn.jsdelivr.net/npm/axios@1.4.0/dist/axios.min.js",
    docsUrl: "https://axios-http.com/docs/intro",
  },
  {
    id: "fontawesome",
    name: "Font Awesome",
    category: "css",
    url: "https://fontawesome.com/",
    description: "La libreria di icone e toolkit CSS più popolare sul web",
    version: "6.4.0",
    cdnUrl: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",
    docsUrl: "https://fontawesome.com/docs",
  },
  {
    id: "animate-css",
    name: "Animate.css",
    category: "css",
    url: "https://animate.style/",
    description: "Una libreria di animazioni CSS pronte all'uso",
    version: "4.1.1",
    cdnUrl: "https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css",
    docsUrl: "https://animate.style/",
  },
  {
    id: "three-js",
    name: "Three.js",
    category: "js",
    url: "https://threejs.org/",
    description: "Una libreria JavaScript 3D leggera",
    version: "0.154.0",
    cdnUrl: "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.min.js",
    docsUrl: "https://threejs.org/docs/",
  },
  {
    id: "d3",
    name: "D3.js",
    category: "js",
    url: "https://d3js.org/",
    description: "Una libreria JavaScript per manipolare documenti basati su dati",
    version: "7.8.5",
    cdnUrl: "https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js",
    docsUrl: "https://d3js.org/getting-started",
  },
]

interface LibraryManagerProps {
  selectedLibraries: LibraryDefinition[]
  onLibrariesChange: (libraries: LibraryDefinition[]) => void
}

export default function LibraryManager({ selectedLibraries, onLibrariesChange }: LibraryManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [customLibraryUrl, setCustomLibraryUrl] = useState("")
  const [customLibraryName, setCustomLibraryName] = useState("")
  const [customLibraryCategory, setCustomLibraryCategory] = useState<"css" | "js">("js")
  const [filter, setFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<"all" | "css" | "js">("all")
  const [libraries, setLibraries] = useState<LibraryDefinition[]>(PREDEFINED_LIBRARIES)
  const [isUpdating, setIsUpdating] = useState(false)

  // Funzione per aggiornare le versioni delle librerie
  const updateLibraryVersions = async () => {
    setIsUpdating(true)
    try {
      // Aggiorna Bootstrap
      const bootstrapResponse = await fetch("https://api.cdnjs.com/libraries/bootstrap?fields=version")
      const bootstrapData = await bootstrapResponse.json()
      const latestBootstrapVersion = bootstrapData.version

      // Aggiorna Tailwind
      const tailwindResponse = await fetch("https://api.cdnjs.com/libraries/tailwindcss?fields=version")
      const tailwindData = await tailwindResponse.json()
      const latestTailwindVersion = tailwindData.version

      // Aggiorna le librerie con le nuove versioni
      const updatedLibraries = libraries.map((lib) => {
        if (lib.id === "bootstrap-css" || lib.id === "bootstrap-js") {
          return {
            ...lib,
            version: latestBootstrapVersion,
            cdnUrl: lib.cdnUrl.replace(/bootstrap@[\d.]+/, `bootstrap@${latestBootstrapVersion}`),
          }
        } else if (lib.id === "tailwind-css") {
          return {
            ...lib,
            version: latestTailwindVersion,
            cdnUrl: lib.cdnUrl.replace(/tailwindcss@[\d.]+/, `tailwindcss@${latestTailwindVersion}`),
          }
        }
        return lib
      })

      setLibraries(updatedLibraries)

      // Aggiorna anche le librerie selezionate
      const updatedSelectedLibraries = selectedLibraries.map((lib) => {
        const updatedLib = updatedLibraries.find((l) => l.id === lib.id)
        return updatedLib || lib
      })

      onLibrariesChange(updatedSelectedLibraries)

      toast({
        title: "Librerie aggiornate",
        description: `Bootstrap: ${latestBootstrapVersion}, Tailwind: ${latestTailwindVersion}`,
      })
    } catch (error) {
      console.error("Errore durante l'aggiornamento delle librerie:", error)
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'aggiornamento delle librerie.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Carica le versioni più recenti all'apertura del dialogo
  useEffect(() => {
    if (isDialogOpen) {
      updateLibraryVersions()
    }
  }, [isDialogOpen])

  // Funzione per aggiungere/rimuovere una libreria
  const toggleLibrary = (library: LibraryDefinition) => {
    const isSelected = selectedLibraries.some((lib) => lib.id === library.id)

    if (isSelected) {
      onLibrariesChange(selectedLibraries.filter((lib) => lib.id !== library.id))
    } else {
      onLibrariesChange([...selectedLibraries, library])
    }
  }

  // Funzione per aggiungere una libreria personalizzata
  const addCustomLibrary = () => {
    if (!customLibraryUrl.trim() || !customLibraryName.trim()) {
      toast({
        title: "Informazioni mancanti",
        description: "Inserisci sia l'URL che il nome della libreria.",
        variant: "destructive",
      })
      return
    }

    // Verifica se l'URL è valido
    try {
      new URL(customLibraryUrl)
    } catch (error) {
      toast({
        title: "URL non valido",
        description: "Inserisci un URL valido per la libreria.",
        variant: "destructive",
      })
      return
    }

    // Crea un ID univoco per la libreria personalizzata
    const customId = `custom-${Date.now()}`

    // Crea la definizione della libreria personalizzata
    const customLibrary: LibraryDefinition = {
      id: customId,
      name: customLibraryName,
      category: customLibraryCategory,
      url: customLibraryUrl,
      description: "Libreria personalizzata",
      version: "custom",
      cdnUrl: customLibraryUrl,
      docsUrl: "",
    }

    // Aggiungi la libreria personalizzata
    onLibrariesChange([...selectedLibraries, customLibrary])

    // Resetta i campi
    setCustomLibraryUrl("")
    setCustomLibraryName("")

    toast({
      title: "Libreria aggiunta",
      description: `La libreria "${customLibraryName}" è stata aggiunta.`,
    })
  }

  // Filtra le librerie in base alla ricerca e alla categoria
  const filteredLibraries = libraries.filter((library) => {
    const matchesSearch =
      library.name.toLowerCase().includes(filter.toLowerCase()) ||
      library.description.toLowerCase().includes(filter.toLowerCase())
    const matchesCategory = categoryFilter === "all" || library.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Library size={16} />
          <span>Librerie ({selectedLibraries.length})</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Gestione Librerie</span>
            <Button
              variant="outline"
              size="sm"
              onClick={updateLibraryVersions}
              disabled={isUpdating}
              className="flex items-center gap-1"
            >
              <RefreshCw size={16} className={isUpdating ? "animate-spin" : ""} />
              <span>Aggiorna versioni</span>
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          {/* Filtri */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Cerca librerie..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-grow"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as "all" | "css" | "js")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Tutte le categorie</option>
              <option value="css">CSS</option>
              <option value="js">JavaScript</option>
            </select>
          </div>

          {/* Librerie selezionate */}
          {selectedLibraries.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Librerie selezionate</h3>
              <div className="flex flex-wrap gap-2">
                {selectedLibraries.map((library) => (
                  <div
                    key={library.id}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md text-sm"
                  >
                    <span>
                      {library.name} v{library.version}
                    </span>
                    <button
                      onClick={() => toggleLibrary(library)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Elenco librerie */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Librerie disponibili</h3>
            <div className="max-h-60 overflow-y-auto border rounded-md divide-y">
              {filteredLibraries.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  Nessuna libreria trovata con i filtri selezionati.
                </div>
              ) : (
                filteredLibraries.map((library) => {
                  const isSelected = selectedLibraries.some((lib) => lib.id === library.id)

                  return (
                    <div
                      key={library.id}
                      className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                        isSelected ? "bg-blue-50 dark:bg-blue-900/20" : ""
                      }`}
                      onClick={() => toggleLibrary(library)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{library.name}</h4>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded-full ${
                                library.category === "css"
                                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200"
                                  : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
                              }`}
                            >
                              {library.category.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">v{library.version}</span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                            {library.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          {library.docsUrl && (
                            <a
                              href={library.docsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                              title="Documentazione"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              isSelected ? "bg-blue-600 text-white" : "border border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {isSelected && <Check size={14} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Aggiungi libreria personalizzata */}
          <div className="space-y-2 border-t pt-4">
            <h3 className="text-sm font-medium">Aggiungi libreria personalizzata</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input
                placeholder="Nome libreria"
                value={customLibraryName}
                onChange={(e) => setCustomLibraryName(e.target.value)}
              />
              <select
                value={customLibraryCategory}
                onChange={(e) => setCustomLibraryCategory(e.target.value as "css" | "js")}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="css">CSS</option>
                <option value="js">JavaScript</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="URL CDN (https://...)"
                value={customLibraryUrl}
                onChange={(e) => setCustomLibraryUrl(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={addCustomLibrary}>
                <Plus size={16} className="mr-1" />
                Aggiungi
              </Button>
            </div>
          </div>

          {/* Note e suggerimenti */}
          <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
            <p>Le librerie selezionate saranno automaticamente incluse nell'anteprima del codice.</p>
            <p className="mt-1">
              Per CSS: aggiungi il link nel tag &lt;head&gt;. Per JavaScript: aggiungi lo script prima della chiusura
              del tag &lt;body&gt;.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
