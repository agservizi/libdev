"use client"

import type React from "react"
import { Files, Search, GitBranch, Bug, Package, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActivityBarProps {
  activePanel: string
  onPanelChange: (panel: string) => void
}

export default function ActivityBar({ activePanel, onPanelChange }: ActivityBarProps) {
  return (
    <div className="h-full w-12 bg-gray-900 flex flex-col items-center py-2">
      <div className="flex-1 flex flex-col items-center space-y-4">
        <ActivityBarItem
          icon={<Files size={24} />}
          tooltip="Esplora"
          isActive={activePanel === "explorer"}
          onClick={() => onPanelChange("explorer")}
        />
        <ActivityBarItem
          icon={<Search size={24} />}
          tooltip="Cerca"
          isActive={activePanel === "search"}
          onClick={() => onPanelChange("search")}
        />
        <ActivityBarItem
          icon={<GitBranch size={24} />}
          tooltip="Controllo Sorgente"
          isActive={activePanel === "git"}
          onClick={() => onPanelChange("git")}
        />
        <ActivityBarItem
          icon={<Bug size={24} />}
          tooltip="Esegui e Debug"
          isActive={activePanel === "debug"}
          onClick={() => onPanelChange("debug")}
        />
        <ActivityBarItem
          icon={<Package size={24} />}
          tooltip="Estensioni"
          isActive={activePanel === "extensions"}
          onClick={() => onPanelChange("extensions")}
        />
      </div>
      <div className="flex flex-col items-center space-y-4 mt-auto">
        <ActivityBarItem
          icon={<User size={24} />}
          tooltip="Account"
          isActive={activePanel === "accounts"}
          onClick={() => onPanelChange("accounts")}
        />
        <ActivityBarItem
          icon={<Settings size={24} />}
          tooltip="Impostazioni"
          isActive={activePanel === "settings"}
          onClick={() => onPanelChange("settings")}
        />
      </div>
    </div>
  )
}

interface ActivityBarItemProps {
  icon: React.ReactNode
  tooltip: string
  isActive: boolean
  onClick: () => void
}

function ActivityBarItem({ icon, tooltip, isActive, onClick }: ActivityBarItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "w-12 h-12 flex items-center justify-center relative",
              isActive ? "text-white border-l-2 border-blue-500" : "text-gray-400 hover:text-white",
            )}
            onClick={onClick}
          >
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
