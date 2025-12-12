"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, FileCheck, AlertTriangle, Activity, Globe, Clock, Loader2 } from "lucide-react"
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { dashboardAPI } from "@/lib/api"
import { toast } from "sonner"

const recentLogins = [
  { id: 1, user: "john.doe@email.com", location: "New York, US", time: "2 min ago", status: "success" },
  { id: 2, user: "admin@company.com", location: "London, UK", time: "15 min ago", status: "success" },
  { id: 3, user: "unknown@threat.net", location: "Unknown", time: "32 min ago", status: "blocked" },
  { id: 4, user: "sarah.smith@email.com", location: "Tokyo, JP", time: "1 hour ago", status: "success" },
  { id: 5, user: "suspicious@mail.ru", location: "Moscow, RU", time: "2 hours ago", status: "blocked" },
]

export function DashboardView() {
  const [loading, setLoading] = useState(true)
  const [activityLoading, setActivityLoading] = useState(true)
  const [stats, setStats] = useState({
    passwords: { total: 0, recentCount: 0 },
    files: { total: 0, totalSizeMB: "0.00", recentCount: 0 },
    notifications: { total: 0, unread: 0 },
  })
  const [activityData, setActivityData] = useState<Array<{ time: string; passwords: number; files: number }>>([])

  useEffect(() => {
    fetchDashboardStats()
    fetchActivityData()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      const response = await dashboardAPI.getStats()
      if (response.data.success) {
        setStats(response.data.data)
      }
    } catch (error: any) {
      console.error("Failed to fetch dashboard stats:", error)
      toast.error("Failed to load dashboard statistics")
    } finally {
      setLoading(false)
    }
  }

  const fetchActivityData = async () => {
    try {
      setActivityLoading(true)
      const response = await dashboardAPI.getActivity()
      if (response.data.success) {
        setActivityData(response.data.data)
      }
    } catch (error: any) {
      console.error("Failed to fetch activity data:", error)
      toast.error("Failed to load activity chart")
    } finally {
      setActivityLoading(false)
    }
  }

  const statsCards = [
    {
      title: "Stored Passwords",
      value: loading ? "..." : stats.passwords.total.toString(),
      description: `${stats.passwords.recentCount} added recently`,
      icon: ShieldCheck,
      trend: stats.passwords.recentCount > 0 ? `+${stats.passwords.recentCount}` : "0",
      color: "text-primary",
    },
    {
      title: "Secure Files",
      value: loading ? "..." : stats.files.total.toString(),
      description: `${stats.files.totalSizeMB} MB encrypted`,
      icon: FileCheck,
      trend: stats.files.recentCount > 0 ? `+${stats.files.recentCount}` : "0",
      color: "text-chart-3",
    },
    {
      title: "Notifications",
      value: loading ? "..." : stats.notifications.unread.toString(),
      description: `${stats.notifications.total} total alerts`,
      icon: AlertTriangle,
      trend: stats.notifications.unread > 0 ? `${stats.notifications.unread} unread` : "All read",
      color: stats.notifications.unread > 0 ? "text-amber-500" : "text-green-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                {loading ? <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /> : <Icon className={`h-5 w-5 ${stat.color}`} />}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-primary">{stat.trend}</span>
                  <span className="text-xs text-muted-foreground">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Activity Chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Activity className="h-5 w-5 text-primary" />
                Activity Monitor
              </CardTitle>
              <CardDescription>Last 24 hours - password and file activity</CardDescription>
            </div>
            {activityLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
          </div>
        </CardHeader>
        <CardContent>
          {activityLoading ? (
            <div className="h-[250px] flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : activityData.length === 0 ? (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              No activity data available yet
            </div>
          ) : (
            <ChartContainer
              config={{
                passwords: { label: "Passwords Created", color: "hsl(var(--chart-1))" },
                files: { label: "Files Uploaded", color: "hsl(var(--chart-3))" },
              }}
              className="h-[250px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="passwordGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fileGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Area type="monotone" dataKey="passwords" stroke="#10b981" strokeWidth={2} fill="url(#passwordGradient)" />
                  <Area type="monotone" dataKey="files" stroke="#06b6d4" strokeWidth={2} fill="url(#fileGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* Recent Logins */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="h-5 w-5 text-primary" />
            Recent Login Activity
          </CardTitle>
          <CardDescription>Monitor access attempts to your systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLogins.map((login) => (
              <div
                key={login.id}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-2 w-2 rounded-full ${login.status === "success" ? "bg-primary" : "bg-destructive"}`}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{login.user}</p>
                    <p className="text-xs text-muted-foreground">{login.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      login.status === "success" ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {login.status === "success" ? "Allowed" : "Blocked"}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {login.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
