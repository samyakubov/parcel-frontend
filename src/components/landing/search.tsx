"use client"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"

export default function Search() {
	return (
		<div className="mx-auto">
			<div className="bg-card rounded-2xl shadow-2xl p-8">
				<h2 className="text-3xl font-bold text-foreground mb-8">Find your home's history</h2>

				<div className="flex flex-col gap-4">
					<label className="block text-sm font-medium text-muted-foreground">
                        Enter a property address to see its full history
					</label>

					<div className="flex gap-4">
						<Input
							placeholder="Enter property address"
							className="bg-muted border-border flex-grow"
						/>
						<Button className="bg-primary hover:bg-primary/90 text-background px-8 py-3 rounded-full">
                            Search Address
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
