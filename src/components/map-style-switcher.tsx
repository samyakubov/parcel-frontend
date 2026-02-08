"use client"
import React, { useState } from "react"
import { Sun, Moon, Satellite } from "lucide-react"
import { useTheme } from "next-themes"
import {MapStyle} from "@/constants/mapbox"

interface MapStyleSwitcherProps {
	onStyleChange: (style: MapStyle) => void
	initialStyle?: MapStyle
}

export default function MapStyleSwitcher({onStyleChange, initialStyle = "satellite"}: MapStyleSwitcherProps) {
	const [activeStyle, setActiveStyle] = useState<MapStyle>(initialStyle)
	const { setTheme } = useTheme()

	const handleStyleChange = (style: MapStyle) => {
		setActiveStyle(style)
		onStyleChange(style)

		if (style === "light") {
			setTheme("light")
		} else if (style === "dark") {
			setTheme("dark")
		}
	}

	const styles: Array<{ type: MapStyle; icon: React.ReactNode; label: string }> = [
		{ type: "light", icon: <Sun className="w-4 h-4" />, label: "Light" },
		{ type: "dark", icon: <Moon className="w-4 h-4" />, label: "Dark" },
		{ type: "satellite", icon: <Satellite className="w-4 h-4" />, label: "Satellite" }
	]

	return (
		<div className="absolute top-4 right-4 z-10 flex gap-2 bg-card border border-border rounded-lg p-1 shadow-lg">
			{styles.map(({ type, icon, label }) => (
				<button
					key={type}
					onClick={() => handleStyleChange(type)}
					className={`
                        flex items-center gap-2 px-3 py-2 rounded-md duration-0 cursor-pointer
                        ${activeStyle === type
					? "bg-primary text-primary-foreground shadow-sm"
					: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
				}
                    `}
					aria-label={`Switch to ${label} map style`}
					title={label}
				>
					{icon}
					<span className="text-sm font-medium hidden sm:inline">{label}</span>
				</button>
			))}
		</div>
	)
}
