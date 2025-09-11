"use client"
import React from "react"
import { ChevronDown, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ViolationsHeaderProps {
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;
    violationsCount: number;
}

export default function ViolationsHeader ({ isExpanded, setIsExpanded, violationsCount }: ViolationsHeaderProps) {
	return (
		<Button
			variant="ghost"
			className="w-full justify-between p-0 h-auto hover:bg-transparent"
			onClick={() => setIsExpanded(!isExpanded)}
		>
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900
				transition-colors group-hover:bg-red-200 dark:group-hover:bg-red-800">
					<AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
				</div>
				<h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
					Violations ({violationsCount})
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
