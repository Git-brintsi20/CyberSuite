"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, Clock, GraduationCap, Loader2, Play, Lock } from "lucide-react"
import { educationAPI } from "@/lib/api"
import { toast } from "sonner"

interface Lesson {
  id: number
  lessonId: string
  title: string
  duration: number
  completed?: boolean
}

interface Module {
  id: number
  moduleId: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Course {
  _id: string
  courseId: string
  title: string
  description: string
  level: string
  duration: string
  icon: string
  modules: Module[]
  userProgress: {
    completedLessons: Array<{ moduleId: number; lessonId: number }>
    progress: number
  }
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

export default function CourseOverviewPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  const fetchCourse = async () => {
    try {
      setLoading(true)
      const response = await educationAPI.getCourse(courseId)
      if (response.data.success) {
        setCourse(response.data.data)
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load course")
      console.error("Fetch course error:", error)
    } finally {
      setLoading(false)
    }
  }

  const startLesson = (lessonId: string) => {
    router.push(`/education/${courseId}/${lessonId}`)
  }

  const isLessonCompleted = (moduleId: number, lessonId: number) => {
    if (!course?.userProgress?.completedLessons) return false
    return course.userProgress.completedLessons.some(
      cl => cl.moduleId === moduleId && cl.lessonId === lessonId
    )
  }

  const getModuleProgress = (module: Module) => {
    if (!course?.userProgress?.completedLessons) return 0
    const completedCount = module.lessons.filter(lesson =>
      isLessonCompleted(module.id, lesson.id)
    ).length
    return Math.round((completedCount / module.lessons.length) * 100)
  }

  const totalLessons = course?.modules.reduce((sum, mod) => sum + mod.lessons.length, 0) || 0
  const completedLessons = course?.userProgress?.completedLessons?.length || 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground">Course not found</p>
        <Button onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
                <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {totalLessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  {course.modules.length} modules
                </span>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <Card className="mt-6 border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Course Progress</span>
                <span className="text-sm font-bold text-primary">
                  {completedLessons} / {totalLessons} lessons completed
                </span>
              </div>
              <Progress value={course.userProgress?.progress || 0} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {course.userProgress?.progress || 0}% complete
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {course.modules.map((module, moduleIndex) => {
            const moduleProgress = getModuleProgress(module)
            const isModuleComplete = moduleProgress === 100

            return (
              <Card key={module.moduleId} className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
                          {moduleIndex + 1}
                        </span>
                        {module.title}
                        {isModuleComplete && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </CardTitle>
                      <CardDescription className="mt-2">{module.description}</CardDescription>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Module Progress</span>
                      <span className="text-primary font-medium">{moduleProgress}%</span>
                    </div>
                    <Progress value={moduleProgress} className="h-2" />
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = isLessonCompleted(module.id, lesson.id)
                      const isFirst = moduleIndex === 0 && lessonIndex === 0
                      const previousLesson = lessonIndex > 0 
                        ? module.lessons[lessonIndex - 1]
                        : moduleIndex > 0 
                          ? course.modules[moduleIndex - 1].lessons[course.modules[moduleIndex - 1].lessons.length - 1]
                          : null
                      const isPreviousCompleted = previousLesson 
                        ? isLessonCompleted(
                            moduleIndex > 0 && lessonIndex === 0 ? course.modules[moduleIndex - 1].id : module.id,
                            previousLesson.id
                          )
                        : true
                      const isLocked = !isFirst && !isPreviousCompleted && !isCompleted

                      return (
                        <div
                          key={lesson.lessonId}
                          className={`group flex items-center justify-between p-4 rounded-lg border transition-all ${
                            isCompleted
                              ? "border-primary/30 bg-primary/5"
                              : isLocked
                              ? "border-border bg-muted/50 opacity-60"
                              : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              isCompleted
                                ? "bg-primary text-primary-foreground"
                                : isLocked
                                ? "bg-muted text-muted-foreground"
                                : "bg-secondary text-foreground"
                            }`}>
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : isLocked ? (
                                <Lock className="h-4 w-4" />
                              ) : (
                                <span className="text-xs font-bold">{lessonIndex + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{lesson.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.duration} min
                                </span>
                                {isCompleted && (
                                  <Badge variant="outline" className="text-xs bg-primary/20 text-primary border-primary/30">
                                    Completed
                                  </Badge>
                                )}
                                {isLocked && (
                                  <Badge variant="outline" className="text-xs">
                                    Locked
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={isCompleted ? "outline" : "default"}
                            onClick={() => startLesson(lesson.lessonId)}
                            disabled={isLocked}
                            className={isLocked ? "cursor-not-allowed" : ""}
                          >
                            {isLocked ? (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Locked
                              </>
                            ) : isCompleted ? (
                              <>
                                Review
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Start
                              </>
                            )}
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
