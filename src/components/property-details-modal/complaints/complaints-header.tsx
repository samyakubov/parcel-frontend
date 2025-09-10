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
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 t
				transition-colors group-hover:bg-amber-200 dark:group-hover:bg-amber-800">
					<AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
				</div>
				<h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
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
