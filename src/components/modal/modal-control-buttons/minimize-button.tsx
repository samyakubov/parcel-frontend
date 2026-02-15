"use client"
import React from "react"
import { Minus } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {modalStore} from "@/stores/modal-store"

interface MinimizeButtonProps {
	currentModal: PropertyModal
}

export default function MinimizeButton ({ currentModal }: MinimizeButtonProps) {
	return (
		<Button
			asChild
			size="icon"
			variant="ghost"
			aria-label="Minimize window"
			className="w-11 h-11 md:w-10 md:h-10"
		>
			<motion.div
				onClick={()=>modalStore.minimizeModal(currentModal.id)}
				whileHover={{ scale: 1.05, y: -1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.15 }}
			>
				<Minus size={16} />
			</motion.div>
		</Button>
	)
}
