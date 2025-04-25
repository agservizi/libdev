"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, File, Folder, FilePlus, FolderPlus, MoreHorizontal, RefreshCw } from "lucide-react"
import type { VSCodeFile, VSCodeFolder } from "@/types/vscode"

interface ExplorerProps {
  rootFolder: VSCodeFolder
  onFileSelect: (file: VSCodeFile) => void
  onCreateFile: (path: string) => void
  onCreateFolder: (path: string) => void
  onRefresh: () => void
}

export default function Explorer({ rootFolder, onFileSelect, onCreateFile, onCreateFolder, onRefresh }: ExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    [rootFolder.path]: true,
  })

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 text-sm font-medium flex items-center justify-between">
        <span>ESPLORA</span>
        <div className="flex items-center space-x-1">
          <button className="p-1 rounded hover:bg-gray-700">
            <FilePlus size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-700">
            <FolderPlus size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-700" onClick={onRefresh}>
            <RefreshCw size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-700">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-1">
          <FolderItem
            folder={rootFolder}
            level={0}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
            onFileSelect={onFileSelect}
          />
        </div>
      </div>
    </div>
  )
}

interface FolderItemProps {
  folder: VSCodeFolder
  level: number
  expandedFolders: Record<string, boolean>
  toggleFolder: (folderId: string) => void
  onFileSelect: (file: VSCodeFile) => void
}

function FolderItem({ folder, level, expandedFolders, toggleFolder, onFileSelect }: FolderItemProps) {
  const isExpanded = expandedFolders[folder.path] || false

  return (
    <div>
      <div
        className="flex items-center py-1 px-2 hover:bg-gray-700 rounded cursor-pointer"
        style={{ paddingLeft: `${level * 8 + 4}px` }}
        onClick={() => toggleFolder(folder.path)}
      >
        <span className="mr-1">{isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        <Folder size={16} className="mr-1 text-blue-400" />
        <span className="truncate">{folder.name}</span>
      </div>

      {isExpanded && (
        <div>
          {folder.children.map((item, index) =>
            "children" in item ? (
              <FolderItem
                key={item.id}
                folder={item as VSCodeFolder}
                level={level + 1}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
                onFileSelect={onFileSelect}
              />
            ) : (
              <FileItem key={item.id} file={item as VSCodeFile} level={level + 1} onFileSelect={onFileSelect} />
            ),
          )}
        </div>
      )}
    </div>
  )
}

interface FileItemProps {
  file: VSCodeFile
  level: number
  onFileSelect: (file: VSCodeFile) => void
}

function FileItem({ file, level, onFileSelect }: FileItemProps) {
  return (
    <div
      className="flex items-center py-1 px-2 hover:bg-gray-700 rounded cursor-pointer"
      style={{ paddingLeft: `${level * 8 + 20}px` }}
      onClick={() => onFileSelect(file)}
    >
      <File size={16} className="mr-1 text-gray-400" />
      <span className="truncate">{file.name}</span>
    </div>
  )
}
