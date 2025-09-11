"use client"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { motion } from "framer-motion"

interface FaqItemProps {
    faq: FaqItem;
}

export default function FaqItem ({ faq }: FaqItemProps) {
	return (
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
	)
}
