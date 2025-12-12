"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Shield, ShieldCheck, ShieldAlert, Copy, CheckCircle2, AlertCircle, Key } from "lucide-react"
import { twoFactorAPI } from "@/lib/api"
import Image from "next/image"

interface TwoFactorStatus {
  isEnabled: boolean
  verifiedAt?: string
  lastUsed?: string
  backupCodesRemaining: number
}

interface SetupData {
  secret: string
  qrCode: string
  backupCodes: string[]
}

export function TwoFactorSettings() {
  const { toast } = useToast()
  
  // State
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<TwoFactorStatus | null>(null)
  const [setupData, setSetupData] = useState<SetupData | null>(null)
  const [verificationCode, setVerificationCode] = useState("")
  const [disablePassword, setDisablePassword] = useState("")
  const [regeneratePassword, setRegeneratePassword] = useState("")
  
  // Dialog states
  const [setupDialogOpen, setSetupDialogOpen] = useState(false)
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false)
  const [disableDialogOpen, setDisableDialogOpen] = useState(false)
  const [backupCodesDialogOpen, setBackupCodesDialogOpen] = useState(false)
  const [regenerateDialogOpen, setRegenerateDialogOpen] = useState(false)

  useEffect(() => {
    loadStatus()
  }, [])

  const loadStatus = async () => {
    try {
      setLoading(true)
      const response = await twoFactorAPI.getStatus()
      setStatus(response.data.data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load 2FA status",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSetup = async () => {
    try {
      setLoading(true)
      const response = await twoFactorAPI.setup()
      setSetupData(response.data.data)
      setSetupDialogOpen(false)
      setVerifyDialogOpen(true)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to set up 2FA",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    try {
      setLoading(true)
      await twoFactorAPI.verify(verificationCode)
      
      toast({
        title: "Success",
        description: "2FA enabled successfully! Save your backup codes.",
      })
      
      setVerifyDialogOpen(false)
      setBackupCodesDialogOpen(true)
      setVerificationCode("")
      loadStatus()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Invalid verification code",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDisable = async () => {
    try {
      setLoading(true)
      await twoFactorAPI.disable(disablePassword)
      
      toast({
        title: "Success",
        description: "2FA disabled successfully",
      })
      
      setDisableDialogOpen(false)
      setDisablePassword("")
      loadStatus()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to disable 2FA",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerateBackupCodes = async () => {
    try {
      setLoading(true)
      const response = await twoFactorAPI.regenerateBackupCodes(regeneratePassword)
      
      setSetupData({ 
        secret: setupData?.secret || "",
        qrCode: setupData?.qrCode || "",
        backupCodes: response.data.data.backupCodes 
      })
      setRegenerateDialogOpen(false)
      setBackupCodesDialogOpen(true)
      setRegeneratePassword("")
      
      toast({
        title: "Success",
        description: "Backup codes regenerated successfully",
      })
      
      loadStatus()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to regenerate backup codes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    })
  }

  const copyAllBackupCodes = () => {
    if (setupData) {
      const codes = setupData.backupCodes.join("\n")
      copyToClipboard(codes)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>

      {loading && !status ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading 2FA settings...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {status?.isEnabled ? (
                  <ShieldCheck className="h-8 w-8 text-green-500" />
                ) : (
                  <ShieldAlert className="h-8 w-8 text-orange-500" />
                )}
                <div>
                  <CardTitle>
                    {status?.isEnabled ? "2FA Enabled" : "2FA Disabled"}
                  </CardTitle>
                  <CardDescription>
                    {status?.isEnabled
                      ? "Your account is protected with two-factor authentication"
                      : "Enable 2FA to secure your account"}
                  </CardDescription>
                </div>
              </div>
              <Badge variant={status?.isEnabled ? "default" : "secondary"}>
                {status?.isEnabled ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {status?.isEnabled && (
              <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Backup Codes Remaining</span>
                  <Badge variant="outline">{status.backupCodesRemaining}/8</Badge>
                </div>
                {status.verifiedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Enabled on</span>
                    <span className="text-sm">{new Date(status.verifiedAt).toLocaleDateString()}</span>
                  </div>
                )}
                {status.lastUsed && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last used</span>
                    <span className="text-sm">{new Date(status.lastUsed).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2">
              {!status?.isEnabled ? (
                <Button onClick={() => setSetupDialogOpen(true)} disabled={loading}>
                  <Shield className="mr-2 h-4 w-4" />
                  Enable 2FA
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setRegenerateDialogOpen(true)}
                    disabled={loading}
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Regenerate Backup Codes
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setDisableDialogOpen(true)}
                    disabled={loading}
                  >
                    Disable 2FA
                  </Button>
                </>
              )}
            </div>

            {!status?.isEnabled && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Two-factor authentication adds an extra layer of security. You'll need your phone to log in.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Setup Confirmation Dialog */}
      <Dialog open={setupDialogOpen} onOpenChange={setSetupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              You'll need an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <ShieldCheck className="h-4 w-4" />
              <AlertDescription>
                Make sure you have an authenticator app installed on your phone before proceeding.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSetupDialogOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSetup} disabled={loading}>
              {loading ? "Setting up..." : "Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog with QR Code */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code with your authenticator app, then enter the 6-digit code below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {setupData && (
              <>
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <Image
                    src={setupData.qrCode}
                    alt="2FA QR Code"
                    width={200}
                    height={200}
                    className="rounded"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Can't scan? Enter this code manually:
                  </Label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded font-mono text-sm">
                    <span className="flex-1">{setupData.secret}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(setupData.secret)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Enter 6-digit code</Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                    className="text-center text-lg tracking-widest"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setVerifyDialogOpen(false)
                setVerificationCode("")
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerify}
              disabled={loading || verificationCode.length !== 6}
            >
              {loading ? "Verifying..." : "Verify & Enable"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Backup Codes Dialog */}
      <Dialog open={backupCodesDialogOpen} onOpenChange={setBackupCodesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Your Backup Codes</DialogTitle>
            <DialogDescription>
              Store these codes in a safe place. Each code can be used once to access your account if you lose your phone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You won't be able to see these codes again! Save them now.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-2 gap-2 p-4 bg-muted rounded-lg font-mono text-sm">
              {setupData?.backupCodes.map((code, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>{code}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full" onClick={copyAllBackupCodes}>
              <Copy className="mr-2 h-4 w-4" />
              Copy All Codes
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setBackupCodesDialogOpen(false)} className="w-full">
              I've Saved My Backup Codes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disable 2FA Dialog */}
      <Dialog open={disableDialogOpen} onOpenChange={setDisableDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter your password to disable 2FA. This will make your account less secure.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="disablePassword">Password</Label>
              <Input
                id="disablePassword"
                type="password"
                value={disablePassword}
                onChange={(e) => setDisablePassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDisableDialogOpen(false)
                setDisablePassword("")
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDisable}
              disabled={loading || !disablePassword}
            >
              {loading ? "Disabling..." : "Disable 2FA"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Regenerate Backup Codes Dialog */}
      <Dialog open={regenerateDialogOpen} onOpenChange={setRegenerateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Regenerate Backup Codes</DialogTitle>
            <DialogDescription>
              This will invalidate all existing backup codes and generate new ones. Enter your password to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="regeneratePassword">Password</Label>
              <Input
                id="regeneratePassword"
                type="password"
                value={regeneratePassword}
                onChange={(e) => setRegeneratePassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRegenerateDialogOpen(false)
                setRegeneratePassword("")
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRegenerateBackupCodes}
              disabled={loading || !regeneratePassword}
            >
              {loading ? "Regenerating..." : "Regenerate Codes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
