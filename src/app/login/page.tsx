"use client"
import LoginHero from "@/components/login/login-hero"
import LoginForm from "@/components/login/login-form"

export default function Login() {
	return (
		<div className="min-h-screen flex bg-background text-foreground">
			<LoginHero />
			<LoginForm />
		</div>
	)
}
