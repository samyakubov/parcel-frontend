"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { STATS } from "@/constants/landing"
import { motion } from "framer-motion"

export default function Showcase() {
	return (
		<section className="w-full max-w-7xl mx-auto px-6 py-16" id="#showcase">
			<div className="flex items-start justify-between mb-12">
				<motion.div
					className="flex-1 max-w-2xl"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h1 className="text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                        Your Homes Timeline
					</h1>
				</motion.div>
			</div>

			<div className="grid lg:grid-cols-2 gap-8 mb-16">
				<motion.div
					className="relative"
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
				>
					<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
						<Image
							src="/modern-interior.jpg"
							alt="Modern luxury home exterior"
							fill
							className="object-cover"
						/>
					</div>
					<motion.div
						className="text-center mb-4 mt-8"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<button className="inline-flex items-center gap-2 bg-primary text-background rounded-full
						    px-6 py-3 hover:bg-primary/90 transition-colors">
                            Create Your Timeline
							<ArrowRight className="w-4 h-4" />
						</button>
					</motion.div>
				</motion.div>

				<motion.div
					className="flex flex-col justify-between"
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
				>
					<div>
						<h2 className="text-3xl font-bold text-foreground mb-6">
                            Every Detail, Documented
						</h2>

						<p className="text-muted-foreground mb-8 leading-relaxed">
                            From the new roof to the kitchen remodel, Buildly empowers you to build a comprehensive
                            profile of your homes history. No more guessing games for buyers, just a complete, transparent record.
						</p>

						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button className="inline-flex items-center gap-2 bg-primary text-background border border-border
								rounded-full px-6 py-3 hover:bg-muted transition-colors">
                                Details
							</Button>
						</motion.div>
					</div>
					<motion.div
						className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-4 mt-8"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<Image
							src="/modern-extrior.jpg"
							alt="Modern architectural home"
							fill
							className="object-cover"
						/>
					</motion.div>
				</motion.div>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-border">
				{STATS.map((stat, index) => (
					<motion.div
						key={index}
						className="text-center lg:text-left"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: index * 0.1 }}
						viewport={{ once: true }}
					>
						<div className="text-4xl lg:text-5xl text-foreground mb-2">
							{stat.value}
						</div>
						<div className="text-muted-foreground text-sm">
							{stat.label}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}
