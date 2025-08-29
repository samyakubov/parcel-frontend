"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { HEADER_NAV_OPTIONS } from "@/constants/navigation"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
	return (
		<header className="absolute top-0 left-0 right-0 z-50 p-6">
			<div className="flex items-center justify-between">
				<div className="text-white text-3xl">
                    Buildly
				</div>

				<nav className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20
				    rounded-full px-6 py-3">
					{HEADER_NAV_OPTIONS.map((option: NavOption, index: number) => (
						<Button
							key={option.href}
							variant="ghost"
							className={`${
								index === 0
									? "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white rounded-full"
									: "text-white/80 hover:text-white hover:bg-white/10 rounded-full"
							} px-4 py-2`}
						>
							{option.label}
						</Button>
					))}
				</nav>

				<div className="flex items-center space-x-4">
					<ThemeToggle />

					<Button
						variant="ghost"
						className="text-white/80 hover:text-white hover:bg-white/10 rounded-full px-4 py-2"
					>
                        Login
					</Button>
					<Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full">
                        Sign Up
					</Button>
				</div>
			</div>
		</header>
	)
}
