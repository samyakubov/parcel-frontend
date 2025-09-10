"use client"
import React from "react"
import { Minus } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface MinimizeButtonProps {
    onMinimize?: () => void
}

export default function MinimizeButton ({ onMinimize }: MinimizeButtonProps) {
	if (!onMinimize) return null

	return (
		<Button
			asChild
			size="icon"
			variant="ghost"
			aria-label="Minimize window"
		>
			<motion.div
				onClick={onMinimize}
				whileHover={{ scale: 1.05, y: -1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.15 }}
			>
				<Minus size={16} />
			</motion.div>
		</Button>
	)
}
