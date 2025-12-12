"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, BookOpen, Shield, Lock, Wifi, Bug, ChevronRight, Clock, Award, Play, Loader2, CheckCircle } from "lucide-react"
import { educationAPI } from "@/lib/api"
import { toast } from "sonner"

const iconMap = {
  Shield,
  Wifi,
  Bug,
  Lock
}

interface Course {
  _id: string
  courseId: string
  title: string
  description: string
  level: string
  duration: string
  icon: string
  progress?: number
  lessonsCount?: number
}

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
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalHours: 0,
    completed: 0,
    achievements: 0
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await educationAPI.getCourses()
      if (response.data.success) {
        const coursesData = response.data.data || []
        setCourses(coursesData)
        
        // Calculate stats
        const totalHours = coursesData.reduce((sum: number, course: Course) => {
          const hours = parseInt(course.duration.split(' ')[0]) || 0
          return sum + hours
        }, 0)
        
        const completedCount = coursesData.filter((c: Course) => (c.progress || 0) >= 100).length
        const achievementsCount = completedCount > 0 ? 1 + completedCount : 0
        
        setStats({
          totalCourses: coursesData.length,
          totalHours,
          completed: completedCount,
          achievements: achievementsCount
        })
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load courses")
      console.error("Fetch courses error:", error)
    } finally {
      setLoading(false)
    }
  }

  const startCourse = async (courseId: string) => {
    try {
      // Fetch course details to get first lesson
      const response = await educationAPI.getCourse(courseId)
      if (response.data.success && response.data.data.modules.length > 0) {
        const firstModule = response.data.data.modules[0]
        if (firstModule.lessons.length > 0) {
          const firstLesson = firstModule.lessons[0]
          router.push(`/education/${courseId}/${firstLesson.lessonId}`)
        } else {
          toast.error("No lessons available in this course")
        }
      }
    } catch (error: any) {
      toast.error("Failed to start course")
      console.error("Start course error:", error)
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
                <p className="text-2xl font-bold text-foreground">{stats.totalCourses}</p>
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
                <p className="text-2xl font-bold text-foreground">{stats.totalHours}h</p>
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
                <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
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
                <p className="text-2xl font-bold text-foreground">{stats.achievements}</p>
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
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mt-4">No courses available yet</p>
              <p className="text-sm text-muted-foreground">Check back soon for new content</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => {
                const Icon = iconMap[course.icon as keyof typeof iconMap] || Shield
                const progress = course.progress || 0
                
                return (
                  <div
                    key={course._id}
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
                        {course.lessonsCount || 0} lessons
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="mt-2 h-2" />
                    </div>
                    <Button
                      className="mt-4 w-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                      variant="ghost"
                      onClick={() => startCourse(course.courseId)}
                    >
                      {progress === 0 ? (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Course
                        </>
                      ) : progress >= 100 ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
