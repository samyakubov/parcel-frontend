"use client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"

export default function Search() {
	return (
		<div className="mx-auto">
			<div className="bg-card rounded-2xl shadow-2xl p-8">
				<h2 className="text-3xl font-bold text-foreground mb-8">Find the best place</h2>

				<div className="grid md:grid-cols-4 gap-6 mb-8">
					<div>
						<label className="block text-sm font-medium text-muted-foreground mb-2">Looking for</label>
						<Input placeholder="Enter type" className="bg-muted border-border" />
					</div>

					<div>
						<label className="block text-sm font-medium text-muted-foreground mb-2">Price</label>
						<Select>
							<SelectTrigger className="bg-muted border-border">
								<SelectValue placeholder="Price" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="0-500k">$0 - $500k</SelectItem>
								<SelectItem value="500k-1m">$500k - $1M</SelectItem>
								<SelectItem value="1m+">$1M+</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="block text-sm font-medium text-muted-foreground mb-2">Locations</label>
						<Select>
							<SelectTrigger className="bg-muted border-border">
								<SelectValue placeholder="Location" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="new-york">New York</SelectItem>
								<SelectItem value="los-angeles">Los Angeles</SelectItem>
								<SelectItem value="chicago">Chicago</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="block text-sm font-medium text-muted-foreground mb-2">Number of rooms</label>
						<Select>
							<SelectTrigger className="bg-muted border-border">
								<SelectValue placeholder="2 Bed rooms" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">1 Bedroom</SelectItem>
								<SelectItem value="2">2 Bedrooms</SelectItem>
								<SelectItem value="3">3 Bedrooms</SelectItem>
								<SelectItem value="4+">4+ Bedrooms</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<Button className="bg-primary hover:bg-primary/90 text-background px-8 py-3 rounded-full">
                    Search Properties
				</Button>
			</div>
		</div>
	)
}
