"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Radar, Play, Terminal, Loader2, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { scannerAPI } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface ScanResult {
  type: "info" | "success" | "warning" | "error" | "port"
  message: string
  timestamp: string
}

export function NetworkScannerView() {
  const [ipAddress, setIpAddress] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

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

  const performScan = async () => {
    if (!ipAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter an IP address or hostname",
        variant: "destructive",
      })
      return
    }

    setIsScanning(true)
    setScanResults([])

    try {
      addResult("info", `Starting scan on ${ipAddress}...`)
      addResult("info", "Resolving hostname...")

      // Call real backend API
      const response = await scannerAPI.scan({ host: ipAddress })
      
      if (response.data.success) {
        const { data } = response.data
        
        addResult("success", `Resolved: ${data.target.ip}${data.target.hostname ? ` (${data.target.hostname})` : ''}`)
        addResult("info", `Scanning ${data.summary.total} ports...`)
        
        // Display each port result
        data.results.forEach((result: any) => {
          const statusIcon = result.status === 'open' ? '✓' : result.status === 'filtered' ? '?' : '✗'
          const portType = result.status === 'open' ? 'port' : 
                          result.status === 'filtered' ? 'warning' : 'info'
          
          addResult(
            portType as ScanResult["type"],
            `${statusIcon} Port ${result.port} (${result.service}): ${result.status.toUpperCase()}`
          )
        })
        
        addResult(
          "success",
          `Scan complete: ${data.summary.open} open, ${data.summary.filtered} filtered, ${data.summary.closed} closed`
        )
        
        // Security warnings
        if (data.summary.open > 5) {
          addResult("warning", "⚠ Warning: Multiple open ports detected. Review firewall rules.")
        }
        
        if (data.results.some((r: any) => r.port === 23 && r.status === 'open')) {
          addResult("error", "🚨 Critical: Telnet (port 23) is open and insecure!")
        }
        
        if (data.results.some((r: any) => r.port === 21 && r.status === 'open')) {
          addResult("warning", "⚠ Warning: FTP (port 21) detected - consider using SFTP instead")
        }
        
        toast({
          title: "Scan Complete",
          description: `Found ${data.summary.open} open ports on ${data.target.ip}`,
        })
      }
    } catch (error: any) {
      console.error('Scan error:', error)
      addResult("error", `Scan failed: ${error.response?.data?.message || error.message || 'Unknown error'}`)
      toast({
        title: "Scan Failed",
        description: error.response?.data?.message || "Unable to complete network scan",
        variant: "destructive",
      })
    } finally {
      setIsScanning(false)
    }
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

      {/* Authorization Warning */}
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-500">Important: Authorized Use Only</AlertTitle>
        <AlertDescription className="text-amber-600/90">
          This network scanner is a real security tool. Only scan networks you own or have explicit permission to scan. 
          Unauthorized network scanning may be illegal in your jurisdiction. Use responsibly for your home network security audits.
        </AlertDescription>
      </Alert>

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
              onClick={performScan}
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
