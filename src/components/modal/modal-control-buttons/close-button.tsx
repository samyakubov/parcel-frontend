"use client"
import React from "react"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {modalStore} from "@/stores/modal-store"

interface CloseButtonProps {
    currentModal: PropertyModal
}

export default function CloseButton({ currentModal }: CloseButtonProps) {
	return (
		<Button
			asChild
			size="icon"
			variant="ghost"
			aria-label="Close modal"
		>
			<motion.div
				onClick={()=>modalStore.closeModal(currentModal.id)}
				whileHover={{ scale: 1.05, y: -1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.15 }}
			>
				<X size={16} />
			</motion.div>
		</Button>
	)
}
