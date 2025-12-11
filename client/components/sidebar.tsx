"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import type { ViewType } from "./cyber-dashboard"
import { LayoutDashboard, KeyRound, FolderLock, Radar, GraduationCap, Shield } from "lucide-react"

interface SidebarProps {
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

const navItems: { id: ViewType; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "password", label: "Password Manager", icon: KeyRound },
  { id: "vault", label: "File Vault", icon: FolderLock },
  { id: "scanner", label: "Network Scanner", icon: Radar },
  { id: "education", label: "Education", icon: GraduationCap },
]

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <aside className="flex w-64 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">CyberShield</h1>
          <p className="text-xs text-muted-foreground">Security Suite</p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/20 text-primary glow-green"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "glow-green-text")} />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <div className="rounded-lg bg-primary/10 p-4">
          <p className="text-xs font-medium text-primary">System Status</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm text-foreground">Protected</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
