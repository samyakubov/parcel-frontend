"use client"
import React, { useState, useEffect } from "react"
import HeaderNav from "@/components/header/header-nav"
import HeaderActions from "@/components/header/header-actions"

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

				<HeaderNav isScrolled={isScrolled} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />

				<HeaderActions isScrolled={isScrolled} />
			</div>
		</header>
	)
}
