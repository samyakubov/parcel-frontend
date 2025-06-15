import React, { useState, useEffect } from "react"
import {HEADER_TAGS} from "../../Constants/Constants"

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<header className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl">
			<div
				className={`relative transition-all duration-500 ease-out backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl shadow-emerald-500/10 ${
					isScrolled
						? "bg-white/15 shadow-3xl shadow-emerald-500/15 scale-[0.98]"
						: "hover:bg-white/15"
				}`}
			>
				<div className="relative flex items-center justify-between px-8 py-3">
					<div className="flex items-center space-x-3">
						<span className="text-2xl font-bold bg-white bg-clip-text text-transparent">Parcel</span>
					</div>

					<nav className="flex items-center space-x-1">
						{
							HEADER_TAGS.map((tag) => (
								<a
									key={tag.name}
									className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 group"
									href={tag.href}
								>
									<span className="relative z-10">{tag.name}</span>
									<div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
								</a>
							))
						}

					</nav>
					<div/>
				</div>
			</div>
		</header>
	)
}
