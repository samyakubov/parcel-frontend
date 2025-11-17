"use client"

import { useState } from "react"
import { apiKeyStore } from "@/stores/api-key-store"
import AdminAuthForm from "@/components/admin/admin-auth-form"
import  ApiKeyManagement from "@/components/admin/api-key-management/api-key-management"
import {observer} from "mobx-react"

function AdminApiKeysPage() {
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
}


export default observer(AdminApiKeysPage)
