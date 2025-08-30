"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HEADER_NAV_OPTIONS } from "@/constants/navigation"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState(0)
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY
			setIsScrolled(scrollTop > 50)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<header className="fixed top-0 left-0 right-0 z-50 p-6">
			<div className={`flex items-center justify-between rounded-4xl transition-all duration-300 px-6 py-3 scale-100 ${
				isScrolled
					? "bg-background/95 backdrop-blur-md border border-border shadow-lg shadow-green-500/20"
					: "bg-white/10 backdrop-blur-md border border-white/20"
			}`}>
				<div className={`text-3xl transition-colors duration-300 ${
					isScrolled ? "text-foreground" : "text-white"
				}`}>
                    Buildly
				</div>

				<nav className={"hidden md:flex items-center space-x-2"}>
					{HEADER_NAV_OPTIONS.map((option: NavOption, index: number) => (
						<Link href={option.href} key={option.href}>
							<Button
								variant="ghost"
								className={`transition-colors duration-300 px-4 py-2 rounded-full ${
									// eslint-disable-next-line no-nested-ternary
									selectedIndex === index
										? isScrolled
											? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
											: "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white"
										: isScrolled
											? "text-muted-foreground hover:text-foreground hover:bg-accent/50"
											: "text-white/80 hover:text-white hover:bg-white/10"
								}`}
								onClick={() => setSelectedIndex(index)}
							>
								{option.label}
							</Button>
						</Link>
					))}
				</nav>

				<div className="flex items-center space-x-4">
					<ThemeToggle />
					<Button
						variant="ghost"
						className={`transition-colors duration-300 rounded-full px-4 py-2 ${
							isScrolled
								? "text-muted-foreground hover:text-foreground hover:bg-accent/50"
								: "text-white/80 hover:text-white hover:bg-white/10"
						}`}
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
