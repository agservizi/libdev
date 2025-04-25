"use client"

import { useState } from "react"
import { Download, Archive, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import JSZip from "jszip"
import FileSaver from "file-saver"
import type { ProjectFile } from "./CodeEditor"

interface DownloadCodeProps {
  files: ProjectFile[]
  projectName: string
}

export default function DownloadCode({ files, projectName }: DownloadCodeProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Funzione per scaricare un singolo file
  const downloadSingleFile = (file: ProjectFile) => {
    const blob = new Blob([file.content], { type: "text/plain;charset=utf-8" })
    FileSaver.saveAs(blob, file.name)

    toast({
      title: "File scaricato",
      description: `Il file "${file.name}" è stato scaricato con successo.`,
    })
  }

  // Funzione per scaricare tutti i file come ZIP
  const downloadAsZip = () => {
    if (files.length === 0) {
      toast({
        title: "Nessun file da scaricare",
        description: "Non ci sono file nel progetto da scaricare.",
        variant: "destructive",
      })
      return
    }

    const zip = new JSZip()

    // Aggiungi tutti i file al ZIP
    files.forEach((file) => {
      // Crea la struttura delle cartelle se necessario
      const path = file.path.startsWith("/") ? file.path.substring(1) : file.path
      zip.file(path, file.content)
    })

    // Genera il file ZIP
    zip.generateAsync({ type: "blob" }).then((content) => {
      // Scarica il file ZIP
      const sanitizedProjectName = projectName.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      FileSaver.saveAs(content, `${sanitizedProjectName}.zip`)

      toast({
        title: "Progetto scaricato",
        description: `Il progetto "${projectName}" è stato scaricato come file ZIP.`,
      })

      setIsDialogOpen(false)
    })
  }

  // Funzione per scaricare come HTML/CSS/JS separati
  const downloadAsSeparateFiles = () => {
    if (files.length === 0) {
      toast({
        title: "Nessun file da scaricare",
        description: "Non ci sono file nel progetto da scaricare.",
        variant: "destructive",
      })
      return
    }

    // Crea un elemento per ogni file e simula il click per scaricare
    files.forEach((file) => {
      const blob = new Blob([file.content], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })

    toast({
      title: "File scaricati",
      description: `${files.length} file sono stati scaricati.`,
    })

    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Download size={16} />
          <span>Scarica</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scarica codice sorgente</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Button onClick={downloadAsZip} className="w-full justify-start gap-2">
              <Archive size={18} />
              <div className="text-left">
                <div>Scarica come ZIP</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Scarica tutti i file in un archivio compresso
                </div>
              </div>
            </Button>

            <Button onClick={downloadAsSeparateFiles} className="w-full justify-start gap-2">
              <FileDown size={18} />
              <div className="text-left">
                <div>Scarica file separati</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Scarica ogni file individualmente</div>
              </div>
            </Button>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">File nel progetto</h3>
              <ul className="max-h-40 overflow-y-auto border rounded-md divide-y">
                {files.map((file) => (
                  <li
                    key={file.id}
                    className="p-2 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <span className="text-sm truncate">{file.path}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadSingleFile(file)}
                      title={`Scarica ${file.name}`}
                    >
                      <Download size={14} />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
