"use client"

import { useState } from "react"
import { GitBranch, Plus, RefreshCw, X, GitCommit, GitMerge, Upload, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface GitChange {
  id: string
  path: string
  status: "modified" | "added" | "deleted" | "untracked"
}

interface GitPanelProps {
  onCommit?: (message: string, changes: GitChange[]) => void
  onPush?: () => void
  onPull?: () => void
}

export default function GitPanel({ onCommit, onPush, onPull }: GitPanelProps) {
  const [commitMessage, setCommitMessage] = useState("")
  const [changes, setChanges] = useState<GitChange[]>([
    { id: "1", path: "/src/app/page.tsx", status: "modified" },
    { id: "2", path: "/src/components/ui/button.tsx", status: "modified" },
    { id: "3", path: "/src/styles/globals.css", status: "modified" },
    { id: "4", path: "/src/lib/utils.ts", status: "added" },
    { id: "5", path: "/src/components/old-component.tsx", status: "deleted" },
  ])
  const [stagedChanges, setStagedChanges] = useState<GitChange[]>([])
  const [branch, setBranch] = useState("main")

  const stageChange = (change: GitChange) => {
    setChanges(changes.filter((c) => c.id !== change.id))
    setStagedChanges([...stagedChanges, change])
  }

  const unstageChange = (change: GitChange) => {
    setStagedChanges(stagedChanges.filter((c) => c.id !== change.id))
    setChanges([...changes, change])
  }

  const stageAllChanges = () => {
    setStagedChanges([...stagedChanges, ...changes])
    setChanges([])
  }

  const unstageAllChanges = () => {
    setChanges([...changes, ...stagedChanges])
    setStagedChanges([])
  }

  const handleCommit = () => {
    if (commitMessage.trim() && stagedChanges.length > 0 && onCommit) {
      onCommit(commitMessage, stagedChanges)
      setCommitMessage("")
      // In a real app, we would update the changes after a successful commit
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "modified":
        return <span className="text-blue-500">M</span>
      case "added":
        return <span className="text-green-500">A</span>
      case "deleted":
        return <span className="text-red-500">D</span>
      case "untracked":
        return <span className="text-gray-500">U</span>
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 text-sm font-medium flex items-center justify-between">
        <span>SOURCE CONTROL</span>
        <div className="flex items-center space-x-1">
          <button className="p-1 rounded hover:bg-gray-700" title="Refresh">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      <div className="p-2 flex items-center text-sm">
        <GitBranch size={16} className="mr-1" />
        <span>{branch}</span>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Staged Changes */}
        <div className="mb-4">
          <div className="flex items-center justify-between p-2 text-sm">
            <span>Staged Changes ({stagedChanges.length})</span>
            {stagedChanges.length > 0 && (
              <button
                className="text-xs hover:bg-gray-700 p-1 rounded"
                onClick={unstageAllChanges}
                title="Unstage All Changes"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {stagedChanges.map((change) => (
            <div
              key={change.id}
              className="flex items-center text-sm hover:bg-gray-700 cursor-pointer p-1 px-2"
              onClick={() => unstageChange(change)}
            >
              {getStatusIcon(change.status)}
              <span className="ml-2 truncate">{change.path.split("/").pop()}</span>
            </div>
          ))}
        </div>

        {/* Changes */}
        <div>
          <div className="flex items-center justify-between p-2 text-sm">
            <span>Changes ({changes.length})</span>
            {changes.length > 0 && (
              <button
                className="text-xs hover:bg-gray-700 p-1 rounded"
                onClick={stageAllChanges}
                title="Stage All Changes"
              >
                <Plus size={14} />
              </button>
            )}
          </div>

          {changes.map((change) => (
            <div
              key={change.id}
              className="flex items-center text-sm hover:bg-gray-700 cursor-pointer p-1 px-2"
              onClick={() => stageChange(change)}
            >
              {getStatusIcon(change.status)}
              <span className="ml-2 truncate">{change.path.split("/").pop()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Commit Section */}
      <div className="p-2 border-t border-gray-700">
        <Input
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          placeholder="Message (Ctrl+Enter to commit)"
          className="mb-2 text-sm"
        />

        <div className="flex justify-between">
          <Button
            size="sm"
            disabled={!commitMessage.trim() || stagedChanges.length === 0}
            onClick={handleCommit}
            className="flex items-center gap-1"
          >
            <GitCommit size={14} />
            <span>Commit</span>
          </Button>

          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={onPush} className="flex items-center gap-1" title="Push">
              <Upload size={14} />
            </Button>
            <Button variant="outline" size="sm" onClick={onPull} className="flex items-center gap-1" title="Pull">
              <Download size={14} />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" title="Sync">
              <GitMerge size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
