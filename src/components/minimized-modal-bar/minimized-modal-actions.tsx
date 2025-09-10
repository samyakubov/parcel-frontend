"use client"
import {motion} from "framer-motion"
import {modalStore} from "@/stores/modal-store"
import {Maximize2, X} from "lucide-react"
import React from "react"

interface MinimizedModalActionsProps {
    modal: PropertyModal
}

export default function MinimizedModalActions({ modal }: MinimizedModalActionsProps) {
	return (
		<>
			<motion.button
				whileHover={{ scale: 1.1, y: -1 }}
				whileTap={{ scale: 0.95 }}
				className="absolute -top-2 -right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl
                shadow-lg border border-red-200/60 dark:border-red-800/60
                hover:bg-red-50/90 dark:hover:bg-red-900/50 hover:border-red-300 dark:hover:border-red-700
                hover:shadow-red-500/20 dark:hover:shadow-red-500/30 transition-all duration-200 z-10
                opacity-0 group-hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-red-500/50"
				onClick={() => modalStore.closeModal(modal.id)}
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
				onClick={() => modalStore.restoreModal(modal.id)}
				aria-label="Restore modal"
			>
				<Maximize2 size={12} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" />
			</motion.button>
		</>
	)
}