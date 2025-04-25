"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { prettierConfig } from "@/lib/prettier-config"

interface FormatterSettingsProps {
  onSettingsChange: (settings: Record<string, any>) => void
  formatOnSave: boolean
  onFormatOnSaveChange: (value: boolean) => void
}

export default function FormatterSettings({
  onSettingsChange,
  formatOnSave,
  onFormatOnSaveChange,
}: FormatterSettingsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [settings, setSettings] = useState({
    printWidth: prettierConfig.printWidth,
    tabWidth: prettierConfig.tabWidth,
    useTabs: prettierConfig.useTabs,
    semi: prettierConfig.semi,
    singleQuote: prettierConfig.singleQuote,
    trailingComma: prettierConfig.trailingComma,
  })

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    onSettingsChange(settings)
    setIsDialogOpen(false)
    toast({
      title: "Impostazioni salvate",
      description: "Le impostazioni di formattazione sono state aggiornate.",
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Settings size={16} />
          <span>Impostazioni</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Impostazioni di formattazione</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <input
                type="checkbox"
                checked={formatOnSave}
                onChange={(e) => onFormatOnSaveChange(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-700"
              />
              Formatta al salvataggio
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Formatta automaticamente il codice quando viene salvato.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="printWidth" className="text-sm font-medium">
                Larghezza di stampa
              </label>
              <Input
                id="printWidth"
                type="number"
                value={settings.printWidth}
                onChange={(e) => handleChange("printWidth", Number.parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Specifica la lunghezza della linea in cui Prettier eseguirà il wrapping.
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="tabWidth" className="text-sm font-medium">
                Larghezza tab
              </label>
              <Input
                id="tabWidth"
                type="number"
                value={settings.tabWidth}
                onChange={(e) => handleChange("tabWidth", Number.parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Specifica il numero di spazi per livello di indentazione.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.useTabs}
                  onChange={(e) => handleChange("useTabs", e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-700"
                />
                Usa tabs
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Indenta con tabs invece che con spazi.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.semi}
                  onChange={(e) => handleChange("semi", e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-700"
                />
                Punto e virgola
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Aggiungi punto e virgola alla fine delle istruzioni.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.singleQuote}
                  onChange={(e) => handleChange("singleQuote", e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-700"
                />
                Virgolette singole
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Usa virgolette singole invece che doppie.</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="trailingComma" className="text-sm font-medium">
                Virgola finale
              </label>
              <select
                id="trailingComma"
                value={settings.trailingComma}
                onChange={(e) => handleChange("trailingComma", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="none">Nessuna</option>
                <option value="es5">ES5</option>
                <option value="all">Tutte</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400">Virgola finale in oggetti e array multilinea.</p>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleSave}>Salva impostazioni</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
