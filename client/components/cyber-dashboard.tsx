"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { DashboardView } from "./views/dashboard-view"
import { PasswordManagerView } from "./views/password-manager-view"
import { FileVaultView } from "./views/file-vault-view"
import { NetworkScannerView } from "./views/network-scanner-view"
import { EducationView } from "./views/education-view"

export type ViewType = "dashboard" | "password" | "vault" | "scanner" | "education"

export function CyberDashboard() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard")

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />
      case "password":
        return <PasswordManagerView />
      case "vault":
        return <FileVaultView />
      case "scanner":
        return <NetworkScannerView />
      case "education":
        return <EducationView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">{renderView()}</main>
      </div>
    </div>
  )
}
