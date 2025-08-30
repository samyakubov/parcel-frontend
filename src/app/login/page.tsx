"use client"
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import {Button} from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {Input} from "@/components/ui/input"


export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	})
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()

	const handleInputChange = (field:string, value:string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	return (
		<div className="min-h-screen flex bg-background text-foreground">
			<div className="flex-1 relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/30 rounded-r-3xl">
				<div
					className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: "url(page-assets/login-background-photo.jpg)" }}
				/>
				<div className="absolute inset-0 backdrop-blur-md" />
				<div className="relative z-10 h-full flex flex-col justify-center items-start p-8 text-left">
					<h2 className="text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 leading-tight drop-shadow-lg">
                        Continue Your <span className="text-accent">Timeline</span>
					</h2>
					<p className="text-xl md:text-2xl text-primary-foreground/90 max-w-lg leading-relaxed drop-shadow-md">
                        Document every upgrade and create a lasting story of your home&apos;s evolution
					</p>
				</div>
			</div>

			<div className="flex-1 bg-card flex flex-col justify-center px-8 lg:px-16 max-w-md lg:max-w-lg">
				<div className="mb-8">
					<Button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg"
						onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4" />
					</Button>
				</div>

				<div className="mb-8">
					<h1 className="text-3xl font-bold text-card-foreground mb-2">Login</h1>
					<p className="text-muted-foreground">
                        Don&apos;t already have an account?{" "}
						<a href="/sign-up" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            Sign up
						</a>
					</p>
				</div>

				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-card-foreground mb-2">
                            Email Address
						</label>
						<Input
							type="email"
							value={formData.email}
							onChange={(e) => handleInputChange("email", e.target.value)}
							placeholder="Email Address"
							className="w-full px-3 py-3 border border-border rounded-lg text-card-foreground
							placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-card-foreground mb-2">
                            Password
						</label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								value={formData.password}
								onChange={(e) => handleInputChange("password", e.target.value)}
								placeholder="Password"
								className="w-full px-3 py-3 pr-10 border border-border rounded-lg text-card-foreground
								placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground
								 hover:text-card-foreground transition-colors"
							>
								{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
							</button>
						</div>
					</div>

					<button className="w-full py-3 text-base font-medium bg-primary text-primary-foreground rounded-lg
					hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring">
                        Login
					</button>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-card text-muted-foreground">or</span>
						</div>
					</div>

					<button className="w-full py-3 flex items-center justify-center gap-3 border border-border bg-card hover:bg-accent/50
					text-card-foreground rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring">
                        Continue with Google
					</button>
				</div>
			</div>
		</div>
	)
}
