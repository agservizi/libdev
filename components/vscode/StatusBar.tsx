"use client"

import { GitBranch, Check, Bell } from "lucide-react"

interface StatusBarProps {
  branch?: string
  language?: string
  lineEnding?: string
  encoding?: string
  indentation?: string
  position?: { line: number; column: number }
  notifications?: number
}

export default function StatusBar({
  branch = "main",
  language = "plaintext",
  lineEnding = "LF",
  encoding = "UTF-8",
  indentation = "Spazi: 2",
  position = { line: 1, column: 1 },
  notifications = 0,
}: StatusBarProps) {
  return (
    <div className="h-6 bg-blue-600 text-white flex items-center justify-between px-2 text-xs">
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <GitBranch size={14} className="mr-1" />
          <span>{branch}</span>
        </div>

        <div className="flex items-center">
          <Check size={14} className="mr-1" />
          <span>0 ⚠ 0 ✕</span>
        </div>

        {notifications > 0 && (
          <div className="flex items-center">
            <Bell size={14} className="mr-1" />
            <span>{notifications}</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <button className="hover:bg-blue-700 px-1 py-0.5 rounded">{language}</button>

        <button className="hover:bg-blue-700 px-1 py-0.5 rounded">{indentation}</button>

        <button className="hover:bg-blue-700 px-1 py-0.5 rounded">{lineEnding}</button>

        <button className="hover:bg-blue-700 px-1 py-0.5 rounded">{encoding}</button>

        <button className="hover:bg-blue-700 px-1 py-0.5 rounded">
          Riga {position.line}, Col {position.column}
        </button>
      </div>
    </div>
  )
}
