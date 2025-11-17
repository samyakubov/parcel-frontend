"use client"

import { observer } from "mobx-react"
import { apiKeyStore } from "@/stores/api-key-store"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ApiKeyRow from "./api-key-row"
import ApiKeyTableSkeleton from "./api-key-table-skeleton"

function ApiKeyTable() {
  if (apiKeyStore._isLoading && apiKeyStore._apiKeys.length === 0) {
    return <ApiKeyTableSkeleton />
  }

  if (apiKeyStore._apiKeys.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center">
        <p className="text-muted-foreground text-lg">No API keys found</p>
        <p className="text-muted-foreground text-sm mt-2">
          Create your first API key to get started
        </p>
      </div>
    )
  }

  return (
    <div className="hidden md:block border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="hidden lg:table-cell w-[140px]">Created Date</TableHead>
              <TableHead className="hidden lg:table-cell w-[140px]">Last Used</TableHead>
              <TableHead className="text-right w-[180px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeyStore._apiKeys.map((apiKey) => (
              <ApiKeyRow key={apiKey.id} apiKey={apiKey} />
            ))}
          </TableBody>
        </Table>
    </div>
  )
}


export default observer(ApiKeyTable)
