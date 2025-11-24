"use client"

import type React from "react"

import { useState } from "react"
import { X, Lock, Globe, User, Users, Building2, Upload, FileText, Trash2, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CreatePlaybookModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Visibility = "private" | "public"
type ProfileType = "general" | "client" | "firm"

interface UploadedFile {
  id: string
  name: string
  size: number
  progress: number
}

export function CreatePlaybookModal({ open, onOpenChange }: CreatePlaybookModalProps) {
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1 states
  const [playbookName, setPlaybookName] = useState("")
  const [visibility, setVisibility] = useState<Visibility>("private")
  const [profileType, setProfileType] = useState<ProfileType>("general")

  const [contractType, setContractType] = useState("")
  const [jurisdiction, setJurisdiction] = useState("")
  const [contractRole, setContractRole] = useState("")
  const [reviewPlaybook, setReviewPlaybook] = useState("")

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Handle final submission
      console.log("Submitting playbook")
      handleCancel()
    }
  }

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setCurrentStep(1)
    setPlaybookName("")
    setVisibility("private")
    setProfileType("general")
    setContractType("")
    setJurisdiction("")
    setContractRole("")
    setReviewPlaybook("")
    setUploadedFiles([])
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      handleFiles(Array.from(files))
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    const files = event.dataTransfer.files
    if (files) {
      handleFiles(Array.from(files))
    }
  }

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      // progress: Math.floor(Math.random() * 30) + 70, // Simulated progress
      progress: 100, // Simulated progress
    }))
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(0)} MB`
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              <div>
                <Label htmlFor="playbook-name" className="text-base font-semibold">
                  Playbook Name
                </Label>
                <p className="text-sm text-muted-foreground">Enter a name for the playbook</p>
              </div>
              <Input
                id="playbook-name"
                placeholder="Enter playbook name"
                value={playbookName}
                onChange={(e) => setPlaybookName(e.target.value)}
                className="max-w-xl"
              />
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-base font-semibold">Visibility</Label>
                <p className="text-sm text-muted-foreground">Set playbook visibility</p>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={visibility === "private" ? "default" : "outline"}
                  className={cn(
                    "flex-1 max-w-[200px]",
                    visibility === "private" && "bg-foreground text-background hover:bg-foreground/90",
                  )}
                  onClick={() => setVisibility("private")}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Private
                </Button>
                <Button
                  type="button"
                  variant={visibility === "public" ? "default" : "outline"}
                  className={cn(
                    "flex-1 max-w-[200px]",
                    visibility === "public" && "bg-foreground text-background hover:bg-foreground/90",
                  )}
                  onClick={() => setVisibility("public")}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Public
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-base font-semibold">Profile Type</Label>
                <p className="text-sm text-muted-foreground">Profile type for this playbook</p>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={profileType === "general" ? "default" : "outline"}
                  className={cn(
                    "flex-1 max-w-[150px]",
                    profileType === "general" && "bg-foreground text-background hover:bg-foreground/90",
                  )}
                  onClick={() => setProfileType("general")}
                >
                  <User className="mr-2 h-4 w-4" />
                  General
                </Button>
                <Button
                  type="button"
                  variant={profileType === "client" ? "default" : "outline"}
                  className={cn(
                    "flex-1 max-w-[150px]",
                    profileType === "client" && "bg-foreground text-background hover:bg-foreground/90",
                  )}
                  onClick={() => setProfileType("client")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Client
                </Button>
                <Button
                  type="button"
                  variant={profileType === "firm" ? "default" : "outline"}
                  className={cn(
                    "flex-1 max-w-[150px]",
                    profileType === "firm" && "bg-foreground text-background hover:bg-foreground/90",
                  )}
                  onClick={() => setProfileType("firm")}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Firm
                </Button>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <div>
                <Label htmlFor="contract-type" className="text-base font-semibold">
                  Contract Type
                </Label>
                <p className="text-sm text-muted-foreground">Select the category to ensure the accurate AI analysis</p>
              </div>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger id="contract-type" className="max-w-xl">
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="msa">Master Service Agreement</SelectItem>
                  <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                  <SelectItem value="employment">Employment Contract</SelectItem>
                </SelectContent>
              </Select>
              {!contractType && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>This field is required</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="jurisdiction" className="text-base font-semibold">
                  Juridiction
                </Label>
                <p className="text-sm text-muted-foreground">Choose the governing juridiction</p>
              </div>
              <Select value={jurisdiction} onValueChange={setJurisdiction}>
                <SelectTrigger id="jurisdiction" className="max-w-xl">
                  <SelectValue placeholder="Select juridiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                </SelectContent>
              </Select>
              {!jurisdiction && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>This field is required</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="contract-role" className="text-base font-semibold">
                  Contract Type
                </Label>
                <p className="text-sm text-muted-foreground">Specify the role that you are representing</p>
              </div>
              <Select value={contractRole} onValueChange={setContractRole}>
                <SelectTrigger id="contract-role" className="max-w-xl">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="advisor">Advisor</SelectItem>
                </SelectContent>
              </Select>
              {!contractRole && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>This field is required</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="review-playbook" className="text-base font-semibold">
                  Review Playbook
                </Label>
                <p className="text-sm text-muted-foreground">Select a review framework to apply policy</p>
              </div>
              <Select value={reviewPlaybook} onValueChange={setReviewPlaybook}>
                <SelectTrigger id="review-playbook" className="max-w-xl">
                  <SelectValue placeholder="Select review playbook" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Review</SelectItem>
                  <SelectItem value="detailed">Detailed Review</SelectItem>
                  <SelectItem value="compliance">Compliance Review</SelectItem>
                </SelectContent>
              </Select>
              {!reviewPlaybook && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>This field is required</span>
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div
              className={cn(
                "relative rounded-lg border-2 border-dashed p-12 text-center transition-colors",
                isDragging ? "border-teal-600 bg-teal-50" : "border-muted-foreground/25 bg-muted/20",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="absolute inset-0 cursor-pointer opacity-0"
                accept=".pdf,.doc,.docx"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-teal-100 p-3">
                  <Upload className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-base font-medium">Drag and drop contract here, or click to select them</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Please upload between 3 and 10 contracts files to ensure comprehensive playbook traing and optimal
                    AI performance
                  </p>
                </div>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-red-100">
                      <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{file.name}</p>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-teal-600 transition-all" style={{ width: `${file.progress}%` }} />
                        </div>
                        <span className="text-xs font-medium">{file.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                <Upload className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold">Ready to Upload</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Click &apos;Submit&apos; to upload your playbook and start the review process
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Set Up Playbook"
      case 2:
        return "Playbook Configuration"
      case 3:
        return "Select Contract"
      case 4:
        return "Upload & Submit"
      default:
        return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-5xl gap-0 p-0 max-h-[90vh]">
        <div className="flex flex-col sm:flex-row h-[85vh] sm:h-[600px]">
          {/* Left Sidebar */}
          <div className="w-full sm:w-72 lg:w-80 border-b sm:border-b-0 sm:border-r bg-muted/30 p-4 sm:p-6">
            <DialogHeader className="mb-6 sm:mb-8">
              <DialogTitle className="text-lg sm:text-xl">Create Review Playbook</DialogTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                You can upload multiple files using a zip file.
              </p>
            </DialogHeader>

            <div className="space-y-2">
              <StepItem number={1} label="Set Up Playbook" active={currentStep === 1} completed={currentStep > 1} />
              <StepItem
                number={2}
                label="Playbook Configuration"
                active={currentStep === 2}
                completed={currentStep > 2}
              />
              <StepItem number={3} label="Select Contracts" active={currentStep === 3} completed={currentStep > 3} />
              <StepItem number={4} label="Upload & Submit" active={currentStep === 4} completed={false} />
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="text-xs text-muted-foreground">Step {currentStep} of 4</div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-teal-600 transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 flex-col min-h-0">
            <div className="flex items-center justify-between border-b px-4 sm:px-6 py-3 sm:py-4">
              <h2 className="text-base sm:text-lg font-semibold">{getStepTitle()}</h2>
              {/* <button
                onClick={handleCancel}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button> */}
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">{renderStepContent()}</div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t px-4 sm:px-6 py-3 sm:py-4">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBackStep}>
                  Back
                </Button>
              )}
              {currentStep === 1 && (
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
              <Button onClick={handleNextStep} className="bg-teal-600 hover:bg-teal-700 text-white">
                {currentStep === 4 ? "Submit" : "Next Step"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StepItem({
  number,
  label,
  active = false,
  completed = false,
}: {
  number: number
  label: string
  active?: boolean
  completed?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-medium shrink-0",
          active && "border-teal-600 bg-teal-600 text-white",
          completed && "border-teal-600 bg-teal-600 text-white",
          !active && !completed && "border-muted-foreground/30 bg-background text-muted-foreground",
        )}
      >
        {completed || active ? "✓" : number}
      </div>
      <span
        className={cn(
          "text-xs sm:text-sm",
          active || completed ? "font-medium text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  )
}
