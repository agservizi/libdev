export type VSCodeTheme = "light" | "dark" | "high-contrast"

export interface VSCodeFile {
  id: string
  name: string
  path: string
  content: string
  language: string
  lastModified: Date
  isOpen?: boolean
  isActive?: boolean
  isDirty?: boolean
}

export interface VSCodeFolder {
  id: string
  name: string
  path: string
  isExpanded?: boolean
  children: Array<VSCodeFolder | VSCodeFile>
}

export interface VSCodeWorkspace {
  id: string
  name: string
  rootFolder: VSCodeFolder
  openFiles: VSCodeFile[]
  activeFile?: VSCodeFile
}

export interface VSCodeExtension {
  id: string
  name: string
  description: string
  version: string
  publisher: string
  isInstalled: boolean
  icon?: string
  dependencies?: string[]
}

export interface VSCodeTerminal {
  id: string
  name: string
  history: string[]
  isActive: boolean
}

export interface VSCodeSettings {
  theme: VSCodeTheme
  fontSize: number
  fontFamily: string
  tabSize: number
  wordWrap: "on" | "off"
  minimap: boolean
  formatOnSave: boolean
  formatOnPaste: boolean
  lineNumbers: "on" | "off" | "relative"
  indentSize: number
  autoSave: "off" | "afterDelay" | "onFocusChange" | "onWindowChange"
  autoSaveDelay: number
}

export interface VSCodeState {
  workspace: VSCodeWorkspace
  terminals: VSCodeTerminal[]
  extensions: VSCodeExtension[]
  settings: VSCodeSettings
  sidebarVisible: boolean
  sidebarWidth: number
  activeSidebarPanel: "explorer" | "search" | "git" | "debug" | "extensions"
  bottomPanelVisible: boolean
  bottomPanelHeight: number
  activeBottomPanel: "problems" | "output" | "terminal" | "debug console"
  isCommandPaletteOpen: boolean
}
