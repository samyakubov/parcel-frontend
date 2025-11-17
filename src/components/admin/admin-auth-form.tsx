"use client"
import { useState, FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { observer } from "mobx-react"
import {adminStore} from "@/stores/admin-store"

interface AdminAuthFormProps {
	onAuthenticated: () => void
}

function AdminAuthForm({ onAuthenticated }: AdminAuthFormProps) {
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			const isAuthenticated = await adminStore.authenticate(password)
			if (isAuthenticated) {
				onAuthenticated()
			}
		} finally {
			setIsLoading(false)
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
						Enter the admin password to access the management interface
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-foreground mb-2"
						>
							Admin Password
						</label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter admin password"
								className="w-full pr-10"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2
								text-muted-foreground hover:text-foreground transition-colors"
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
							</button>
						</div>
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={!password.trim() || isLoading}
					>
						{isLoading ? "Authenticating..." : "Authenticate"}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default observer(AdminAuthForm)
