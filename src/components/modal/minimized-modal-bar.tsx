"use client"
import React from "react"
import { observer } from "mobx-react"
import { X, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {modalStore} from "@/stores/modal-store"


function MinimizedModalsBar() {
	const minimizedModals = modalStore._propertyModals.filter(modal => modal.isMinimized)

	if (minimizedModals.length === 0) {
		return null
	}

	return (
		<AnimatePresence>
			<motion.div
				key={"minimized-bar"}
				initial="hidden"
				animate="visible"
				exit="exit"
				className="minimized-modals-bar"
			>
				{minimizedModals.map(modal => (
					<motion.div
						key={modal.id}
						className="minimized-modal-wrapper"
					>
						<motion.button
							whileHover={{ scale: 1.1, y: -1 }}
							whileTap={{ scale: 0.95 }}
							className="minimized-modal-btn minimized-modal-btn--close"
							onClick={() => modalStore.closeModal(modal.id)}
							aria-label="Close modal"
						>
							<X size={12} className="minimized-modal-btn-icon--close" />
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.1, y: -1 }}
							whileTap={{ scale: 0.95 }}
							className="minimized-modal-btn minimized-modal-btn--restore"
							onClick={() => modalStore.restoreModal(modal.id)}
							aria-label="Restore modal"
						>
							<Maximize2 size={12} className="minimized-modal-btn-icon--restore"/>
						</motion.button>

						<motion.div className="minimized-modal-card">
							<span className="minimized-modal-title">
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
