import React from "react"
import { MapPin } from "lucide-react"

interface StopItemProps {
	stop: Stop
	isNearby: boolean
}

export default function StopItem({ stop, isNearby }: StopItemProps) {
	return (
		<div
			className={`px-4 py-3 flex items-start gap-3 transition-colors border-b last:border-b-0 ${isNearby
				? "bg-primary/10 hover:bg-primary/20 border-l-4 border-l-primary"
				: "hover:bg-accent/30"
			}`}
		>
			<MapPin
				className={`h-4 w-4 mt-0.5 shrink-0 ${isNearby ? "text-primary fill-primary/20" : "text-primary"
				}`}
			/>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2">
					<p
						className={`font-medium text-sm ${isNearby ? "text-primary font-semibold" : ""
						}`}
					>
						{stop.stop_name}
					</p>
					{isNearby && (
						<span className="text-xs px-2 py-0.5 bg-primary text-primary-foreground rounded-full font-medium">
							Nearby
						</span>
					)}
				</div>
				{stop.platform_code && (
					<p className="text-xs text-muted-foreground">
						Platform {stop.platform_code}
					</p>
				)}
				{stop.stop_desc && (
					<p className="text-xs text-muted-foreground mt-1">
						{stop.stop_desc}
					</p>
				)}
			</div>
		</div>
	)
}
