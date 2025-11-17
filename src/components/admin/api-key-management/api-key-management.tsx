"use client"
import { useEffect } from "react"
import { observer } from "mobx-react"
import { apiKeyStore } from "@/stores/api-key-store"
import { ApiKeyHeader } from "./api-key-header"
import  ApiKeyTable from "./api-key-table"

function ApiKeyManagement() {
  useEffect(() => {
    apiKeyStore.fetchApiKeys()
  }, [])

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 max-w-7xl">
      <ApiKeyHeader />

      {apiKeyStore._error && (
        <div className="mb-4 p-3 sm:p-4 bg-destructive/10 border border-destructive rounded-md">
          <p className="text-xs sm:text-sm text-destructive">{apiKeyStore._error}</p>
        </div>
      )}
      <ApiKeyTable />
    </div>
  )
}

export default observer(ApiKeyManagement)
