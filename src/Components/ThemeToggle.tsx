import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false)
	const [isBouncing, setIsBouncing] = useState(false)

	useEffect(() => {
		const isDarkMode = localStorage.getItem("darkMode") === "true"
		setIsDark(isDarkMode)
		document.documentElement.classList.toggle("dark", isDarkMode)
	}, [])

	const toggleTheme = () => {
		setIsDark(!isDark)
		document.documentElement.classList.toggle("dark")
		localStorage.setItem("darkMode", (!isDark).toString())
		window.dispatchEvent(new CustomEvent("darkModeChange", { detail: !isDark }))

		setIsBouncing(true)
		setTimeout(() => setIsBouncing(false), 300)
	}

	return (
		<div>
			<button
				onClick={toggleTheme}
				className="p-2 rounded-lg bg-transparent"
				aria-label="Toggle theme"
			>
				{isDark ? (
					<Moon
						className={`w-5 h-5 text-gray-400 transition-transform ${
							isBouncing ? "animate-bounceInOut" : ""
						}`}
					/>
				) : (
					<Sun
						className={`w-5 h-5 transition-transform ${
							isBouncing ? "animate-bounceInOut" : ""
						}`}
					/>
				)}
			</button>
		</div>
	)
}
