import { useState, useEffect } from "react"

export default function useDarkMode() {
	const [isDarkMode, setIsDarkMode] = useState(() =>
		localStorage.getItem("darkMode") === "true"
	)

	useEffect(() => {
		const handleDarkModeChange = (e: CustomEvent) => {
			setIsDarkMode(e.detail)
		}

		window.addEventListener("darkModeChange", handleDarkModeChange as EventListener)
		return () => window.removeEventListener("darkModeChange", handleDarkModeChange as EventListener)
	}, [])

	return isDarkMode
}
