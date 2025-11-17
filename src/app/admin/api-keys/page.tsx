"use client"

import { useState } from "react"
import { observer } from "mobx-react-lite"
import { apiKeyStore } from "@/stores/api-key-store"
import AdminAuthForm from "@/components/admin/admin-auth-form"
import { ApiKeyManagement } from "@/components/admin/api-key-management"

const AdminApiKeysPage = observer(() => {
	const [isAuthChecked, setIsAuthChecked] = useState(false)

	const handleAuthenticated = () => {
		setIsAuthChecked(true)
	}

	// Show authentication form if not authenticated
	if (!apiKeyStore._isAuthenticated || !isAuthChecked) {
		return <AdminAuthForm onAuthenticated={handleAuthenticated} />
	}

	// Show API key management interface when authenticated
	return <ApiKeyManagement />
})

AdminApiKeysPage.displayName = "AdminApiKeysPage"

export default AdminApiKeysPage
