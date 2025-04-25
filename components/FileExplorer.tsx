"use client"

import type React from "react"

import { useState } from "react"
import { File, Plus, Trash2, Save, Upload, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface FileData {
  id: string
  name: string
  content: string
  language: string
}

interface FileExplorerProps {
  onFileSelect: (file: FileData) => void
  currentFile: FileData | null
  onSaveFile: (file: FileData) => void
}

export default function FileExplorer({ onFileSelect, currentFile, onSaveFile }: FileExplorerProps) {
  const [files, setFiles] = useState<FileData[]>([])
  const [newFileName, setNewFileName] = useState("")
  const [newFileLanguage, setNewFileLanguage] = useState("javascript")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Funzione per creare un nuovo file
  const createNewFile = () => {
    if (!newFileName) {
      toast({
        title: "Nome file richiesto",
        description: "Inserisci un nome per il nuovo file.",
        variant: "destructive",
      })
      return
    }

    // Verifica se il file esiste già
    if (files.some((file) => file.name === newFileName)) {
      toast({
        title: "File già esistente",
        description: `Un file con il nome "${newFileName}" esiste già.`,
        variant: "destructive",
      })
      return
    }

    // Estensioni per i vari linguaggi
    const extensions: Record<string, string> = {
      html: "html",
      css: "css",
      javascript: "js",
      typescript: "ts",
      jsx: "jsx",
      tsx: "tsx",
      php: "php",
    }

    // Aggiungi estensione se non presente
    let fileName = newFileName
    const hasExtension = Object.values(extensions).some((ext) => fileName.endsWith(`.${ext}`))

    if (!hasExtension) {
      fileName = `${fileName}.${extensions[newFileLanguage]}`
    }

    // Crea il nuovo file
    const newFile: FileData = {
      id: Date.now().toString(),
      name: fileName,
      content: "",
      language: newFileLanguage,
    }

    setFiles([...files, newFile])
    setNewFileName("")
    setIsDialogOpen(false)

    // Seleziona automaticamente il nuovo file
    onFileSelect(newFile)

    toast({
      title: "File creato",
      description: `Il file "${fileName}" è stato creato con successo.`,
    })
  }

  // Funzione per eliminare un file
  const deleteFile = (id: string) => {
    const fileToDelete = files.find((file) => file.id === id)

    if (!fileToDelete) return

    setFiles(files.filter((file) => file.id !== id))

    // Se il file corrente è stato eliminato, deseleziona
    if (currentFile && currentFile.id === id) {
      onFileSelect(files[0] || null)
    }

    toast({
      title: "File eliminato",
      description: `Il file "${fileToDelete.name}" è stato eliminato.`,
    })
  }

  // Funzione per salvare il progetto
  const saveProject = () => {
    if (files.length === 0) {
      toast({
        title: "Nessun file da salvare",
        description: "Crea almeno un file prima di salvare il progetto.",
        variant: "destructive",
      })
      return
    }

    // Salva nel localStorage
    localStorage.setItem("libdev-project", JSON.stringify(files))

    toast({
      title: "Progetto salvato",
      description: "Il progetto è stato salvato nel browser.",
    })
  }

  // Funzione per caricare il progetto
  const loadProject = () => {
    const savedProject = localStorage.getItem("libdev-project")

    if (!savedProject) {
      toast({
        title: "Nessun progetto salvato",
        description: "Non è stato trovato alcun progetto salvato nel browser.",
        variant: "destructive",
      })
      return
    }

    try {
      const loadedFiles = JSON.parse(savedProject) as FileData[]
      setFiles(loadedFiles)

      if (loadedFiles.length > 0) {
        onFileSelect(loadedFiles[0])
      }

      toast({
        title: "Progetto caricato",
        description: `Caricati ${loadedFiles.length} file.`,
      })
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il caricamento del progetto.",
        variant: "destructive",
      })
    }
  }

  // Funzione per esportare il progetto
  const exportProject = () => {
    if (files.length === 0) {
      toast({
        title: "Nessun file da esportare",
        description: "Crea almeno un file prima di esportare il progetto.",
        variant: "destructive",
      })
      return
    }

    const projectData = JSON.stringify(files, null, 2)
    const blob = new Blob([projectData], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "libdev-project.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Progetto esportato",
      description: "Il progetto è stato esportato come file JSON.",
    })
  }

  // Funzione per importare un progetto
  const importProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importedFiles = JSON.parse(content) as FileData[]

        setFiles(importedFiles)

        if (importedFiles.length > 0) {
          onFileSelect(importedFiles[0])
        }

        toast({
          title: "Progetto importato",
          description: `Importati ${importedFiles.length} file.`,
        })
      } catch (error) {
        toast({
          title: "Errore",
          description: "Il file selezionato non è un progetto LibDev valido.",
          variant: "destructive",
        })
      }
    }

    reader.readAsText(file)

    // Reset input
    event.target.value = ""
  }

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900 dark:text-white">File</h3>
        <div className="flex space-x-1">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" title="Nuovo file">
                <Plus size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crea nuovo file</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="fileName" className="text-sm font-medium">
                    Nome file
                  </label>
                  <Input
                    id="fileName"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="main"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="fileLanguage" className="text-sm font-medium">
                    Linguaggio
                  </label>
                  <select
                    id="fileLanguage"
                    value={newFileLanguage}
                    onChange={(e) => setNewFileLanguage(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="jsx">React (JSX)</option>
                    <option value="tsx">React (TSX)</option>
                    <option value="php">PHP</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <Button onClick={createNewFile}>Crea file</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        {files.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            <p>Nessun file</p>
            <p className="mt-1">Clicca + per creare un file</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {files.map((file) => (
              <li
                key={file.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  currentFile && currentFile.id === file.id
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => onFileSelect(file)}
              >
                <div className="flex items-center space-x-2 overflow-hidden">
                  <File size={16} className="flex-shrink-0" />
                  <span className="truncate text-sm">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteFile(file.id)
                  }}
                  title="Elimina file"
                >
                  <Trash2 size={14} />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 space-y-2">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="w-full" onClick={saveProject} title="Salva progetto">
            <Save size={14} className="mr-1" />
            Salva
          </Button>
          <Button variant="outline" size="sm" className="w-full" onClick={loadProject} title="Carica progetto">
            <Upload size={14} className="mr-1" />
            Carica
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="w-full" onClick={exportProject} title="Esporta progetto">
            <Download size={14} className="mr-1" />
            Esporta
          </Button>
          <div className="relative w-full">
            <Button variant="outline" size="sm" className="w-full" title="Importa progetto">
              <Upload size={14} className="mr-1" />
              Importa
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importProject}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Importa progetto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
