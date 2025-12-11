"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, FileCheck, AlertTriangle, Activity, Globe, Clock } from "lucide-react"
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const activityData = [
  { time: "00:00", threats: 12, logins: 5 },
  { time: "04:00", threats: 8, logins: 2 },
  { time: "08:00", threats: 25, logins: 18 },
  { time: "12:00", threats: 32, logins: 24 },
  { time: "16:00", threats: 18, logins: 15 },
  { time: "20:00", threats: 15, logins: 8 },
  { time: "24:00", threats: 10, logins: 4 },
]

const recentLogins = [
  { id: 1, user: "john.doe@email.com", location: "New York, US", time: "2 min ago", status: "success" },
  { id: 2, user: "admin@company.com", location: "London, UK", time: "15 min ago", status: "success" },
  { id: 3, user: "unknown@threat.net", location: "Unknown", time: "32 min ago", status: "blocked" },
  { id: 4, user: "sarah.smith@email.com", location: "Tokyo, JP", time: "1 hour ago", status: "success" },
  { id: 5, user: "suspicious@mail.ru", location: "Moscow, RU", time: "2 hours ago", status: "blocked" },
]

const stats = [
  {
    title: "Threats Blocked",
    value: "95%",
    description: "Last 24 hours",
    icon: ShieldCheck,
    trend: "+2.5%",
    color: "text-primary",
  },
  {
    title: "Secure Files",
    value: "10k+",
    description: "Encrypted files",
    icon: FileCheck,
    trend: "+150",
    color: "text-chart-3",
  },
  {
    title: "Vulnerabilities",
    value: "3",
    description: "Found this week",
    icon: AlertTriangle,
    trend: "-2",
    color: "text-amber-500",
  },
]

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
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
              <CardDescription>Real-time threat detection & login activity</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              threats: { label: "Threats Blocked", color: "hsl(var(--chart-1))" },
              logins: { label: "Login Attempts", color: "hsl(var(--chart-3))" },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="loginGradient" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="threats" stroke="#10b981" strokeWidth={2} fill="url(#threatGradient)" />
                <Area type="monotone" dataKey="logins" stroke="#06b6d4" strokeWidth={2} fill="url(#loginGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
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
