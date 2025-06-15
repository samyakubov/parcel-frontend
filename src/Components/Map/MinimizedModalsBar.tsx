import React from "react"
import { observer } from "mobx-react"
import { X, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {modalStore} from "../../Stores/ModalStore"

interface MinimizedModalsBarProps {
	isRelatedPropertyBar?: boolean;
	position?: string;
}

function MinimizedModalsBar({isRelatedPropertyBar = false, position = "bottom-4 left-20" }: MinimizedModalsBarProps) {

	const minimizedModals = isRelatedPropertyBar
		? modalStore.relatedPropertyModals.filter(modal => modal.isMinimized)
		: modalStore.propertyModals.filter(modal => modal.isMinimized)

	if (minimizedModals.length === 0) {
		return null
	}

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				when: "beforeChildren",
				staggerChildren: 0.1
			}
		},
		exit: {
			opacity: 0,
			y: 20,
			transition: {
				duration: 0.2
			}
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 10, scale: 0.9 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200
			}
		},
		exit: {
			opacity: 0,
			y: 10,
			scale: 0.9,
			transition: {
				duration: 0.2
			}
		}
	}

	const handleRestore = (id: string) => {
		isRelatedPropertyBar
			? modalStore.restoreModal(id, true)
			: modalStore.restoreModal(id, false)
	}

	const handleClose = (id: string) => {
		isRelatedPropertyBar
			? modalStore.closeModal(id, true)
			: modalStore.closeModal(id, false)
	}

	return (
		<AnimatePresence>
			<motion.div
				key={isRelatedPropertyBar ? "minimized-related-bar" : "minimized-bar"}
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				className={`fixed ${position} flex flex-wrap gap-3 max-w-screen-lg z-50`}
			>
				{minimizedModals.map(modal => (
					<motion.div
						key={modal.id}
						className="group relative"
						variants={itemVariants}
					>
						<motion.button
							whileHover={{ scale: 1.1, y: -1 }}
							whileTap={{ scale: 0.95 }}
							className="absolute -top-2 -right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl
                shadow-lg border border-red-200/60 dark:border-red-800/60
                hover:bg-red-50/90 dark:hover:bg-red-900/50 hover:border-red-300 dark:hover:border-red-700
                hover:shadow-red-500/20 dark:hover:shadow-red-500/30 transition-all duration-200 z-10
                opacity-0 group-hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-red-500/50"
							onClick={() => handleClose(modal.id)}
							aria-label="Close modal"
						>
							<X size={12} className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" />
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.1, y: -1 }}
							whileTap={{ scale: 0.95 }}
							className="absolute -top-2 -left-2 p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl
                shadow-lg border border-blue-200/60 dark:border-blue-800/60
                hover:bg-blue-50/90 dark:hover:bg-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700
                hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 transition-all duration-200 z-10
                opacity-0 group-hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-blue-500/50"
							onClick={() => handleRestore(modal.id)}
							aria-label="Restore modal"
						>
							<Maximize2 size={12} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" />
						</motion.button>

						<motion.div
							className="flex items-center pl-3 pr-4 py-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl
                shadow-xl hover:shadow-2xl border border-slate-200/60 dark:border-gray-700/60
                hover:bg-white/90 dark:hover:bg-gray-800/90 hover:border-slate-300/60 dark:hover:border-gray-600/60
                transition-all duration-300 group-hover:scale-105"
						>
							<span className="text-gray-900 dark:text-gray-100 text-sm font-semibold truncate max-w-[140px]">
								{modal.title}
							</span>
						</motion.div>
					</motion.div>
				))}
			</motion.div>
		</AnimatePresence>
	)
}

export default observer(MinimizedModalsBar)
