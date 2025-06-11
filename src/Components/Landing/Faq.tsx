import React, { useState } from "react"
import {FAQ} from "../../Constants/Constants"
import { AnimatePresence, motion } from "framer-motion"
import {ChevronDownIcon} from "lucide-react"

export default function Faq() {
	const [openItem, setOpenItem] = useState<number | null>(null)

	const toggleItem = (index: number) => {
		setOpenItem(openItem === index ? null : index)
	}

	return (
		<section className="relative py-24 sm:py-32 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-20 left-20 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-20 w-80 h-80 bg-red-400/10 rounded-full blur-3xl" />
			</div>

			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(239,68,68,0.1)_1px,transparent_0)] bg-[size:50px_50px]" />

			<div className="relative mx-auto max-w-4xl px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/20 border border-rose-400/30 rounded-full text-rose-200 text-sm font-medium mb-6">
						Support
					</div>
					<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-rose-100 to-red-100 bg-clip-text text-transparent">
						Frequently Asked Questions
					</h2>
					<p className="mt-4 text-lg text-rose-100/80 max-w-2xl mx-auto">
						Get answers to common questions about our platform and services.
					</p>
				</motion.div>

				<div className="space-y-4">
					{FAQ.map((faq, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="group"
						>
							<div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-rose-300/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-rose-300/30">
								<button
									onClick={() => toggleItem(i)}
									className="flex w-full justify-between items-center text-left p-6 focus:outline-none"
								>
									<span className="font-semibold text-white pr-4">
										{faq.question}
									</span>
									<motion.div
										animate={{ rotate: openItem === i ? 180 : 0 }}
										transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
										className="flex-shrink-0"
									>
										<ChevronDownIcon className="w-5 h-5 text-rose-300" />
									</motion.div>
								</button>

								<AnimatePresence>
									{openItem === i && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
											className="overflow-hidden"
										>
											<div className="px-6 pb-6 text-rose-100/80 leading-relaxed">
												{faq.answer}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
