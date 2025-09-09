"use client"
import React from "react"
import { observer } from "mobx-react"
import { X, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { modalStore } from "@/stores/modal-store"

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
				className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 bg-background/80 backdrop-blur-sm
				border rounded-lg shadow-lg max-w-screen-xl overflow-x-auto"
			>
				<TooltipProvider>
					{minimizedModals.map((modal, index) => (
						<motion.div
							key={modal.id}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ delay: index * 0.1 }}
							className="flex items-center gap-1"
						>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
										onClick={() => modalStore.closeModal(modal.id)}
										aria-label="Close modal"
									>
										<motion.div
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<X size={12} />
										</motion.div>
									</Button>
								</TooltipTrigger>
								<TooltipContent side="top">
									<p>Close modal</p>
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="h-6 w-6 p-0 hover:bg-primary/20 hover:text-primary"
										onClick={() => modalStore.restoreModal(modal.id)}
										aria-label="Restore modal"
									>
										<motion.div
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<Maximize2 size={12} />
										</motion.div>
									</Button>
								</TooltipTrigger>
								<TooltipContent side="top">
									<p>Restore modal</p>
								</TooltipContent>
							</Tooltip>

							<Card className="px-3 py-1.5 bg-card/50 hover:bg-card transition-colors cursor-pointer border-border/50"
								onClick={() => modalStore.restoreModal(modal.id)}>
								<motion.span
									className="text-xs font-medium text-foreground/80 truncate max-w-32 block"
									whileHover={{ scale: 1.02 }}
									title={modal.title}
								>
									{modal.title}
								</motion.span>
							</Card>
						</motion.div>
					))}
				</TooltipProvider>
			</motion.div>
		</AnimatePresence>
	)
}

export default observer(MinimizedModalsBar)
