"use client"

import { useState, useEffect } from "react"
import Editor, { type Monaco } from "@monaco-editor/react"
import { toast } from "@/components/ui/use-toast"
import * as prettier from "prettier"
import { getPrettierConfig } from "@/lib/prettier-config"

import ActivityBar from "./vscode/ActivityBar"
import Explorer from "./vscode/Explorer"
import EditorTabs from "./vscode/EditorTabs"
import StatusBar from "./vscode/StatusBar"
import Terminal from "./vscode/Terminal"
import CommandPalette from "./vscode/CommandPalette"
import ExtensionsPanel from "./vscode/ExtensionsPanel"

import type { VSCodeFile, VSCodeFolder, VSCodeTerminal, VSCodeSettings } from "@/types/vscode"

// Sample data
const sampleRootFolder: VSCodeFolder = {
  id: "root",
  name: "workspace",
  path: "/",
  isExpanded: true,
  children: [
    {
      id: "src",
      name: "src",
      path: "/src",
      isExpanded: true,
      children: [
        {
          id: "index-html",
          name: "index.html",
          path: "/src/index.html",
          content:
            '<!DOCTYPE html>\n<html>\n<head>\n  <title>La Mia App</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Ciao, Mondo!</h1>\n  <script src="app.js"></script>\n</body>\n</html>',
          language: "html",
          lastModified: new Date(),
        },
        {
          id: "styles-css",
          name: "styles.css",
          path: "/src/styles.css",
          content:
            "body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background-color: #f5f5f5;\n}\n\nh1 {\n  color: #333;\n}",
          language: "css",
          lastModified: new Date(),
        },
        {
          id: "app-js",
          name: "app.js",
          path: "/src/app.js",
          content: 'document.addEventListener("DOMContentLoaded", function() {\n  console.log("App caricata!");\n});',
          language: "javascript",
          lastModified: new Date(),
        },
      ],
    },
    {
      id: "public",
      name: "public",
      path: "/public",
      isExpanded: false,
      children: [],
    },
  ],
}

const defaultSettings: VSCodeSettings = {
  theme: "dark",
  fontSize: 14,
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  tabSize: 2,
  wordWrap: "on",
  minimap: true,
  formatOnSave: true,
  formatOnPaste: true,
  lineNumbers: "on",
  indentSize: 2,
  autoSave: "off",
  autoSaveDelay: 1000,
}

export default function VSCodeEditor() {
  // State
  const [activePanel, setActivePanel] = useState("explorer")
  const [rootFolder, setRootFolder] = useState<VSCodeFolder>(sampleRootFolder)
  const [openFiles, setOpenFiles] = useState<VSCodeFile[]>([])
  const [activeFile, setActiveFile] = useState<VSCodeFile | undefined>(undefined)
  const [terminals, setTerminals] = useState<VSCodeTerminal[]>([
    {
      id: "terminal-1",
      name: "bash",
      history: ["Benvenuto nel Terminale LibDev"],
      isActive: true,
    },
  ])
  const [activeTerminal, setActiveTerminal] = useState<VSCodeTerminal | undefined>(terminals[0])
  const [isBottomPanelVisible, setIsBottomPanelVisible] = useState(false)
  const [bottomPanelHeight, setBottomPanelHeight] = useState(300)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [settings, setSettings] = useState<VSCodeSettings>(defaultSettings)
  const [editorPosition, setEditorPosition] = useState({ line: 1, column: 1 })

  // Monaco editor reference
  const [monacoInstance, setMonacoInstance] = useState<Monaco | null>(null)
  const [editorInstance, setEditorInstance] = useState<any>(null)

  // Handle file selection
  const handleFileSelect = (file: VSCodeFile) => {
    // Check if file is already open
    if (!openFiles.some((f) => f.id === file.id)) {
      setOpenFiles([...openFiles, file])
    }
    setActiveFile(file)
  }

  // Handle file close
  const handleFileClose = (file: VSCodeFile) => {
    const newOpenFiles = openFiles.filter((f) => f.id !== file.id)
    setOpenFiles(newOpenFiles)

    // If we closed the active file, select another one
    if (activeFile?.id === file.id) {
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : undefined)
    }
  }

  // Handle file content change
  const handleEditorChange = (value: string | undefined) => {
    if (!activeFile || !value) return

    const updatedFile = { ...activeFile, content: value, isDirty: true }

    // Update active file
    setActiveFile(updatedFile)

    // Update open files
    setOpenFiles(openFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file)))

    // Update file in folder structure
    updateFileInFolder(rootFolder, updatedFile)
  }

  // Update file in folder structure
  const updateFileInFolder = (folder: VSCodeFolder, file: VSCodeFile) => {
    const updatedChildren = folder.children.map((item) => {
      if ("children" in item) {
        // It's a folder, recurse
        return updateFileInFolder(item as VSCodeFolder, file)
      } else if (item.id === file.id) {
        // It's the file we're looking for
        return file
      }
      return item
    })

    return { ...folder, children: updatedChildren }
  }

  // Handle terminal selection
  const handleTerminalSelect = (terminal: VSCodeTerminal) => {
    setActiveTerminal(terminal)
    setTerminals(
      terminals.map((t) => (t.id === terminal.id ? { ...terminal, isActive: true } : { ...t, isActive: false })),
    )
  }

  // Handle terminal close
  const handleTerminalClose = (terminal: VSCodeTerminal) => {
    const newTerminals = terminals.filter((t) => t.id !== terminal.id)
    setTerminals(newTerminals)

    // If we closed the active terminal, select another one
    if (activeTerminal?.id === terminal.id) {
      setActiveTerminal(newTerminals.length > 0 ? newTerminals[newTerminals.length - 1] : undefined)
    }
  }

  // Handle terminal create
  const handleTerminalCreate = () => {
    const newTerminal: VSCodeTerminal = {
      id: `terminal-${terminals.length + 1}`,
      name: `bash (${terminals.length + 1})`,
      history: ["Benvenuto nel Terminale LibDev"],
      isActive: true,
    }

    setTerminals([...terminals.map((t) => ({ ...t, isActive: false })), newTerminal])
    setActiveTerminal(newTerminal)
    setIsBottomPanelVisible(true)
  }

  // Handle terminal clear
  const handleTerminalClear = (terminal: VSCodeTerminal) => {
    setTerminals(terminals.map((t) => (t.id === terminal.id ? { ...terminal, history: ["Terminale pulito"] } : t)))
  }

  // Handle command execution
  const handleCommandExecute = (commandId: string) => {
    switch (commandId) {
      case "open-file":
        // Implement open file dialog
        toast({
          title: "Comando eseguito",
          description: "Comando Apri File eseguito",
        })
        break
      case "save-file":
        if (activeFile) {
          // Save file
          const updatedFile = { ...activeFile, isDirty: false }
          setActiveFile(updatedFile)
          setOpenFiles(openFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file)))
          toast({
            title: "File salvato",
            description: `${activeFile.name} è stato salvato`,
          })
        }
        break
      case "format-document":
        formatActiveFile()
        break
      case "toggle-terminal":
        setIsBottomPanelVisible(!isBottomPanelVisible)
        break
      default:
        toast({
          title: "Comando eseguito",
          description: `Comando ${commandId} eseguito`,
        })
    }
  }

  // Format active file
  const formatActiveFile = async () => {
    if (!activeFile) return

    try {
      const baseConfig = getPrettierConfig(activeFile.language)
      const formattedCode = await prettier.format(activeFile.content, baseConfig)

      // Update file with formatted code
      const updatedFile = { ...activeFile, content: formattedCode, isDirty: true }
      setActiveFile(updatedFile)
      setOpenFiles(openFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file)))

      toast({
        title: "Documento formattato",
        description: "Il documento è stato formattato con Prettier",
      })
    } catch (error) {
      console.error("Errore durante la formattazione del documento:", error)
      toast({
        title: "Errore di formattazione",
        description: "Si è verificato un errore durante la formattazione del documento",
        variant: "destructive",
      })
    }
  }

  // Handle editor mount
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    setEditorInstance(editor)
    setMonacoInstance(monaco)

    // Configure editor
    monaco.editor.defineTheme("vs-dark-custom", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1e1e1e",
        "editor.foreground": "#d4d4d4",
        "editor.lineHighlightBackground": "#2a2a2a",
        "editor.selectionBackground": "#264f78",
        "editor.inactiveSelectionBackground": "#3a3d41",
        "editorCursor.foreground": "#d4d4d4",
      },
    })

    monaco.editor.setTheme("vs-dark-custom")

    // Add cursor position change listener
    editor.onDidChangeCursorPosition((e: any) => {
      setEditorPosition({
        line: e.position.lineNumber,
        column: e.position.column,
      })
    })

    // Add keyboard shortcut for command palette
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
      setIsCommandPaletteOpen(true)
    })
  }

  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+P or Cmd+P for command palette
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }

      // Ctrl+` or Cmd+` for terminal
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault()
        setIsBottomPanelVisible(!isBottomPanelVisible)
      }

      // Ctrl+S or Cmd+S for save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        handleCommandExecute("save-file")
      }

      // Ctrl+Shift+F or Cmd+Shift+F for format
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "F") {
        e.preventDefault()
        handleCommandExecute("format-document")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isBottomPanelVisible, activeFile])

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar activePanel={activePanel} onPanelChange={setActivePanel} />

        {/* Side Panel */}
        <div className="w-64 border-r border-gray-700 bg-gray-800">
          {activePanel === "explorer" && (
            <Explorer
              rootFolder={rootFolder}
              onFileSelect={handleFileSelect}
              onCreateFile={() => {}}
              onCreateFolder={() => {}}
              onRefresh={() => {}}
            />
          )}
          {activePanel === "search" && (
            <div className="p-4">
              <h2 className="text-sm font-semibold mb-2">Cerca</h2>
              <input
                type="text"
                placeholder="Cerca nei file"
                className="w-full bg-gray-700 text-white px-3 py-1 rounded text-sm mb-2"
              />
              <div className="text-xs text-gray-400">Nessun risultato trovato</div>
            </div>
          )}
          {activePanel === "git" && (
            <div className="p-4">
              <h2 className="text-sm font-semibold mb-2">Controllo Sorgente</h2>
              <div className="text-xs text-gray-400">Nessuna modifica rilevata</div>
            </div>
          )}
          {activePanel === "debug" && (
            <div className="p-4">
              <h2 className="text-sm font-semibold mb-2">Esegui e Debug</h2>
              <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded mt-2">Avvia Debug</button>
              <div className="text-xs text-gray-400 mt-2">Nessuna configurazione di debug</div>
            </div>
          )}
          {activePanel === "extensions" && (
            <ExtensionsPanel
              onInstallExtension={(extension) => {
                toast({
                  title: "Estensione installata",
                  description: `${extension.name} è stata installata con successo.`,
                })
              }}
              onUninstallExtension={(extension) => {
                toast({
                  title: "Estensione disinstallata",
                  description: `${extension.name} è stata disinstallata con successo.`,
                })
              }}
            />
          )}
          {activePanel === "accounts" && (
            <div className="p-4">
              <h2 className="text-sm font-semibold mb-2">Account</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                <div className="text-xs">Accedi per sincronizzare le impostazioni</div>
              </div>
            </div>
          )}
          {activePanel === "settings" && (
            <div className="p-4">
              <h2 className="text-sm font-semibold mb-2">Impostazioni</h2>
              <div className="space-y-2 mt-2">
                <div className="text-xs">
                  <div className="font-medium">Dimensione Font Editor</div>
                  <input
                    type="number"
                    value={settings.fontSize}
                    onChange={(e) => setSettings({ ...settings, fontSize: Number.parseInt(e.target.value) })}
                    className="w-full bg-gray-700 text-white px-2 py-1 rounded text-xs mt-1"
                  />
                </div>
                <div className="text-xs">
                  <div className="font-medium">Dimensione Tab</div>
                  <input
                    type="number"
                    value={settings.tabSize}
                    onChange={(e) => setSettings({ ...settings, tabSize: Number.parseInt(e.target.value) })}
                    className="w-full bg-gray-700 text-white px-2 py-1 rounded text-xs mt-1"
                  />
                </div>
                <div className="text-xs flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="minimap"
                    checked={settings.minimap}
                    onChange={(e) => setSettings({ ...settings, minimap: e.target.checked })}
                  />
                  <label htmlFor="minimap">Mostra Minimappa</label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Tabs */}
          <EditorTabs
            openFiles={openFiles}
            activeFile={activeFile}
            onFileSelect={handleFileSelect}
            onFileClose={handleFileClose}
          />

          {/* Editor Content */}
          <div className="flex-1 overflow-hidden">
            {activeFile ? (
              <Editor
                height="100%"
                language={activeFile.language}
                value={activeFile.content}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                  fontSize: settings.fontSize,
                  fontFamily: settings.fontFamily,
                  minimap: { enabled: settings.minimap },
                  wordWrap: settings.wordWrap,
                  lineNumbers: settings.lineNumbers,
                  tabSize: settings.tabSize,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
                theme="vs-dark"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">Benvenuto in LibDev</h2>
                  <p className="mb-4">Apri un file per iniziare a modificarlo</p>
                  <div className="text-sm">
                    <div className="mb-1">Scorciatoie da tastiera:</div>
                    <div>Ctrl+P: Palette dei Comandi</div>
                    <div>Ctrl+`: Mostra/Nascondi Terminale</div>
                    <div>Ctrl+S: Salva File</div>
                    <div>Ctrl+Shift+F: Formatta Documento</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Panel (Terminal, Problems, Output) */}
          {isBottomPanelVisible && (
            <div className="border-t border-gray-700" style={{ height: `${bottomPanelHeight}px` }}>
              <Terminal
                terminals={terminals}
                activeTerminal={activeTerminal}
                onTerminalSelect={handleTerminalSelect}
                onTerminalClose={handleTerminalClose}
                onTerminalCreate={handleTerminalCreate}
                onTerminalClear={handleTerminalClear}
                onMaximize={() => setBottomPanelHeight(bottomPanelHeight === 300 ? 500 : 300)}
                onClose={() => setIsBottomPanelVisible(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar language={activeFile?.language} position={editorPosition} />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onCommandExecute={handleCommandExecute}
      />
    </div>
  )
}
