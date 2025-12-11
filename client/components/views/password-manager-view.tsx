"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { KeyRound, Plus, Copy, Trash2, Eye, EyeOff, Check, Globe } from "lucide-react"
import { toast } from "sonner"

interface Credential {
  id: number
  site: string
  username: string
  password: string
  url: string
}

const initialCredentials: Credential[] = [
  { id: 1, site: "Google", username: "john.doe@gmail.com", password: "Str0ng#Pass123!", url: "google.com" },
  { id: 2, site: "GitHub", username: "johndoe", password: "GitH@b$ecure456", url: "github.com" },
  { id: 3, site: "AWS Console", username: "admin@company.com", password: "AWScloud!789", url: "aws.amazon.com" },
  { id: 4, site: "Slack", username: "john.doe@work.com", password: "Sl@ckW0rk321", url: "slack.com" },
  { id: 5, site: "Netflix", username: "john.streaming@email.com", password: "N3tflix$tre@m", url: "netflix.com" },
]

export function PasswordManagerView() {
  const [credentials, setCredentials] = useState<Credential[]>(initialCredentials)
  const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set())
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [newCredential, setNewCredential] = useState({ site: "", username: "", password: "", url: "" })

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const copyPassword = async (id: number, password: string) => {
    await navigator.clipboard.writeText(password)
    setCopiedId(id)
    toast.success("Password copied to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const deleteCredential = (id: number) => {
    setCredentials((prev) => prev.filter((cred) => cred.id !== id))
    toast.success("Credential deleted")
  }

  const addCredential = () => {
    if (!newCredential.site || !newCredential.username || !newCredential.password) {
      toast.error("Please fill in all required fields")
      return
    }
    const newId = Math.max(...credentials.map((c) => c.id)) + 1
    setCredentials((prev) => [...prev, { ...newCredential, id: newId }])
    setNewCredential({ site: "", username: "", password: "", url: "" })
    setIsOpen(false)
    toast.success("Credential added successfully")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Password Manager</h2>
          <p className="text-muted-foreground">Securely store and manage your credentials</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Credential
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Credential</DialogTitle>
              <DialogDescription>Store a new password securely in your vault</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="site">Site Name *</Label>
                <Input
                  id="site"
                  placeholder="e.g., Google"
                  value={newCredential.site}
                  onChange={(e) => setNewCredential((prev) => ({ ...prev, site: e.target.value }))}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="e.g., google.com"
                  value={newCredential.url}
                  onChange={(e) => setNewCredential((prev) => ({ ...prev, url: e.target.value }))}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  placeholder="Enter username or email"
                  value={newCredential.username}
                  onChange={(e) => setNewCredential((prev) => ({ ...prev, username: e.target.value }))}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={newCredential.password}
                  onChange={(e) => setNewCredential((prev) => ({ ...prev, password: e.target.value }))}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addCredential} className="bg-primary text-primary-foreground">
                Save Credential
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <KeyRound className="h-5 w-5 text-primary" />
            Stored Credentials
          </CardTitle>
          <CardDescription>{credentials.length} accounts secured</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-secondary/50">
                <TableHead className="text-muted-foreground">Site</TableHead>
                <TableHead className="text-muted-foreground">Username</TableHead>
                <TableHead className="text-muted-foreground">Password</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credentials.map((cred) => (
                <TableRow key={cred.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{cred.site}</p>
                        <p className="text-xs text-muted-foreground">{cred.url}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-foreground">{cred.username}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-foreground">
                        {visiblePasswords.has(cred.id) ? cred.password : "••••••••••••"}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => togglePasswordVisibility(cred.id)}
                      >
                        {visiblePasswords.has(cred.id) ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyPassword(cred.id, cred.password)}
                      >
                        {copiedId === cred.id ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-destructive"
                        onClick={() => deleteCredential(cred.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
