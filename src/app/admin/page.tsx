"use client"
import { useState } from "react"
import AdminAuthForm from "@/components/admin/admin-auth-form"
import  ApiKeyManagement from "@/components/admin/api-key-management/api-key-management"
import {observer} from "mobx-react"
import { adminStore } from "@/stores/admin-store"

function Admin() {
	const [isAuthChecked, setIsAuthChecked] = useState(false)

	const handleAuthenticated = () => {
		setIsAuthChecked(true)
	}

	if (!adminStore._isAuthenticated || !isAuthChecked) {
		return <AdminAuthForm onAuthenticated={handleAuthenticated} />
	}

	return <ApiKeyManagement />
}


export default observer(Admin)
