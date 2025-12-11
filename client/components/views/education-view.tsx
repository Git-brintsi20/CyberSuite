"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, BookOpen, Shield, Lock, Wifi, Bug, ChevronRight, Clock, Award, Play } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals",
    description: "Learn the basics of cybersecurity, threats, and protection methods.",
    icon: Shield,
    duration: "4 hours",
    lessons: 12,
    progress: 75,
    level: "Beginner",
  },
  {
    id: 2,
    title: "Network Security Essentials",
    description: "Understanding network protocols, firewalls, and secure architectures.",
    icon: Wifi,
    duration: "6 hours",
    lessons: 18,
    progress: 30,
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Ethical Hacking & Penetration Testing",
    description: "Learn to think like a hacker and identify vulnerabilities.",
    icon: Bug,
    duration: "8 hours",
    lessons: 24,
    progress: 0,
    level: "Advanced",
  },
  {
    id: 4,
    title: "Cryptography & Encryption",
    description: "Master encryption algorithms and secure communication.",
    icon: Lock,
    duration: "5 hours",
    lessons: 15,
    progress: 100,
    level: "Intermediate",
  },
]

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first lesson", unlocked: true },
  { id: 2, title: "Quick Learner", description: "Complete 5 lessons in one day", unlocked: true },
  { id: 3, title: "Security Expert", description: "Complete all beginner courses", unlocked: false },
  { id: 4, title: "Master Hacker", description: "Complete all advanced courses", unlocked: false },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-primary/20 text-primary"
    case "Intermediate":
      return "bg-amber-500/20 text-amber-500"
    case "Advanced":
      return "bg-destructive/20 text-destructive"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function EducationView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Security Education</h2>
        <p className="text-muted-foreground">Learn cybersecurity skills and best practices</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">Courses Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/20">
                <Clock className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">23h</p>
                <p className="text-sm text-muted-foreground">Total Content</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20">
                <GraduationCap className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-5 w-5 text-primary" />
            Available Courses
          </CardTitle>
          <CardDescription>Start learning cybersecurity skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course) => {
              const Icon = course.icon
              return (
                <div
                  key={course.id}
                  className="group rounded-lg border border-border bg-secondary/30 p-5 transition-all hover:border-primary/50 hover:bg-secondary/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{course.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.lessons} lessons
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="mt-2 h-2" />
                  </div>
                  <Button
                    className="mt-4 w-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                    variant="ghost"
                  >
                    {course.progress === 0 ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Course
                      </>
                    ) : course.progress === 100 ? (
                      <>
                        <Award className="mr-2 h-4 w-4" />
                        Review Course
                      </>
                    ) : (
                      <>
                        <ChevronRight className="mr-2 h-4 w-4" />
                        Continue
                      </>
                    )}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Award className="h-5 w-5 text-primary" />
            Achievements
          </CardTitle>
          <CardDescription>Track your learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-lg border p-4 text-center transition-all ${
                  achievement.unlocked ? "border-primary/50 bg-primary/10" : "border-border bg-secondary/20 opacity-50"
                }`}
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                    achievement.unlocked ? "bg-primary/20" : "bg-muted"
                  }`}
                >
                  <Award className={`h-6 w-6 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h4 className="mt-3 font-medium text-foreground">{achievement.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && <Badge className="mt-3 bg-primary/20 text-primary">Unlocked</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
