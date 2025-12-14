"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code2, Server, Globe, Shield, Database, Route } from "lucide-react"

export default function DevRoutesPage() {
  const frontendRoutes = [
    { path: "/", name: "Landing Page", protected: false },
    { path: "/login", name: "Login", protected: false },
    { path: "/register", name: "Register", protected: false },
    { path: "/forgot-password", name: "Forgot Password", protected: false },
    { path: "/reset-password/[token]", name: "Reset Password", protected: false },
    { path: "/dashboard", name: "Dashboard", protected: true },
    { path: "/profile", name: "User Profile", protected: true },
    { path: "/settings", name: "Settings", protected: true },
    { path: "/education/[courseId]/[lessonId]", name: "Lesson Viewer", protected: true },
  ]

  const apiRoutes: Array<{ method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; path: string; name: string; protected: boolean }> = [
    // Auth routes
    { method: "POST", path: "/api/auth/register", name: "Register User", protected: false },
    { method: "POST", path: "/api/auth/login", name: "Login User", protected: false },
    { method: "POST", path: "/api/auth/login/2fa", name: "Complete 2FA Login", protected: false },
    { method: "POST", path: "/api/auth/logout", name: "Logout User", protected: true },
    { method: "GET", path: "/api/auth/me", name: "Get Current User", protected: true },
    { method: "POST", path: "/api/auth/forgot-password", name: "Request Password Reset", protected: false },
    { method: "POST", path: "/api/auth/reset-password/:token", name: "Reset Password with Token", protected: false },
    
    // 2FA routes
    { method: "GET", path: "/api/2fa/status", name: "Get 2FA Status", protected: true },
    { method: "POST", path: "/api/2fa/setup", name: "Setup 2FA", protected: true },
    { method: "POST", path: "/api/2fa/verify", name: "Verify & Enable 2FA", protected: true },
    { method: "POST", path: "/api/2fa/validate", name: "Validate 2FA Token", protected: false },
    { method: "POST", path: "/api/2fa/disable", name: "Disable 2FA", protected: true },
    { method: "POST", path: "/api/2fa/backup-codes/regenerate", name: "Regenerate Backup Codes", protected: true },
    
    // Password routes
    { method: "GET", path: "/api/passwords", name: "Get All Passwords", protected: true },
    { method: "GET", path: "/api/passwords/:id", name: "Get Password", protected: true },
    { method: "POST", path: "/api/passwords", name: "Create Password", protected: true },
    { method: "PUT", path: "/api/passwords/:id", name: "Update Password", protected: true },
    { method: "DELETE", path: "/api/passwords/:id", name: "Delete Password", protected: true },
    { method: "POST", path: "/api/passwords/:id/decrypt", name: "Decrypt Password", protected: true },
    { method: "GET", path: "/api/passwords/stats/strength", name: "Password Statistics", protected: true },
    
    // File routes
    { method: "POST", path: "/api/files/upload", name: "Upload File", protected: true },
    { method: "GET", path: "/api/files", name: "Get All Files", protected: true },
    { method: "GET", path: "/api/files/:id", name: "Get File Metadata", protected: true },
    { method: "GET", path: "/api/files/:id/download", name: "Download File", protected: true },
    { method: "PUT", path: "/api/files/:id", name: "Update File Metadata", protected: true },
    { method: "DELETE", path: "/api/files/:id", name: "Delete File", protected: true },
    { method: "POST", path: "/api/files/delete-multiple", name: "Delete Multiple Files", protected: true },
    
    // User routes
    { method: "GET", path: "/api/user/profile", name: "Get User Profile", protected: true },
    { method: "PUT", path: "/api/user/profile", name: "Update Profile", protected: true },
    { method: "GET", path: "/api/user/settings", name: "Get Settings", protected: true },
    { method: "PUT", path: "/api/user/settings", name: "Update Settings", protected: true },
    { method: "DELETE", path: "/api/user/account", name: "Delete Account", protected: true },
    
    // Notification routes
    { method: "GET", path: "/api/notifications", name: "Get All Notifications", protected: true },
    { method: "POST", path: "/api/notifications", name: "Create Notification", protected: true },
    { method: "PUT", path: "/api/notifications/read-all", name: "Mark All As Read", protected: true },
    { method: "PUT", path: "/api/notifications/:id/read", name: "Mark As Read", protected: true },
    { method: "DELETE", path: "/api/notifications/:id", name: "Delete Notification", protected: true },
    { method: "DELETE", path: "/api/notifications", name: "Delete All Notifications", protected: true },
    
    // Education routes
    { method: "GET", path: "/api/education/courses", name: "Get All Courses", protected: true },
    { method: "GET", path: "/api/education/courses/:id", name: "Get Course", protected: true },
    { method: "POST", path: "/api/education/progress", name: "Update Progress", protected: true },
    { method: "GET", path: "/api/education/progress", name: "Get Progress", protected: true },
    
    // Dashboard routes
    { method: "GET", path: "/api/dashboard/stats", name: "Get Dashboard Statistics", protected: true },
    { method: "GET", path: "/api/dashboard/activity", name: "Get Activity Data", protected: true },
    
    // ML routes
    { method: "POST", path: "/api/ml/analyze-password", name: "Analyze Password Strength", protected: true },
    { method: "GET", path: "/api/ml/health", name: "ML Service Health Check", protected: true },
    
    // Network Scanner routes
    { method: "POST", path: "/api/scanner/scan", name: "Full Network Port Scan", protected: true },
    { method: "POST", path: "/api/scanner/quick", name: "Quick Host Discovery", protected: true },
  ]

  const methodColors = {
    GET: "bg-blue-500",
    POST: "bg-green-500",
    PUT: "bg-orange-500",
    DELETE: "bg-red-500",
    PATCH: "bg-purple-500",
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Code2 className="h-8 w-8" />
            Developer Routes
          </h1>
          <p className="text-muted-foreground mt-2">
            Complete route map for CyberSuite application
          </p>
          <Badge variant="outline" className="mt-2">Development Only</Badge>
        </div>

        {/* Frontend Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Frontend Routes
            </CardTitle>
            <CardDescription>Next.js pages and dynamic routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {frontendRoutes.map((route, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Route className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">{route.path}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{route.name}</span>
                    {route.protected && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="mr-1 h-3 w-3" />
                        Protected
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Backend API Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Backend API Routes
            </CardTitle>
            <CardDescription>Express REST API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Group by category */}
              {[
                { name: "Authentication", routes: apiRoutes.filter(r => r.path.includes('/auth')) },
                { name: "Two-Factor Auth", routes: apiRoutes.filter(r => r.path.includes('/2fa')) },
                { name: "Passwords", routes: apiRoutes.filter(r => r.path.includes('/passwords')) },
                { name: "File Vault", routes: apiRoutes.filter(r => r.path.includes('/files')) },
                { name: "User Management", routes: apiRoutes.filter(r => r.path.includes('/user')) },
                { name: "Notifications", routes: apiRoutes.filter(r => r.path.includes('/notifications')) },
                { name: "Education", routes: apiRoutes.filter(r => r.path.includes('/education')) },
                { name: "Dashboard", routes: apiRoutes.filter(r => r.path.includes('/dashboard')) },
                { name: "ML Service", routes: apiRoutes.filter(r => r.path.includes('/ml')) },
                { name: "Network Scanner", routes: apiRoutes.filter(r => r.path.includes('/scanner')) },
              ].map((category, catIndex) => (
                <div key={catIndex} className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <Badge variant="outline" className="text-xs">{category.routes.length}</Badge>
                  </div>
                  <div className="space-y-1 ml-6">
                    {category.routes.map((route, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded hover:bg-muted/50 transition-colors text-sm">
                        <div className="flex items-center gap-3 flex-1">
                          <Badge className={`${methodColors[route.method]} text-white w-16 justify-center`}>
                            {route.method}
                          </Badge>
                          <code className="text-xs font-mono text-muted-foreground">{route.path}</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{route.name}</span>
                          {route.protected && (
                            <Shield className="h-3 w-3 text-orange-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {catIndex < 9 && <Separator className="my-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Frontend Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{frontendRoutes.length}</div>
              <p className="text-xs text-muted-foreground">
                {frontendRoutes.filter(r => r.protected).length} protected
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{apiRoutes.length}</div>
              <p className="text-xs text-muted-foreground">
                {apiRoutes.filter(r => r.protected).length} protected
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Security Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((apiRoutes.filter(r => r.protected).length / apiRoutes.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Endpoints with authentication
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
