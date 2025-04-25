"use client"

import { useState } from "react"
import { Play, Pause, SkipForward, RefreshCw, Settings, Plus, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DebugConfiguration {
  id: string
  name: string
  type: string
  request: string
  program?: string
  url?: string
}

interface DebugPanelProps {
  onStartDebug?: (config: DebugConfiguration) => void
  onStopDebug?: () => void
  onStepOver?: () => void
  onRestart?: () => void
}

export default function DebugPanel({ onStartDebug, onStopDebug, onStepOver, onRestart }: DebugPanelProps) {
  const [isDebugging, setIsDebugging] = useState(false)
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState({
    variables: true,
    watch: false,
    callStack: false,
    breakpoints: true,
  })

  const debugConfigurations: DebugConfiguration[] = [
    {
      id: "1",
      name: "Launch Chrome",
      type: "chrome",
      request: "launch",
      url: "http://localhost:3000",
    },
    {
      id: "2",
      name: "Launch Node.js",
      type: "node",
      request: "launch",
      program: "${workspaceFolder}/index.js",
    },
    {
      id: "3",
      name: "Attach to Node.js",
      type: "node",
      request: "attach",
    },
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleStartDebug = () => {
    if (!selectedConfig) {
      setSelectedConfig(debugConfigurations[0].id)
    }

    const config = debugConfigurations.find((c) => c.id === (selectedConfig || debugConfigurations[0].id))
    if (config && onStartDebug) {
      onStartDebug(config)
    }

    setIsDebugging(true)
  }

  const handleStopDebug = () => {
    if (onStopDebug) {
      onStopDebug()
    }
    setIsDebugging(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 text-sm font-medium flex items-center justify-between">
        <span>RUN AND DEBUG</span>
        <div className="flex items-center space-x-1">
          <button className="p-1 rounded hover:bg-gray-700" title="Add Configuration">
            <Plus size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-700" title="Debug Settings">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Debug Controls */}
      <div className="p-2 flex items-center gap-1">
        {!isDebugging ? (
          <Button size="sm" onClick={handleStartDebug} className="flex items-center gap-1">
            <Play size={14} />
            <span>Start Debugging</span>
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={handleStopDebug}
              className="flex items-center gap-1"
              title="Stop"
            >
              <Pause size={14} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onStepOver}
              className="flex items-center gap-1"
              title="Step Over"
            >
              <SkipForward size={14} />
            </Button>
            <Button size="sm" variant="outline" onClick={onRestart} className="flex items-center gap-1" title="Restart">
              <RefreshCw size={14} />
            </Button>
          </>
        )}
      </div>

      {/* Debug Configuration Selector */}
      <div className="p-2">
        <select
          className="w-full p-1 text-sm bg-gray-800 border border-gray-700 rounded"
          value={selectedConfig || ""}
          onChange={(e) => setSelectedConfig(e.target.value)}
        >
          <option value="" disabled>
            Select a configuration...
          </option>
          {debugConfigurations.map((config) => (
            <option key={config.id} value={config.id}>
              {config.name}
            </option>
          ))}
        </select>
      </div>

      {/* Debug Sections */}
      <div className="flex-1 overflow-auto">
        {/* Variables Section */}
        <div className="mb-2">
          <div
            className="flex items-center p-1 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSection("variables")}
          >
            {expandedSections.variables ? (
              <ChevronDown size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="mr-1" />
            )}
            <span className="text-sm">VARIABLES</span>
          </div>

          {expandedSections.variables && (
            <div className="pl-4 text-xs">
              {isDebugging ? (
                <>
                  <div className="p-1 hover:bg-gray-700">
                    <span className="text-gray-400">count:</span> 0
                  </div>
                  <div className="p-1 hover:bg-gray-700">
                    <span className="text-gray-400">message:</span> "Hello World"
                  </div>
                </>
              ) : (
                <div className="p-1 text-gray-400">Not debugging</div>
              )}
            </div>
          )}
        </div>

        {/* Watch Section */}
        <div className="mb-2">
          <div
            className="flex items-center p-1 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSection("watch")}
          >
            {expandedSections.watch ? (
              <ChevronDown size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="mr-1" />
            )}
            <span className="text-sm">WATCH</span>
          </div>

          {expandedSections.watch && (
            <div className="pl-4 text-xs">
              <div className="p-1 text-gray-400">No expressions</div>
            </div>
          )}
        </div>

        {/* Call Stack Section */}
        <div className="mb-2">
          <div
            className="flex items-center p-1 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSection("callStack")}
          >
            {expandedSections.callStack ? (
              <ChevronDown size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="mr-1" />
            )}
            <span className="text-sm">CALL STACK</span>
          </div>

          {expandedSections.callStack && (
            <div className="pl-4 text-xs">
              {isDebugging ? (
                <>
                  <div className="p-1 hover:bg-gray-700">main() (app.js:10)</div>
                  <div className="p-1 hover:bg-gray-700">handleClick() (app.js:25)</div>
                </>
              ) : (
                <div className="p-1 text-gray-400">Not debugging</div>
              )}
            </div>
          )}
        </div>

        {/* Breakpoints Section */}
        <div className="mb-2">
          <div
            className="flex items-center p-1 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSection("breakpoints")}
          >
            {expandedSections.breakpoints ? (
              <ChevronDown size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="mr-1" />
            )}
            <span className="text-sm">BREAKPOINTS</span>
          </div>

          {expandedSections.breakpoints && (
            <div className="pl-4 text-xs">
              <div className="p-1 hover:bg-gray-700">app.js:15</div>
              <div className="p-1 hover:bg-gray-700">utils.js:42</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
