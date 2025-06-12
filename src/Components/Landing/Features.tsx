import React from "react"
import { motion } from "framer-motion"
import { FEATURES } from "../../Constants/Constants"

export default function Features() {
	return (
		<section className="relative py-24 sm:py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-400/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
			</div>

			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(236,72,153,0.1)_1px,transparent_0)] bg-[size:50px_50px]" />

			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="mx-auto max-w-2xl text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-500/20 border border-fuchsia-400/30 rounded-full text-fuchsia-200 text-sm font-medium mb-6 backdrop-blur-sm">
						Features
					</div>
					<h2 className="pb-3 text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-fuchsia-100 to-pink-100 bg-clip-text text-transparent">
						Everything You Need
					</h2>
					<p className="mt-4 text-lg text-fuchsia-100/80">
						Powerful tools and insights to make property research effortless and comprehensive.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{FEATURES.map((feature, index) => (
						<motion.div
							key={feature.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="group relative"
						>
							<div className="relative h-full p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-fuchsia-300/20 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-fuchsia-300/30">
								<div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-pink-500/20 to-rose-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 p-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
										<feature.icon className="h-6 w-6 text-white" />
									</div>
									<div>
										<h3 className="font-semibold text-white mb-2 group-hover:text-fuchsia-200 transition-colors">
											{feature.name}
										</h3>
										<p className="text-fuchsia-100/80 leading-relaxed">
											{feature.description}
										</p>
									</div>
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
