"use client"
import { X, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VSCodeFile } from "@/types/vscode"

interface EditorTabsProps {
  openFiles: VSCodeFile[]
  activeFile?: VSCodeFile
  onFileSelect: (file: VSCodeFile) => void
  onFileClose: (file: VSCodeFile) => void
}

export default function EditorTabs({ openFiles, activeFile, onFileSelect, onFileClose }: EditorTabsProps) {
  return (
    <div className="flex bg-gray-800 border-b border-gray-700 overflow-x-auto">
      {openFiles.map((file) => (
        <Tab
          key={file.id}
          file={file}
          isActive={activeFile?.id === file.id}
          isDirty={file.isDirty || false}
          onSelect={() => onFileSelect(file)}
          onClose={() => onFileClose(file)}
        />
      ))}
    </div>
  )
}

interface TabProps {
  file: VSCodeFile
  isActive: boolean
  isDirty: boolean
  onSelect: () => void
  onClose: () => void
}

function Tab({ file, isActive, isDirty, onSelect, onClose }: TabProps) {
  return (
    <div
      className={cn(
        "flex items-center h-9 px-3 border-r border-gray-700 cursor-pointer group",
        isActive ? "bg-gray-900" : "bg-gray-800 hover:bg-gray-750",
      )}
      onClick={onSelect}
    >
      <span className="truncate max-w-[120px]">{file.name}</span>

      {isDirty ? (
        <Circle size={14} className="ml-2 fill-current text-white" />
      ) : (
        <button
          className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-gray-700 rounded p-0.5"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
