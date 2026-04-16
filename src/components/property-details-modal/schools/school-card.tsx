import { MapPin } from "lucide-react"

export default function SchoolCard({ school }: { school: School }) {
	return (
		<div className="py-3 border-b border-border last:border-b-0">
			<div className="flex items-start justify-between gap-2">
				<span className="text-[15px] font-bold text-foreground leading-snug flex-1">
					{school.location_name}
				</span>
				{school.location_type_description && (
					<span className="inline-flex items-center px-2 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wide flex-shrink-0 bg-muted text-muted-foreground">
						{school.location_type_description}
					</span>
				)}
			</div>

			{school.location_category_description && (
				<p className="mt-1.5 text-[13px] text-muted-foreground leading-snug">
					{school.location_category_description}
				</p>
			)}

			<div className="mt-3 flex items-center gap-1">
				<MapPin className="h-3 w-3 text-muted-foreground/50 flex-shrink-0" />
				<span className="text-[12px] text-muted-foreground/70 font-medium">
					{school.primary_address_line_1} · District {school.community_district}
				</span>
			</div>
		</div>
	)
}
