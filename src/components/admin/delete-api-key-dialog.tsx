"use client"

import { useState } from "react"
import { observer } from "mobx-react"
import { toast } from "react-toastify"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { apiKeyStore } from "@/stores/api-key-store"
import type { ApiKey } from "@/types/api-key"

interface DeleteApiKeyDialogProps {
  apiKey: ApiKey
  open: boolean
  onOpenChange: (open: boolean) => void
}

const useDeleteApiKey = (apiKeyId: number, onSuccess: () => void) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const success = await apiKeyStore.deleteApiKey(apiKeyId)

      if (success) {
        toast.success("API key deleted successfully")
        onSuccess()
      } else {
        toast.error(apiKeyStore._error || "Failed to delete API key")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error("Error deleting API key:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return { handleDelete, isDeleting }
}

const DeleteApiKeyDialogComponent = ({ apiKey, open, onOpenChange }: DeleteApiKeyDialogProps) => {
  const { handleDelete, isDeleting } = useDeleteApiKey(apiKey.id, () => onOpenChange(false))

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete API Key</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the API key <strong>{apiKey.name}</strong> (ID: {apiKey.id})?
            This action cannot be undone and will immediately revoke access for any services using this key.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const DeleteApiKeyDialog = observer(DeleteApiKeyDialogComponent)
