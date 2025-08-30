"use client"
import { motion } from "framer-motion"
import { Clock, Shield, Zap, Users, TrendingUp, Star } from "lucide-react"
import {Button} from "@/components/ui/button"

const benefits = [
	{
		icon: Clock,
		title: "Save Time",
		description: "Build your timeline 10x faster with our intuitive drag-and-drop interface and smart automation features.",
		gradient: "from-blue-500/20 to-cyan-500/20"
	},
	{
		icon: Shield,
		title: "Secure & Private",
		description: "Your memories are protected with enterprise-grade security. Own your data completely with full privacy controls.",
		gradient: "from-green-500/20 to-emerald-500/20"
	},
	{
		icon: Zap,
		title: "Lightning Fast",
		description: "Experience blazing-fast performance with instant uploads, real-time syncing, and optimized image processing.",
		gradient: "from-yellow-500/20 to-orange-500/20"
	},
	{
		icon: Users,
		title: "Collaborate Easily",
		description: "Share timelines with family and friends. Collaborate on memories and build shared stories together.",
		gradient: "from-purple-500/20 to-pink-500/20"
	},
	{
		icon: TrendingUp,
		title: "Smart Analytics",
		description: "Get insights into your timeline patterns, most viewed memories, and engagement with your shared content.",
		gradient: "from-indigo-500/20 to-blue-500/20"
	},
	{
		icon: Star,
		title: "Premium Quality",
		description: "High-resolution storage, advanced editing tools, and premium templates to make your timelines shine.",
		gradient: "from-rose-500/20 to-red-500/20"
	}
]

export default function Benefits() {
	return (
		<section className="w-full py-24 bg-background">
			<div className="max-w-7xl mx-auto px-8">
				{/* Header */}
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
                        Transform the way you capture and share your life's moments with powerful features
                        designed for modern storytelling.
					</p>
				</motion.div>

				{/* Benefits Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{benefits.map((benefit, index) => {
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
								{/* Background glow effect */}
								<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5
								opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

								{/* Icon */}
								<motion.div
									className="relative mb-6 p-4 rounded-2xl bg-primary/10 w-fit"
									whileHover={{ rotate: 5, scale: 1.1 }}
									transition={{ duration: 0.3 }}
								>
									<Icon className="w-8 h-8 text-primary" />
								</motion.div>

								{/* Content */}
								<div className="relative z-10">
									<h3 className="text-2xl font-bold text-foreground mb-4">
										{benefit.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{benefit.description}
									</p>
								</div>

								{/* Subtle border glow on hover */}
								<div className="absolute inset-0 rounded-3xl ring-1 ring-primary/20 opacity-0
								 group-hover:opacity-100 transition-opacity duration-500" />
							</motion.div>
						)
					})}
				</div>

				{/* Call to Action */}
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
