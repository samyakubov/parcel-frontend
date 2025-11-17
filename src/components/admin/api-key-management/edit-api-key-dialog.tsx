"use client"
import { useState, useEffect } from "react"
import { observer } from "mobx-react"
import { toast } from "react-toastify"
import { Loader2 } from "lucide-react"
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
import { apiKeyStore } from "@/stores/api-key-store"
import type { ApiKey } from "@/types/api-key"

interface EditApiKeyDialogProps {
  apiKey: ApiKey
  open: boolean
  onOpenChange: (open: boolean) => void
}

function EditApiKeyDialog({ apiKey, open, onOpenChange }: EditApiKeyDialogProps) {
  const [name, setName] = useState(apiKey.name)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setName(apiKey.name)
      setValidationError(null)
    }
  }, [open, apiKey.name])

  const handleClose = () => {
    setName(apiKey.name)
    setValidationError(null)
    onOpenChange(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setValidationError("Name is required")
      return
    }

    if (name.trim() === apiKey.name) {
      handleClose()
      return
    }

    setValidationError(null)
    setIsSubmitting(true)

    try {
      const success = await apiKeyStore.updateApiKey(apiKey.id, { name: name.trim() })
      if (success) {
        toast.success("API key updated successfully")
        handleClose()
      } else {
        toast.error(apiKeyStore._error?.userMessage || "Failed to update API key")
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
          <DialogTitle>Edit API Key</DialogTitle>
          <DialogDescription>
            Update the name for this API key.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                placeholder="Enter name"
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export default observer(EditApiKeyDialog)
