import React from "react"
import { Search, Map, ChartPieIcon } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import useTypedNavigate from "../Hooks/useTypedNavigate"
import { useLocation } from "react-router"

interface NavItem {
	icon: React.ReactNode
	href: string
}

export default function Sidebar() {
	const navigate = useTypedNavigate()
	const location = useLocation()

	const navItems: NavItem[] = [
		{
			icon: <Map className="w-5 h-5" />,
			href: "/map",
		},
		{
			icon: <Search className="w-5 h-5" />,
			href: "/search",
		},
		{
			icon: <ChartPieIcon className="w-5 h-5" />,
			href: "/analytics",
		},
	]

	return (
		<nav className="fixed left-0 flex flex-col h-screen w-16 bg-white/10 dark:bg-gray-900 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/60 shadow-2xl dark:shadow-black/40">
			<div className="flex flex-col items-center justify-center flex-1 gap-3 py-6">
				{navItems.map((item, index) => {
					const isActive = location.pathname === item.href
					return (
						<div key={index} className="relative group">
							{isActive && (
								<div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-indigo-500 dark:bg-indigo-400 rounded-r-full shadow-lg shadow-indigo-500/30 dark:shadow-indigo-400/40" />
							)}

							<button
								onClick={() => navigate(item.href as PageNames)}
								className={`
                  relative flex items-center justify-center w-10 h-10 rounded-xl
                  transition-all duration-300 ease-out transform
                  ${isActive
							? "bg-indigo-500/20 dark:bg-indigo-400/25 text-indigo-600 dark:text-indigo-300 scale-110 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-400/30"
							: "text-gray-500 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-slate-700/60 hover:text-gray-700 dark:hover:text-slate-200 hover:scale-105 hover:shadow-md dark:hover:shadow-slate-900/50"
						}
                  group-hover:backdrop-blur-sm
                  border border-white/10 dark:border-slate-600/30
                `}
							>
								{isActive && (
									<div className="absolute inset-0 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/15 blur-sm" />
								)}

								<div className="relative z-10 transition-transform duration-200 group-hover:scale-110">
									{item.icon}
								</div>

								<div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<div className="absolute inset-0 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/15 animate-pulse" />
								</div>
							</button>
						</div>
					)
				})}
			</div>

			<div className="flex justify-center w-full py-4 border-t border-white/10 dark:border-slate-700/40">
				<div className="p-2 rounded-xl bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 shadow-lg dark:shadow-slate-900/30">
					<ThemeToggle />
				</div>
			</div>
		</nav>
	)
}
