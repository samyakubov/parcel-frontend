"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [isScrolled, setIsScrolled] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Prevent hydration mismatch
	if (!mounted) {
		return (
			<Button
				variant="ghost"
				size="icon"
				className="relative h-10 w-10 rounded-full"
			>
				<div className="h-5 w-5" />
			</Button>
		)
	}

	const getButtonClasses = () => {
		const base = "relative h-10 w-10 rounded-full transition-all duration-300 ease-in-out"
		const hoverEffect = "hover:scale-110 active:scale-95"

		if (theme === "light" && isScrolled) {
			return `${base} ${hoverEffect} text-gray-900 bg-gray-100/80 hover:bg-gray-200 hover:text-black`
		}
		if (theme === "light") {
			return `${base} ${hoverEffect} text-gray-900 bg-gray-100/80 hover:bg-gray-200 hover:text-black`
		}
		return `${base} ${hoverEffect} text-white bg-white/15 hover:bg-white/25 hover:text-white`
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className={getButtonClasses()}
			aria-label="Toggle theme"
		>
			<Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />

			<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100" />

		</Button>
	)
}
