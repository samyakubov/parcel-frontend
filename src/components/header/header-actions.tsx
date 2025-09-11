"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

interface HeaderActionsProps {
    isScrolled: boolean;
}

export default function HeaderActions({ isScrolled }: HeaderActionsProps) {
	const router = useRouter()

	return (
		<div className="flex items-center space-x-4">
			<ThemeToggle />
			<Button
				variant="ghost"
				className={`transition-colors duration-300 rounded-full px-4 py-2 ${
					isScrolled
						? "text-muted-foreground hover:text-foreground hover:bg-accent/50"
						: "text-white/80 hover:text-white hover:bg-white/10"
				}`}
				onClick={() => router.push("/login")}
			>
				Login
			</Button>
			<Button
				className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full"
				onClick={() => router.push("/sign-up")}
			>
				Sign Up
			</Button>
		</div>
	)
}
