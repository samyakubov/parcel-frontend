"use client"
import Search from "@/components/landing/search"

export default function Hero() {
	return (
		<section className="relative h-screen w-full flex flex-col">
			<div
				className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url(landing-page-assets/hero-photo.jpg)" }}
			>
				<div className="absolute inset-0 bg-black/30" />
			</div>

			<div className="absolute bottom-20 z-10 w-full h-1/2 flex flex-col items-center justify-between">

				<div className="flex-1 flex items-center w-full px-6">
					<div className="w-full grid lg:grid-cols-2 gap-12 items-center">
						<div className="text-white">
							<h1 className="text-6xl lg:text-7xl leading-tight mb-6 text-balance">
                                Uncover Every <span className="text-accent">Property&apos;s History</span> in Seconds
							</h1>
						</div>


						<div className="text-white/90 text-lg leading-relaxed">
							<p className="text-pretty">
                                Access comprehensive property records, sale history, violations, permits, and more.
                                Make informed real estate decisions with verified public data.
							</p>
						</div>
					</div>
				</div>

				<div className="relative z-20 h-1/2 flex items-center justify-center w-full px-12">
					<div className="w-full">
						<Search />
					</div>
				</div>
			</div>
		</section>
	)
}
