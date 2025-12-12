"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookOpen, CheckCircle, ChevronLeft, ChevronRight, Clock, Home, Loader2 } from "lucide-react"
import { educationAPI } from "@/lib/api"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"

interface Lesson {
  lessonId: string
  title: string
  duration: string
  content: string
}

interface Module {
  moduleId: string
  title: string
  lessons: Lesson[]
}

interface Course {
  _id: string
  courseId: string
  title: string
  description: string
  level: string
  duration: string
  modules: Module[]
}

interface UserProgress {
  completedLessons: string[]
  progress: number
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const lessonId = params.lessonId as string

  const [course, setCourse] = useState<Course | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress>({ completedLessons: [], progress: 0 })
  const [loading, setLoading] = useState(true)
  const [markingComplete, setMarkingComplete] = useState(false)

  useEffect(() => {
    if (courseId && lessonId) {
      fetchCourseAndLesson()
    }
  }, [courseId, lessonId])

  const fetchCourseAndLesson = async () => {
    try {
      setLoading(true)
      
      // Fetch course details
      const courseResponse = await educationAPI.getCourse(courseId)
      if (courseResponse.data.success) {
        const courseData = courseResponse.data.data
        setCourse(courseData)

        // Find current lesson
        let foundLesson: Lesson | null = null
        let foundModule: Module | null = null

        for (const module of courseData.modules) {
          const lesson = module.lessons.find((l: Lesson) => l.lessonId === lessonId)
          if (lesson) {
            foundLesson = lesson
            foundModule = module
            break
          }
        }

        if (foundLesson && foundModule) {
          setCurrentLesson(foundLesson)
          setCurrentModule(foundModule)
        } else {
          toast.error("Lesson not found")
          router.push("/dashboard")
        }
      }

      // Fetch user progress
      const progressResponse = await educationAPI.getProgress()
      if (progressResponse.data.success) {
        const courseProgress = progressResponse.data.data.find(
          (p: any) => p.courseId === courseId
        )
        if (courseProgress) {
          setUserProgress({
            completedLessons: courseProgress.completedLessons || [],
            progress: courseProgress.progress || 0
          })
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load lesson")
      console.error("Fetch lesson error:", error)
    } finally {
      setLoading(false)
    }
  }

  const markLessonComplete = async () => {
    if (!lessonId || !courseId) return

    try {
      setMarkingComplete(true)
      const response = await educationAPI.updateProgress(courseId, lessonId)
      
      if (response.data.success) {
        setUserProgress(response.data.data)
        toast.success("Lesson marked as complete! 🎉")
        
        // Move to next lesson if available
        const nextLesson = getNextLesson()
        if (nextLesson) {
          setTimeout(() => {
            router.push(`/education/${courseId}/${nextLesson.lessonId}`)
          }, 1000)
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update progress")
    } finally {
      setMarkingComplete(false)
    }
  }

  const getPreviousLesson = (): Lesson | null => {
    if (!course || !currentLesson) return null

    const allLessons: Lesson[] = []
    course.modules.forEach(module => {
      allLessons.push(...module.lessons)
    })

    const currentIndex = allLessons.findIndex(l => l.lessonId === lessonId)
    return currentIndex > 0 ? allLessons[currentIndex - 1] : null
  }

  const getNextLesson = (): Lesson | null => {
    if (!course || !currentLesson) return null

    const allLessons: Lesson[] = []
    course.modules.forEach(module => {
      allLessons.push(...module.lessons)
    })

    const currentIndex = allLessons.findIndex(l => l.lessonId === lessonId)
    return currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  }

  const isLessonComplete = currentLesson 
    ? userProgress.completedLessons.includes(currentLesson.lessonId)
    : false

  const previousLesson = getPreviousLesson()
  const nextLesson = getNextLesson()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!course || !currentLesson || !currentModule) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-muted-foreground">Lesson not found</p>
        <Button onClick={() => router.push("/dashboard")}>
          <Home className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{course.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{currentModule.title}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {currentLesson.duration}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-border bg-card">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl text-foreground">{currentLesson.title}</CardTitle>
                <CardDescription className="mt-2">
                  Module: {currentModule.title}
                </CardDescription>
              </div>
              {isLessonComplete && (
                <Badge className="bg-primary/20 text-primary">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Course Progress</span>
                <span className="text-primary font-medium">{Math.round(userProgress.progress)}%</span>
              </div>
              <Progress value={userProgress.progress} className="h-2" />
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            {/* Lesson Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-foreground mt-6 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold text-foreground mt-5 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-medium text-foreground mt-4 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="text-muted-foreground mb-4 leading-7">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">{children}</ol>,
                  li: ({ children }) => <li className="ml-4">{children}</li>,
                  code: ({ children, className }) => {
                    const isInline = !className
                    return isInline ? (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">{children}</code>
                    ) : (
                      <code className={`block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto ${className}`}>{children}</code>
                    )
                  },
                  pre: ({ children }) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">{children}</blockquote>,
                }}
              >
                {currentLesson.content}
              </ReactMarkdown>
            </div>

            <Separator className="my-8" />

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => previousLesson && router.push(`/education/${courseId}/${previousLesson.lessonId}`)}
                disabled={!previousLesson}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Lesson
              </Button>

              <div className="flex gap-3">
                {!isLessonComplete && (
                  <Button
                    onClick={markLessonComplete}
                    disabled={markingComplete}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {markingComplete ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Marking...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                )}

                {nextLesson && (
                  <Button
                    onClick={() => router.push(`/education/${courseId}/${nextLesson.lessonId}`)}
                    variant={isLessonComplete ? "default" : "outline"}
                  >
                    Next Lesson
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
