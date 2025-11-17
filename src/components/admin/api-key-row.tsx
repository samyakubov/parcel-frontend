"use client"

import { useState } from "react"
import { format } from "date-fns"
import { observer } from "mobx-react"
import { toast } from "react-toastify"
import { apiKeyStore } from "@/stores/api-key-store"
import type { ApiKey } from "@/types/api-key"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, Calendar, Clock } from "lucide-react"
import { EditApiKeyDialog } from "./edit-api-key-dialog"
import { DeleteApiKeyDialog } from "./delete-api-key-dialog"

interface ApiKeyRowProps {
  apiKey: ApiKey
}

export const ApiKeyRow = observer(({ apiKey }: ApiKeyRowProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleToggleStatus = async (checked: boolean) => {
    const success = await apiKeyStore.updateApiKey(apiKey.id, { enabled: checked })
    
    if (success) {
      toast.success(`API key ${checked ? "enabled" : "disabled"} successfully`)
    } else {
      toast.error(apiKeyStore._error || "Failed to update API key status")
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch {
      return dateString
    }
  }

  return (
    <>
      {/* Desktop and Tablet: Table Row */}
      <TableRow className="hidden md:table-row">
        <TableCell className="font-mono text-xs">{apiKey.id}</TableCell>
        <TableCell className="font-medium">{apiKey.name}</TableCell>
        <TableCell>
          <Badge variant={apiKey.enabled ? "default" : "secondary"}>
            {apiKey.enabled ? "Enabled" : "Disabled"}
          </Badge>
        </TableCell>
        <TableCell className="hidden lg:table-cell">{formatDate(apiKey.createdAt)}</TableCell>
        <TableCell className="hidden lg:table-cell">
          {apiKey.lastUsedAt ? formatDate(apiKey.lastUsedAt) : "Never"}
        </TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            <Switch
              checked={apiKey.enabled}
              onCheckedChange={handleToggleStatus}
              disabled={apiKeyStore._isLoading}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditDialogOpen(true)}
              disabled={apiKeyStore._isLoading}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={apiKeyStore._isLoading}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Mobile: Card View */}
      <Card className="md:hidden">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header: Name and Status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base truncate">{apiKey.name}</h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">ID: {apiKey.id}</p>
              </div>
              <Badge variant={apiKey.enabled ? "default" : "secondary"} className="shrink-0">
                {apiKey.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="size-4 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs">Created</p>
                  <p className="font-medium text-foreground truncate">{formatDate(apiKey.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs">Last Used</p>
                  <p className="font-medium text-foreground truncate">
                    {apiKey.lastUsedAt ? formatDate(apiKey.lastUsedAt) : "Never"}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <Switch
                  checked={apiKey.enabled}
                  onCheckedChange={handleToggleStatus}
                  disabled={apiKeyStore._isLoading}
                />
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditDialogOpen(true)}
                  disabled={apiKeyStore._isLoading}
                >
                  <Pencil className="size-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  disabled={apiKeyStore._isLoading}
                >
                  <Trash2 className="size-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditApiKeyDialog
        apiKey={apiKey}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <DeleteApiKeyDialog
        apiKey={apiKey}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  )
})
