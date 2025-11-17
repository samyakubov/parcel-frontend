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
import { Pencil, Trash2} from "lucide-react"
import EditApiKeyDialog from "./edit-api-key-dialog"
import DeleteApiKeyDialog from "./delete-api-key-dialog"

interface ApiKeyRowProps {
  apiKey: ApiKey
}

function ApiKeyRow({ apiKey }: ApiKeyRowProps) {
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
    <TableRow className="hidden md:table-row">
      <TableCell className="font-medium">{apiKey.name}</TableCell>
      <TableCell>
        <Badge variant={apiKey.enabled ? "default" : "secondary"}>
          {apiKey.enabled ? "Enabled" : "Disabled"}
        </Badge>
      </TableCell>
      <TableCell className="hidden lg:table-cell">{formatDate(apiKey.created_at)}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {apiKey.last_used_at ? formatDate(apiKey.last_used_at) : "Never"}
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
    </TableRow>
  )
}

export default observer(ApiKeyRow)
