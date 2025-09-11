"use client"
import SignUpForm from "@/components/sign-up/sign-up-form"
import SignUpHero from "@/components/sign-up/sign-up-hero"

export default function SignUp() {
	return (
		<div className="min-h-screen flex ">
			<SignUpForm />
			<SignUpHero />
		</div>
	)
}
