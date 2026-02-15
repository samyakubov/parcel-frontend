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
			className="group relative flex-shrink-0"
		>
			<MinimizedModalActions modal={modal} />

			<motion.div
				className="flex items-center pl-3 pr-4 py-2.5
				min-w-[120px] min-h-[48px] md:min-w-0 md:min-h-0
				bg-card/80 backdrop-blur-sm rounded-2xl
                shadow-xl hover:shadow-2xl border border-border/60
                hover:bg-card/90 hover:border-border
                transition-all duration-300 group-hover:scale-105
                motion-reduce:transition-none motion-reduce:group-hover:scale-100"
				style={{
					willChange: "transform"
				}}
			>
				<span className="text-card-foreground text-sm font-semibold truncate max-w-[140px]">
					{modal.title}
				</span>
			</motion.div>
		</motion.div>
	)
}
