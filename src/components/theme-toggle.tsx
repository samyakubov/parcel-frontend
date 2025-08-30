"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const getButtonClasses = () => {
		if (theme === "light" && isScrolled) {
			return "text-black hover:bg-black/10"
		}
		return "text-white hover:bg-white/20"
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className={getButtonClasses()}
		>
			<Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-10 w-10 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	)
}
