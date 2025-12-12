"use client"

import { useState, useEffect } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { KeyRound, Plus, Copy, Trash2, Eye, EyeOff, Check, Globe, Loader2, RefreshCw, Dices, ShieldCheck, ShieldAlert } from "lucide-react"
import { toast } from "sonner"
import { passwordAPI, mlAPI } from "@/lib/api"

interface Credential {
  _id: string
  siteName: string
  username: string
  siteUrl?: string
  category?: string
  notes?: string
  isFavorite?: boolean
  createdAt?: string
}

interface DecryptedPassword {
  password: string
}

export function PasswordManagerView() {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(true)
  const [visiblePasswords, setVisiblePasswords] = useState<Map<string, string>>(new Map())
  const [decrypting, setDecrypting] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null)
  const [deleting, setDeleting] = useState<Set<string>>(new Set())
  const [newCredential, setNewCredential] = useState({ 
    siteName: "", 
    username: "", 
    password: "", 
    siteUrl: "",
    category: "other",
    notes: ""
  })
  
  // Password Generator State
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [passwordAnalysis, setPasswordAnalysis] = useState<any>(null)
  const [analyzingPassword, setAnalyzingPassword] = useState(false)
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  // Fetch credentials on mount
  useEffect(() => {
    fetchCredentials()
  }, [])

  // Generate password on generator open
  useEffect(() => {
    if (isGeneratorOpen) {
      generatePassword()
    }
  }, [isGeneratorOpen, passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const generatePassword = async () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let chars = ""
    let password = ""

    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === "") {
      toast.error("Please select at least one character type")
      return
    }

    // Ensure at least one character from each selected type
    if (includeUppercase) password += uppercase[Math.floor(Math.random() * uppercase.length)]
    if (includeLowercase) password += lowercase[Math.floor(Math.random() * lowercase.length)]
    if (includeNumbers) password += numbers[Math.floor(Math.random() * numbers.length)]
    if (includeSymbols) password += symbols[Math.floor(Math.random() * symbols.length)]

    // Fill the rest randomly
    for (let i = password.length; i < passwordLength; i++) {
      password += chars[Math.floor(Math.random() * chars.length)]
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('')

    setGeneratedPassword(password)

    // Analyze password with ML
    try {
      setAnalyzingPassword(true)
      const response = await mlAPI.analyzePassword(password)
      if (response.data && response.data.status === 'success') {
        setPasswordAnalysis(response.data.analysis)
      } else if (response.data && response.data.basicAnalysis) {
        // ML service unavailable, show basic analysis
        setPasswordAnalysis({
          strength: response.data.basicAnalysis.strength,
          score: response.data.basicAnalysis.strength === 'strong' ? 0.9 : 0.5,
          feedback: [response.data.basicAnalysis.message || 'Basic analysis only'],
        })
      }
    } catch (error: any) {
      console.error('Password analysis error:', error)
      // Don't show error toast, just provide basic analysis
      setPasswordAnalysis({
        strength: password.length >= 12 ? 'strong' : 'medium',
        score: password.length >= 12 ? 0.8 : 0.5,
        feedback: ['ML analysis unavailable'],
      })
    } finally {
      setAnalyzingPassword(false)
    }
  }

  const copyGeneratedPassword = () => {
    navigator.clipboard.writeText(generatedPassword)
    toast.success("Password copied to clipboard!")
  }

  const useGeneratedPassword = () => {
    setNewCredential(prev => ({ ...prev, password: generatedPassword }))
    setIsGeneratorOpen(false)
    toast.success("Password applied!")
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (password.length >= 16) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    if (strength <= 2) return { label: "Weak", color: "text-destructive", bgColor: "bg-destructive/20" }
    if (strength <= 4) return { label: "Medium", color: "text-amber-500", bgColor: "bg-amber-500/20" }
    return { label: "Strong", color: "text-primary", bgColor: "bg-primary/20" }
  }

  // Filter and sort credentials
  const filteredAndSortedCredentials = credentials
    .filter(cred => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        cred.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cred.username.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Category filter
      const matchesCategory = categoryFilter === "all" || cred.category === categoryFilter
      
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        case "date-asc":
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        case "site-asc":
          return a.siteName.localeCompare(b.siteName)
        case "site-desc":
          return b.siteName.localeCompare(a.siteName)
        default:
          return 0
      }
    })

  const fetchCredentials = async () => {
    try {
      setLoading(true)
      const response = await passwordAPI.getAll()
      if (response.data.success) {
        setCredentials(response.data.data || [])
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load credentials")
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = async (id: string) => {
    // If already visible, hide it
    if (visiblePasswords.has(id)) {
      const newMap = new Map(visiblePasswords)
      newMap.delete(id)
      setVisiblePasswords(newMap)
      return
    }

    // Otherwise, decrypt and show
    try {
      setDecrypting(prev => new Set(prev).add(id))
      const response = await passwordAPI.decrypt(id)
      if (response.data.success) {
        const newMap = new Map(visiblePasswords)
        newMap.set(id, response.data.password)
        setVisiblePasswords(newMap)
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to decrypt password")
    } finally {
      setDecrypting(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const copyPassword = async (id: string) => {
    try {
      // Get decrypted password if not already visible
      let password = visiblePasswords.get(id)
      if (!password) {
        const response = await passwordAPI.decrypt(id)
        if (response.data.success) {
          password = response.data.password
        }
      }
      
      if (password) {
        await navigator.clipboard.writeText(password)
        setCopiedId(id)
        toast.success("Password copied to clipboard")
        setTimeout(() => setCopiedId(null), 2000)
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to copy password")
    }
  }

  const deleteCredential = async (id: string) => {
    try {
      setDeleting(prev => new Set(prev).add(id))
      await passwordAPI.delete(id)
      setCredentials(prev => prev.filter((cred) => cred._id !== id))
      toast.success("Credential deleted successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete credential")
    } finally {
      setDeleting(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const addCredential = async () => {
    if (!newCredential.siteName || !newCredential.username || !newCredential.password) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const response = await passwordAPI.add({
        siteName: newCredential.siteName,
        siteUrl: newCredential.siteUrl,
        username: newCredential.username,
        password: newCredential.password,
        category: newCredential.category,
        notes: newCredential.notes
      })

      if (response.data.success) {
        setCredentials(prev => [response.data.data, ...prev])
        setNewCredential({ siteName: "", username: "", password: "", siteUrl: "", category: "other", notes: "" })
        setIsOpen(false)
        toast.success("Credential added successfully")
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to add credential")
    }
  }

  const startEdit = (credential: Credential) => {
    setEditingCredential(credential)
    setIsEditOpen(true)
  }

  const updateCredential = async () => {
    if (!editingCredential) return

    try {
      const response = await passwordAPI.update(editingCredential._id, {
        siteName: editingCredential.siteName,
        siteUrl: editingCredential.siteUrl,
        username: editingCredential.username,
        category: editingCredential.category,
        notes: editingCredential.notes
      })

      if (response.data.success) {
        setCredentials(prev => prev.map(cred => 
          cred._id === editingCredential._id ? response.data.data : cred
        ))
        setIsEditOpen(false)
        setEditingCredential(null)
        toast.success("Credential updated successfully")
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update credential")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Password Manager</h2>
          <p className="text-muted-foreground">Securely store and manage your credentials</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={fetchCredentials}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
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
                    value={newCredential.siteName}
                    onChange={(e) => setNewCredential((prev) => ({ ...prev, siteName: e.target.value }))}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="e.g., google.com"
                    value={newCredential.siteUrl}
                    onChange={(e) => setNewCredential((prev) => ({ ...prev, siteUrl: e.target.value }))}
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password *</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsGeneratorOpen(true)}
                      className="h-auto py-1 text-xs text-primary hover:text-primary/90"
                    >
                      <Dices className="mr-1 h-3 w-3" />
                      Generate
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={newCredential.password}
                    onChange={(e) => setNewCredential((prev) => ({ ...prev, password: e.target.value }))}
                    className="bg-secondary border-border"
                  />
                  {newCredential.password && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Strength:</span>
                      <span className={`font-medium ${getPasswordStrength(newCredential.password).color}`}>
                        {getPasswordStrength(newCredential.password).label}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newCredential.category} 
                    onValueChange={(value) => setNewCredential((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Additional notes"
                    value={newCredential.notes}
                    onChange={(e) => setNewCredential((prev) => ({ ...prev, notes: e.target.value }))}
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
      </div>

      {/* Search and Filter Bar */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 max-w-sm">
              <Input
                placeholder="Search by site name or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px] bg-secondary border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px] bg-secondary border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="site-asc">Site A-Z</SelectItem>
                  <SelectItem value="site-desc">Site Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {(searchQuery || categoryFilter !== "all") && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Showing {filteredAndSortedCredentials.length} of {credentials.length} credentials
              </span>
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="h-auto py-1 px-2 text-xs"
                >
                  Clear search
                </Button>
              )}
              {categoryFilter !== "all" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCategoryFilter("all")}
                  className="h-auto py-1 px-2 text-xs"
                >
                  Clear filter
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <KeyRound className="h-5 w-5 text-primary" />
            Stored Credentials
          </CardTitle>
          <CardDescription>{filteredAndSortedCredentials.length} accounts {searchQuery || categoryFilter !== "all" ? `(${credentials.length} total)` : "secured"}</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAndSortedCredentials.length === 0 ? (
            <div className="text-center py-12">
              <KeyRound className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              {credentials.length === 0 ? (
                <>
                  <p className="text-muted-foreground mt-4">No credentials stored yet</p>
                  <p className="text-sm text-muted-foreground">Click "Add New Credential" to get started</p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground mt-4">No credentials match your search</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                </>
              )}
            </div>
          ) : (
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
                {filteredAndSortedCredentials.map((cred) => (
                  <TableRow key={cred._id} className="border-border hover:bg-secondary/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{cred.siteName}</p>
                          {cred.siteUrl && (
                            <p className="text-xs text-muted-foreground">{cred.siteUrl}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-foreground">{cred.username}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-foreground">
                          {visiblePasswords.has(cred._id) ? visiblePasswords.get(cred._id) : "••••••••••••"}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => togglePasswordVisibility(cred._id)}
                          disabled={decrypting.has(cred._id)}
                        >
                          {decrypting.has(cred._id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : visiblePasswords.has(cred._id) ? (
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
                          onClick={() => copyPassword(cred._id)}
                        >
                          {copiedId === cred._id ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Copy className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:text-destructive"
                          onClick={() => deleteCredential(cred._id)}
                          disabled={deleting.has(cred._id)}
                        >
                          {deleting.has(cred._id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Password Generator Dialog */}
      <Dialog open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Dices className="h-5 w-5 text-primary" />
              Password Generator
            </DialogTitle>
            <DialogDescription>
              Create a strong, random password with custom options
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Generated Password Display */}
            <div className="space-y-2">
              <Label>Generated Password</Label>
              <div className="flex gap-2">
                <Input
                  value={generatedPassword}
                  readOnly
                  className="bg-secondary border-border font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyGeneratedPassword}
                  disabled={!generatedPassword}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={generatePassword}
                  disabled={analyzingPassword}
                >
                  {analyzingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* ML Password Strength Analysis */}
            {passwordAnalysis && (
              <div className="space-y-2 rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">ML Strength Analysis</Label>
                  {passwordAnalysis.strength === 'strong' || passwordAnalysis.strength === 'very strong' ? (
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <ShieldAlert className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Strength:</span>
                    <span className={`font-medium ${
                      passwordAnalysis.strength === 'strong' || passwordAnalysis.strength === 'very strong' 
                        ? 'text-green-500' 
                        : passwordAnalysis.strength === 'medium' 
                        ? 'text-amber-500' 
                        : 'text-red-500'
                    }`}>
                      {passwordAnalysis.strength.charAt(0).toUpperCase() + passwordAnalysis.strength.slice(1)}
                    </span>
                  </div>
                  {passwordAnalysis.score !== undefined && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Score:</span>
                        <span className="font-mono text-xs">{(passwordAnalysis.score * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            passwordAnalysis.score >= 0.8 ? 'bg-green-500' : 
                            passwordAnalysis.score >= 0.5 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${passwordAnalysis.score * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {passwordAnalysis.feedback && passwordAnalysis.feedback.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {passwordAnalysis.feedback[0]}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Password Length Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Password Length</Label>
                <span className="text-sm font-medium text-primary">{passwordLength}</span>
              </div>
              <Slider
                value={[passwordLength]}
                onValueChange={(value) => setPasswordLength(value[0])}
                min={8}
                max={32}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>8</span>
                <span>32</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-3">
              <Label>Include Characters</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                  />
                  <label
                    htmlFor="uppercase"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Uppercase (A-Z)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                  />
                  <label
                    htmlFor="lowercase"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Lowercase (a-z)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                  />
                  <label
                    htmlFor="numbers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Numbers (0-9)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                  />
                  <label
                    htmlFor="symbols"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Symbols (!@#$%^&*)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsGeneratorOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={useGeneratedPassword}
              disabled={!generatedPassword}
              className="bg-primary hover:bg-primary/90"
            >
              Use This Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

