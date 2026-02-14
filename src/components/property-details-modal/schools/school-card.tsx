import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SchoolCard({ school }: { school: School }) {
	const getTypeColor = (type: string) => {
		if (type.includes("Elementary")) return "bg-blue-100 text-blue-700 border-blue-200"
		if (type.includes("Middle")) return "bg-purple-100 text-purple-700 border-purple-200"
		if (type.includes("High")) return "bg-orange-100 text-orange-700 border-orange-200"
		return "bg-gray-100 text-gray-700 border-gray-200"
	}

	return (
		<Card className="overflow-hidden shadow-none bg-muted/30">
			<CardContent className="p-2">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-sm mb-1 line-clamp-1">
							{school.location_name}
						</h3>
						<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
							<MapPin className="h-3 w-3 flex-shrink-0" />
							<span className="line-clamp-1">{school.primary_address_line_1}</span>
						</div>
					</div>
					<Badge className={`${getTypeColor(school.location_category_description)} text-[10px] px-1.5 py-0.5 flex-shrink-0`}>
						{school.location_type_description}
					</Badge>
				</div>

				<div className="flex items-center text-xs pt-2 border-t">
					<div className="flex-1">
						<span className="text-muted-foreground">Category: </span>
						<span className="font-medium">{school.location_category_description}</span>
					</div>
					<div className="flex-shrink-0">
						<span className="text-muted-foreground">District: </span>
						<span className="font-medium">{school.community_district}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
