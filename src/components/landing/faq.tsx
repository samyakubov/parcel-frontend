"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { FAQ_QUESTIONS } from "@/constants/landing"
import { motion } from "framer-motion"


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
                        Have questions? We've got answers. Explore the most common questions about creating your Home Timeline and how it can benefit you.
					</p>
				</motion.div>
			</div>

			<motion.div
				variants={containerVariants}
				className="space-y-4"
			>
				<Accordion type="single" collapsible>
					{FAQ_QUESTIONS.map((faq) => (
						<motion.div key={faq.id} className={"py-2"}>
							<AccordionItem
								value={faq.id}
								className="border border-border rounded-lg px-6 py-2 bg-card/50 "
							>
								<AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="pb-6">
									<div
										className={faq.hasImage ? "grid lg:grid-cols-2 gap-8 items-start" : ""}
									>
										<div>
											<p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
										</div>
										{faq.hasImage && (
											<div className="relative h-48 lg:h-56 rounded-lg overflow-hidden">
												<Image
													src="/modern-luxury-property-interior-with-contemporary-.png"
													alt="Modern luxury property interior"
													fill
													className="object-cover"
												/>
											</div>
										)}
									</div>
								</AccordionContent>
							</AccordionItem>
						</motion.div>
					))}
				</Accordion>
			</motion.div>
		</motion.section>
	)
}
