"use client"
import React from "react"
import { ChevronDown, HardHat } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface JobsHeaderProps {
	isExpanded: boolean;
	setIsExpanded: (isExpanded: boolean) => void;
	jobCount: number;
}

export default function JobsHeader({ isExpanded, setIsExpanded, jobCount }: JobsHeaderProps) {
	return (
		<Button
			variant="ghost"
			className="w-full justify-between p-0 h-auto hover:bg-transparent"
			onClick={() => setIsExpanded(!isExpanded)}
		>
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900
				 transition-colors group-hover:bg-green-200 dark:group-hover:bg-green-800">
					<HardHat className="h-6 w-6 text-green-600 dark:text-green-400" />
				</div>
				<h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
					Job Filings ({jobCount})
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
