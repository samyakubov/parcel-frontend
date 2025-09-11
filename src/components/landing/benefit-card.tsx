"use client"
import { motion } from "framer-motion"

interface BenefitCardProps {
    benefit: Benefit;
    index: number;
}

export default function BenefitCard({ benefit, index }: BenefitCardProps) {
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
}
