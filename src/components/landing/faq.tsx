"use client"
import { Accordion } from "@/components/ui/accordion"
import { FAQ_QUESTIONS } from "@/constants/landing"
import { motion } from "framer-motion"
import FaqItem from "@/components/landing/faq-item"

export default function FAQ() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.12,
				delayChildren: 0.2,
			},
		},
	}

	return (
		<motion.section
			className="py-16 px-6 max-w-7xl mx-auto"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			id='faq'
		>
			<div className="grid lg:grid-cols-2 gap-12 mb-12">
				<motion.div>
					<h2 className="text-4xl lg:text-5xl text-foreground mb-6 text-balance">
                        Frequently asked questions
					</h2>
				</motion.div>
				<motion.div className="flex items-center">
					<p className="text-lg text-muted-foreground leading-relaxed">
                        Have questions? We&apos;ve got answers. Explore the most common questions
                        about accessing property records and how our platform can help you.
					</p>
				</motion.div>
			</div>

			<motion.div
				variants={containerVariants}
				className="space-y-4"
			>
				<Accordion type="single" collapsible>
					{FAQ_QUESTIONS.map((faq) => (
						<FaqItem key={faq.id} faq={faq} />
					))}
				</Accordion>
			</motion.div>
		</motion.section>
	)
}
