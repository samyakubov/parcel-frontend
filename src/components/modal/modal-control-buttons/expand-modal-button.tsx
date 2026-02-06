"use client"
import React from "react"
import { motion } from "framer-motion"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {modalStore} from "@/stores/modal-store"

interface ExpandModalButtonProps {
	currentModal: PropertyModal
}

export default function ExpandModalButton({ currentModal }: ExpandModalButtonProps) {
	return (
		<Button
			asChild
			size="icon"
			variant="ghost"
			aria-label={currentModal?.isExpanded ? "Restore" : "Maximize"}
		>
			<motion.div
				onClick={() => modalStore.toggleModalExpand(currentModal.id)}
				whileHover={{ scale: 1.05, y: -1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.15 }}
			>
				{currentModal?.isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
			</motion.div>
		</Button>
	)
}
