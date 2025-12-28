"use client"
import React from "react"
import { AlertCircle, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ComplaintsHeaderProps {
	isExpanded: boolean;
	setIsExpanded: (isExpanded: boolean) => void;
	complaintsCount: number;
}

export default function ComplaintsHeader({ isExpanded, setIsExpanded, complaintsCount }: ComplaintsHeaderProps) {
	return (
		<Button
			variant="ghost"
			className="w-full justify-between p-0 h-auto hover:bg-transparent"
			onClick={() => setIsExpanded(!isExpanded)}
		>
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100/80 dark:bg-amber-900/50
			transition-colors shadow-sm">
					<AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
				</div>
				<h3 className="text-base font-semibold text-amber-700 dark:text-amber-300">
					Complaints ({complaintsCount})
				</h3>
			</div>
			<motion.div
				initial={false}
				animate={{ rotate: isExpanded ? 180 : 0 }}
				transition={{ duration: 0.2 }}
			>
				<ChevronDown className="h-5 w-5 text-muted-foreground" />
			</motion.div>
		</Button>
	)
}
