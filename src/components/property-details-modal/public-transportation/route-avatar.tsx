import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface RouteAvatarProps {
	route: Route
}

export default function RouteAvatar({ route }: RouteAvatarProps) {
	return (
		<Avatar className="h-10 w-10 shrink-0 shadow-sm">
			<AvatarFallback
				className="text-sm font-bold"
				style={{
					backgroundColor: `#${route.route_color}`,
					color: `#${route.route_text_color}`,
				}}
			>
				{route.route_id}
			</AvatarFallback>
		</Avatar>
	)
}
