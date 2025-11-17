"use client"

import { useState } from "react"
import { observer } from "mobx-react"
import { toast } from "react-toastify"
import { Copy, Check, AlertCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { apiKeyStore } from "@/stores/api-key-store"

interface CreateApiKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CreateApiKeyDialog ({ open, onOpenChange }: CreateApiKeyDialogProps) {
  const [name, setName] = useState("")
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleClose = () => {
    setName("")
    setGeneratedKey(null)
    setCopied(false)
    setValidationError(null)
    onOpenChange(false)
  }

  const handleCopy = async () => {
    if (generatedKey) {
      try {
        await navigator.clipboard.writeText(generatedKey)
        setCopied(true)
        toast.success("API key copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        toast.error("Failed to copy to clipboard")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setValidationError("name is required")
      return
    }

    setValidationError(null)
    setIsSubmitting(true)

    try {
      const result = await apiKeyStore.createApiKey(name.trim())

      if (result) {
        setGeneratedKey(result.key)
        toast.success("API key created successfully")
        setName("")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {generatedKey ? "API Key Created" : "Create New API Key"}
          </DialogTitle>
          <DialogDescription>
            {generatedKey
              ? "Save this key securely. You won't be able to see it again."
              : "Enter a name to generate a new API key."}
          </DialogDescription>
        </DialogHeader>

        {!generatedKey ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  API Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setValidationError(null)
                  }}
                  disabled={isSubmitting}
                  className={validationError ? "border-destructive" : ""}
                />
                {validationError && (
                  <p className="text-sm text-destructive">{validationError}</p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Creating..." : "Create API Key"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4 py-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> This is the only time you'll see this key.
                Make sure to copy it now and store it securely.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your API Key</label>
              <div className="flex gap-2">
                <Input
                  value={generatedKey}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleClose}>Done</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default observer(CreateApiKeyDialog)
