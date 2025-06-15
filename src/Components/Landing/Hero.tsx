import {animate, motion} from "framer-motion"
import AddressSearchWithAutoComplete from "../AddressSearchWithAutoComplete/AddressSearchWithAutoComplete"
import React, {useCallback} from "react"
import {ChevronDownIcon, MapPinIcon, SearchIcon} from "lucide-react"
import Header from "./Header"

export default function Hero() {
	const scrollDown = useCallback(async () => {
		const target = window.innerHeight * 0.8
		const start = window.scrollY
		await animate(start, target, {
			duration: 0.8,
			ease: [0.32, 0.72, 0, 1],
			onUpdate: (value) => {
				window.scrollTo(0, value)
			}
		})
	}, [])

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1
			}
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: [0.32, 0.72, 0, 1]
			}
		}
	}

	return (
		<div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
			</div>
			<Header/>
			<div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 pb-32 pt-28">
				<motion.div
					className="text-center space-y-12 max-w-6xl mx-auto"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>

					<motion.div variants={itemVariants} className="space-y-8 py-6">
						<h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight pb-2">
							<motion.span
								className="pb-3 block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent"
								initial={{ backgroundPosition: "0% 50%" }}
								animate={{ backgroundPosition: "100% 50%" }}
								transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
							>
								Every Deed,
							</motion.span>
							<motion.span
								className="pb-3 block bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300 bg-clip-text text-transparent"
								initial={{ backgroundPosition: "100% 50%" }}
								animate={{ backgroundPosition: "0% 50%" }}
								transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
							>
								Every Detail
							</motion.span>
						</h1>

						<motion.p
							className="text-xl sm:text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed font-light"
							variants={itemVariants}
						>
							Unlock the complete story behind every NYC property. From ownership history to market insights.
						</motion.p>
					</motion.div>

					<motion.div variants={itemVariants} className="w-full max-w-3xl mx-auto">
						<div className="relative group">
							<div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
							<div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
								<div className="flex items-center gap-3 mb-6">
									<div className="p-2 bg-blue-500/20 rounded-lg">
										<SearchIcon className="w-5 h-5 text-blue-300" />
									</div>
									<h3 className="text-white font-semibold text-lg">Your search starts here:</h3>
								</div>

								<div className="space-y-4">
									<AddressSearchWithAutoComplete />
									<div className="flex items-center justify-center gap-4 text-sm">
										<span className="text-blue-200/70">or</span>
										<a
											href="/search"
											className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-medium transition-colors"
										>
											<MapPinIcon className="w-4 h-4" />
											Search by owner name
										</a>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>

				<motion.button
					onClick={scrollDown}
					className="absolute bottom-12 p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
					animate={{
						y: [0, 12, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut"
					}}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					<ChevronDownIcon className="h-6 w-6 text-white group-hover:text-blue-200 transition-colors" />
				</motion.button>

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
			</div>
		</div>
	)
}
