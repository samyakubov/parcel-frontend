"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BENEFITS } from "@/constants/landing"
import BenefitCard from "@/components/landing/benefit-card"

export default function Benefits() {
	return (
		<section className="w-full py-24 bg-background">
			<div className="max-w-7xl mx-auto px-8">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className="text-5xl font-bold text-foreground mb-6">
                        Why Choose <span className="text-primary">Buildly</span>?
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Transform the way you capture and share your life&apos;s moments with powerful features
                        designed for modern storytelling.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{BENEFITS.map((benefit, index) => (
						<BenefitCard key={benefit.title} benefit={benefit} index={index} />
					))}
				</div>

				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					viewport={{ once: true }}
				>
					<Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full
					 px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                        Get Started Today
					</Button>
				</motion.div>
			</div>
		</section>
	)
}
