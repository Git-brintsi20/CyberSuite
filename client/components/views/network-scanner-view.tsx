"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Radar, Play, Terminal, Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface ScanResult {
  type: "info" | "success" | "warning" | "error" | "port"
  message: string
  timestamp: string
}

const mockPorts = [
  { port: 22, service: "SSH", status: "open" },
  { port: 80, service: "HTTP", status: "open" },
  { port: 443, service: "HTTPS", status: "open" },
  { port: 3306, service: "MySQL", status: "filtered" },
  { port: 5432, service: "PostgreSQL", status: "closed" },
  { port: 8080, service: "HTTP-Proxy", status: "open" },
  { port: 21, service: "FTP", status: "closed" },
  { port: 25, service: "SMTP", status: "filtered" },
]

export function NetworkScannerView() {
  const [ipAddress, setIpAddress] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [scanResults])

  const getTimestamp = () => {
    return new Date().toLocaleTimeString("en-US", { hour12: false })
  }

  const addResult = (type: ScanResult["type"], message: string) => {
    setScanResults((prev) => [...prev, { type, message, timestamp: getTimestamp() }])
  }

  const simulateScan = async () => {
    if (!ipAddress) {
      addResult("error", "Please enter a valid IP address")
      return
    }

    setIsScanning(true)
    setScanResults([])

    addResult("info", `Initializing scan for target: ${ipAddress}`)
    await delay(500)
    addResult("info", "Loading scan modules...")
    await delay(300)
    addResult("info", "Starting port discovery...")
    await delay(800)
    addResult("success", "Connection established")
    await delay(400)
    addResult("info", "Scanning common ports (1-1024)...")
    await delay(600)

    for (const port of mockPorts) {
      await delay(Math.random() * 300 + 200)
      const statusColor = port.status === "open" ? "success" : port.status === "filtered" ? "warning" : "error"
      addResult("port", `Port ${port.port}/${port.service} - ${port.status.toUpperCase()}`)
    }

    await delay(500)
    addResult("info", "Scan complete. Analyzing results...")
    await delay(400)

    const openPorts = mockPorts.filter((p) => p.status === "open").length
    const filteredPorts = mockPorts.filter((p) => p.status === "filtered").length

    addResult(
      "success",
      `Scan finished: ${openPorts} open, ${filteredPorts} filtered, ${mockPorts.length - openPorts - filteredPorts} closed`,
    )

    if (openPorts > 3) {
      addResult("warning", "Warning: Multiple open ports detected. Review firewall rules.")
    }

    setIsScanning(false)
  }

  const getResultStyle = (type: ScanResult["type"]) => {
    switch (type) {
      case "success":
        return "text-primary"
      case "warning":
        return "text-amber-500"
      case "error":
        return "text-destructive"
      case "port":
        return "text-chart-3"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Network Scanner</h2>
        <p className="text-muted-foreground">Scan IP addresses for open ports and vulnerabilities</p>
      </div>

      {/* Input Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Radar className="h-5 w-5 text-primary" />
            Port Scanner
          </CardTitle>
          <CardDescription>Enter an IP address to scan for open ports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Terminal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Enter IP address (e.g., 192.168.1.1)"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="bg-secondary border-border pl-10 font-mono"
                disabled={isScanning}
              />
            </div>
            <Button
              onClick={simulateScan}
              disabled={isScanning}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Scan
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Terminal Output */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Terminal className="h-5 w-5 text-primary" />
            Console Output
          </CardTitle>
          <CardDescription>Real-time scan results</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            ref={terminalRef}
            className="terminal-scroll h-80 overflow-y-auto rounded-lg bg-[#0a0f1a] p-4 font-mono text-sm"
          >
            {scanResults.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Terminal className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Ready to scan. Enter an IP address and click Scan.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {scanResults.map((result, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-muted-foreground">[{result.timestamp}]</span>
                    <span className={getResultStyle(result.type)}>
                      {result.type === "success" && <CheckCircle className="mr-1 inline h-3 w-3" />}
                      {result.type === "warning" && <AlertCircle className="mr-1 inline h-3 w-3" />}
                      {result.type === "error" && <AlertCircle className="mr-1 inline h-3 w-3" />}
                      {result.message}
                    </span>
                  </div>
                ))}
                {isScanning && (
                  <div className="flex items-center gap-2 text-primary">
                    <span className="animate-pulse">▌</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Common Ports</p>
                <p className="text-2xl font-bold text-foreground">1,024</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Radar className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scans Today</p>
                <p className="text-2xl font-bold text-foreground">47</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
                <Terminal className="h-5 w-5 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Threats Found</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
