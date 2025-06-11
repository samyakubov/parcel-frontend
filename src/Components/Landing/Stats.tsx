import React from "react"
import { motion } from "framer-motion"
import { STATS } from "../../Constants/Constants"

export default function Stats() {
	return (
		<section className="relative py-24 sm:py-32 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
			</div>


			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium mb-6 backdrop-blur-sm">
						By the Numbers
					</div>
					<h2 className="pb-3 text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
						Trusted by Thousands
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
					{STATS.map((stat, index) => (
						<motion.div
							key={stat.id}
							initial={{ opacity: 0, scale: 0.5 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.8,
								delay: index * 0.2,
								ease: [0.32, 0.72, 0, 1]
							}}
							className="text-center group"
						>
							<div className="relative p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
								<motion.div
									className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4"
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true }}
									transition={{
										duration: 1,
										delay: index * 0.2 + 0.3,
										type: "spring",
										bounce: 0.5
									}}
								>
									{stat.value}
								</motion.div>
								<div className="text-lg font-medium text-blue-100 group-hover:text-white transition-colors">
									{stat.name}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(200)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [-20, -100, -20],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}
			</div>
		</section>
	)
}
