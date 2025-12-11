"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderLock, Upload, Lock, Download, Trash2, File, FileText, FileImage, FileArchive } from "lucide-react"
import { toast } from "sonner"

interface EncryptedFile {
  id: number
  name: string
  size: string
  type: string
  encryptedAt: string
}

const initialFiles: EncryptedFile[] = [
  { id: 1, name: "financial_report_2024.pdf", size: "2.4 MB", type: "pdf", encryptedAt: "2 hours ago" },
  { id: 2, name: "passwords_backup.txt", size: "12 KB", type: "text", encryptedAt: "1 day ago" },
  { id: 3, name: "confidential_photos.zip", size: "156 MB", type: "archive", encryptedAt: "3 days ago" },
  { id: 4, name: "client_contracts.pdf", size: "8.7 MB", type: "pdf", encryptedAt: "1 week ago" },
  { id: 5, name: "personal_id_scan.png", size: "3.2 MB", type: "image", encryptedAt: "2 weeks ago" },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
    case "text":
      return FileText
    case "image":
      return FileImage
    case "archive":
      return FileArchive
    default:
      return File
  }
}

export function FileVaultView() {
  const [files, setFiles] = useState<EncryptedFile[]>(initialFiles)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      if (droppedFiles.length > 0) {
        const newFiles = droppedFiles.map((file, index) => ({
          id: Math.max(...files.map((f) => f.id)) + index + 1,
          name: file.name,
          size: formatFileSize(file.size),
          type: getFileType(file.name),
          encryptedAt: "Just now",
        }))
        setFiles((prev) => [...newFiles, ...prev])
        toast.success(`${droppedFiles.length} file(s) encrypted and stored`)
      }
    },
    [files],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 0) {
      const newFiles = selectedFiles.map((file, index) => ({
        id: Math.max(...files.map((f) => f.id)) + index + 1,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.name),
        encryptedAt: "Just now",
      }))
      setFiles((prev) => [...newFiles, ...prev])
      toast.success(`${selectedFiles.length} file(s) encrypted and stored`)
    }
  }

  const deleteFile = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
    toast.success("File permanently deleted")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">File Vault</h2>
        <p className="text-muted-foreground">Encrypt and secure your sensitive files</p>
      </div>

      {/* Dropzone */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-all ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:bg-secondary/30"
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {isDragging ? "Drop files to encrypt" : "Drag & drop files here"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">or click to browse from your computer</p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="mr-2 h-4 w-4" />
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Encrypted Files */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FolderLock className="h-5 w-5 text-primary" />
            Encrypted Files
          </CardTitle>
          <CardDescription>{files.length} files secured with AES-256 encryption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type)
              return (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4 transition-all hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <FileIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{file.name}</p>
                        <Lock className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {file.size} • Encrypted {file.encryptedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-destructive"
                      onClick={() => deleteFile(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

function getFileType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase()
  if (["pdf"].includes(ext || "")) return "pdf"
  if (["txt", "doc", "docx"].includes(ext || "")) return "text"
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) return "image"
  if (["zip", "rar", "7z", "tar"].includes(ext || "")) return "archive"
  return "file"
}
