"use client"
import React from "react"
import { observer } from "mobx-react"
import { motion, AnimatePresence } from "framer-motion"
import { modalStore } from "@/stores/modal-store"
import MinimizedModal from "@/components/minimized-modal-bar/minimized-modal"

function MinimizedModalsBar() {
	const minimizedModals = modalStore._propertyModals.filter(modal => modal.isMinimized)

	if (minimizedModals.length === 0) {
		return null
	}

	return (
		<AnimatePresence>
			<motion.div
				key="minimized-bar"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{
					duration: 0.25,
					ease: "easeOut"
				}}
				className="fixed bottom-0 left-0 right-0 md:bottom-4 md:left-1/2 md:right-auto md:-translate-x-1/2
					z-30 flex gap-2 px-4 py-2
					safe-area-bottom
					overflow-x-auto md:overflow-x-visible
					md:max-w-screen-xl
					motion-reduce:transition-none"
				style={{
					willChange: minimizedModals.length > 0 ? "transform, opacity" : "auto"
				}}
			>
				{minimizedModals.map((modal, index) => (
					<MinimizedModal modal={modal} key={index}/>
				))}
			</motion.div>
		</AnimatePresence>
	)
}

export default observer(MinimizedModalsBar)
