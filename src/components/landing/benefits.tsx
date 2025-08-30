"use client"
import { motion } from "framer-motion"
import {Button} from "@/components/ui/button"
import {BENEFITS} from "@/constants/landing"



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
					{BENEFITS.map((benefit, index) => {
						const Icon = benefit.icon
						return (
							<motion.div
								key={benefit.title}
								className={`relative group p-8 rounded-3xl border border-border bg-card hover:shadow-xl 
								transition-all duration-500 hover:scale-105 bg-gradient-to-br ${benefit.gradient}`}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
									ease: "easeOut"
								}}
								viewport={{ once: true }}
								whileHover={{ y: -5 }}
							>
								<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5
								opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

								<motion.div
									className="relative mb-6 p-4 rounded-2xl bg-primary/10 w-fit"
									whileHover={{ rotate: 5, scale: 1.1 }}
									transition={{ duration: 0.3 }}
								>
									<Icon className="w-8 h-8 text-primary" />
								</motion.div>

								<div className="relative z-10">
									<h3 className="text-2xl font-bold text-foreground mb-4">
										{benefit.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{benefit.description}
									</p>
								</div>

								<div className="absolute inset-0 rounded-3xl ring-1 ring-primary/20 opacity-0
								 group-hover:opacity-100 transition-opacity duration-500" />
							</motion.div>
						)
					})}
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
