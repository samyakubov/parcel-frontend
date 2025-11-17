"use client"

import { useState, FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { apiKeyStore } from "@/stores/api-key-store"
import { observer } from "mobx-react-lite"

interface AdminAuthFormProps {
	onAuthenticated: () => void
}

const AdminAuthForm = observer(({ onAuthenticated }: AdminAuthFormProps) => {
	const [apiKey, setApiKey] = useState("")
	const [showApiKey, setShowApiKey] = useState(false)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		
		const isAuthenticated = apiKeyStore.authenticate(apiKey)
		
		if (isAuthenticated) {
			onAuthenticated()
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-foreground mb-2">
						Admin Authentication
					</h1>
					<p className="text-muted-foreground">
						Enter your admin API key to access the management interface
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label 
							htmlFor="api-key" 
							className="block text-sm font-medium text-foreground mb-2"
						>
							Admin API Key
						</label>
						<div className="relative">
							<Input
								id="api-key"
								type={showApiKey ? "text" : "password"}
								value={apiKey}
								onChange={(e) => setApiKey(e.target.value)}
								placeholder="Enter admin API key"
								className="w-full pr-10"
								required
								aria-invalid={!!apiKeyStore._error}
							/>
							<button
								type="button"
								onClick={() => setShowApiKey(!showApiKey)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
								aria-label={showApiKey ? "Hide API key" : "Show API key"}
							>
								{showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
							</button>
						</div>
						
						{apiKeyStore._error && (
							<p className="mt-2 text-sm text-destructive" role="alert">
								{apiKeyStore._error}
							</p>
						)}
					</div>

					<Button 
						type="submit" 
						className="w-full"
						disabled={!apiKey.trim()}
					>
						Authenticate
					</Button>
				</form>
			</div>
		</div>
	)
})

AdminAuthForm.displayName = "AdminAuthForm"

export default AdminAuthForm
