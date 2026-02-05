"use client"
import {motion} from "framer-motion"
import React from "react"
import MinimizedModalActions from "@/components/minimized-modal-bar/minimized-modal-actions"

interface MinimizedModalProps {
	modal: PropertyModal
}

export default function MinimizedModal(props: MinimizedModalProps) {
	const {modal} = props

	return (
		<motion.div
			key={modal.id}
			className="group relative"
		>
			<MinimizedModalActions modal={modal} />

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
	)
}
