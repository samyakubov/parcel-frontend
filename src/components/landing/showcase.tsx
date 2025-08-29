import Image from "next/image"
import { ArrowRight } from "lucide-react"
import {Button} from "@/components/ui/button"

export default function Showcase() {
	const stats = [
		{ value: "100%", label: "Satisfactions Clients" },
		{ value: "500+", label: "Property sells" },
		{ value: "150+", label: "Countries & Cities" },
		{ value: "2,00+", label: "Positive reviews" }
	]

	return (
		<section className="w-full max-w-7xl mx-auto px-6 py-16">
			<div className="flex items-start justify-between mb-12">
				<div className="flex-1 max-w-2xl">
					<h1 className="text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
                        Your primary home might begin to feel left out.
					</h1>
				</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-8 mb-16">
				<div className="relative">
					<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
						<Image
							src="/modern-interior.jpg"
							alt="Modern luxury home exterior"
							fill
							className="object-cover"
						/>
					</div>
					<div className="text-center mb-4 mt-8">
						<button className="inline-flex items-center gap-2 bg-primary text-background rounded-full px-6 py-3 hover:bg-primary/90 transition-colors">
                            Explore Properties
							<ArrowRight className="w-4 h-4" />
						</button>
					</div>
				</div>

				<div className="flex flex-col justify-between">
					<div>
						<h2 className="text-3xl font-bold text-foreground mb-6">
                            Big things can happen in small spaces.
						</h2>

						<p className="text-muted-foreground mb-8 leading-relaxed">
                            With thoughtful design and smart organization, you can maximize every inch, making room for creativity
						</p>

						<Button className="inline-flex items-center gap-2 text-white border border-border
						    rounded-full px-6 py-3 hover:bg-muted transition-colors">
                            Details
						</Button>
					</div>
					<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-4 mt-8">
						<Image
							src="/modern-extrior.jpg"
							alt="Modern architectural home"
							fill
							className="object-cover"
						/>
					</div>

				</div>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-border">
				{stats.map((stat, index) => (
					<div key={index} className="text-center lg:text-left">
						<div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
							{stat.value}
						</div>
						<div className="text-muted-foreground text-sm">
							{stat.label}
						</div>
					</div>
				))}
			</div>

		</section>
	)
}
