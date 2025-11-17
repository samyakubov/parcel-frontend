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
				className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 max-w-screen-xl overflow-x-auto"
			>
				{minimizedModals.map((modal) => (
					<MinimizedModal modal={modal} key={modal.id}/>
				))}
			</motion.div>
		</AnimatePresence>
	)
}

export default observer(MinimizedModalsBar)
