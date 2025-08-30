"use client"

import {STATS} from "@/constants/landing"
import {motion} from "framer-motion"

export default function Stats() {
	return (
		<section className="w-full">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 p-6 lg:p-8">
					{STATS.map((stat, index) => (
						<motion.div
							key={index}
							className="text-center"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{
								duration: 0.8,
								delay: index * 0.1,
								ease: "easeOut"
							}}
							viewport={{ once: true }}
						>
							<div className="text-3xl lg:text-5xl font-normal text-foreground/70 mb-2">
								{stat.value}
							</div>

							<div className="text-muted-foreground/60 text-sm font-normal">
								{stat.label}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
