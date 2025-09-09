"use client"
import React from "react"
import { motion } from "framer-motion"
import { Maximize2, Minimize2 } from "lucide-react"
import isUndefined from "lodash-es/isUndefined"
import { Button } from "@/components/ui/button"

interface ExpandModalButtonProps {
    isExpanded?: boolean
    setIsExpanded?: (isExpanded: boolean) => void
    isExpandable: boolean
}

export default function ExpandModalButton(props: ExpandModalButtonProps) {
	const { isExpanded, setIsExpanded, isExpandable } = props

	if (!isExpandable || isUndefined(setIsExpanded)) return null

	return (
		<Button
			asChild
			size="icon"
			variant="ghost"
			aria-label={isExpanded ? "Restore" : "Maximize"}
		>
			<motion.div
				onClick={() => setIsExpanded(!isExpanded)}
				whileHover={{ scale: 1.05, y: -1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.15 }}
			>
				{isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
			</motion.div>
		</Button>
	)
}
