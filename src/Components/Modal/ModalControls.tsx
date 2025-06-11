import React from "react"
import { Maximize2, Minimize2, Minus, X } from "lucide-react"
import isUndefined from "lodash-es/isUndefined"
import { motion } from "framer-motion"

interface ModalControlsProps {
	isExpandable?: boolean;
	isExpanded?: boolean;
	setIsExpanded?: (isExpanded: boolean) => void;
	onClose: () => void;
	onMinimize?: () => void;
	className?: string;
}

const baseButtonClasses = "p-2 rounded-xl backdrop-blur-sm flex items-center justify-center transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 border"

const buttonStyles = {
	minimize: `${baseButtonClasses} bg-white/80 dark:bg-gray-800/80 border-amber-200/60 dark:border-amber-800/60
      hover:bg-amber-50/90 dark:hover:bg-amber-900/50 hover:border-amber-300 dark:hover:border-amber-700
      text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300
      hover:shadow-amber-500/20 dark:hover:shadow-amber-500/30 focus:ring-amber-500/50`,

	expand: `${baseButtonClasses} bg-white/80 dark:bg-gray-800/80 border-blue-200/60 dark:border-blue-800/60
      hover:bg-blue-50/90 dark:hover:bg-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700
      text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300
      hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 focus:ring-blue-500/50`,

	close: `${baseButtonClasses} bg-white/80 dark:bg-gray-800/80 border-red-200/60 dark:border-red-800/60
      hover:bg-red-50/90 dark:hover:bg-red-900/50 hover:border-red-300 dark:hover:border-red-700
      text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300
      hover:shadow-red-500/20 dark:hover:shadow-red-500/30 focus:ring-red-500/50`
}

export default function ModalControls({isExpandable = false, isExpanded, setIsExpanded, onClose, onMinimize, className = ""}: ModalControlsProps) {
	const renderExpandButton = () => {
		if (!isExpandable || isUndefined(setIsExpanded)) return null

		return (
			<motion.button
				onClick={() => setIsExpanded(!isExpanded)}
				className={buttonStyles.expand}
				aria-label={isExpanded ? "Restore" : "Maximize"}
				whileHover={{ scale: 1.05, y: -1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.15 }}
			>
				{isExpanded ? (
					<Minimize2 size={16} />
				) : (
					<Maximize2 size={16} />
				)}
			</motion.button>
		)
	}

	return (
		<div className={`flex items-center gap-3 ${className}`}>
			{onMinimize && (
				<motion.button
					onClick={onMinimize}
					className={buttonStyles.minimize}
					aria-label="Minimize window"
					whileHover={{ scale: 1.05, y: -1 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.15 }}
				>
					<Minus size={16} />
				</motion.button>
			)}

			{renderExpandButton()}

			<motion.button
				onClick={onClose}
				className={buttonStyles.close}
				aria-label="Close modal"
				whileHover={{ scale: 1.05, y: -1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.15 }}
			>
				<X size={16} />
			</motion.button>
		</div>
	)
}
