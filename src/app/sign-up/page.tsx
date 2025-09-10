"use client"
import { SignUpHero } from "@/components/sign-up/sign-up-hero"
import { SignUpForm } from "@/components/sign-up/sign-up-form"

export default function SignUp() {
	return (
		<div className="min-h-screen flex ">
			<SignUpForm />
			<SignUpHero />
		</div>
	)
}