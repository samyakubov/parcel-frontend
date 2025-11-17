"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import CreateApiKeyDialog from "./create-api-key-dialog"

export function ApiKeyHeader() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">API Key Management System</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          Manage API keys
        </p>
      </div>

      <Button
        onClick={() => setIsCreateDialogOpen(true)}
        className="w-full sm:w-auto shrink-0"
      >
        <Plus className="size-4" />
        <span className="sm:inline">Create API Key</span>
      </Button>

      <CreateApiKeyDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  )
}
