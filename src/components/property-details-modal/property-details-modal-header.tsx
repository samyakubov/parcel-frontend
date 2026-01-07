"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { modalStore } from "@/stores/modal-store"
import { Copy, Check } from "lucide-react"
import {handleCopy} from "@/utils/handle-copy"

interface PropertyDetailsModalHeaderProps {
	modal: PropertyModal;
}

export default function PropertyDetailsModalHeader({ modal }: PropertyDetailsModalHeaderProps) {
	const [copied, setCopied] = useState(false)

	return (
		<motion.div
			layout="preserve-aspect"
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
			className="flex-none flex items-center gap-4 p-5 bg-gradient-to-r from-primary/5 via-transparent to-transparent
           border-b border-border/50 backdrop-blur-sm cursor-pointer"
			onClick={() => modalStore.focusModal(modal.id)}
		>
			<div
				className={`gap-2 px-3 py-1.5 rounded-xl ${
					copied
						? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
						: "bg-muted hover:bg-primary/10 text-foreground cursor-pointer hover:shadow-sm"
				}`}
			>
				<a
					target="_blank"
					rel="noopener noreferrer"
					className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300 group"
					href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?
					boro=${modal.propertyData.records[0].bbl[0]}
					&block=${modal.propertyData.records[0].prop_block}
					&lot=${modal.propertyData.records[0].prop_lot}`}
				>
				   <span className="group-hover:underline underline-offset-4 decoration-primary/50">
					  {modal.title}
				   </span>
				</a>
				<button
					onClick={async (e) => {
						await handleCopy(e, modal.title)
						setCopied(true)
						setTimeout(() => setCopied(false), 2000)
					}}
					className={`
						  flex-none p-1 rounded transition-all duration-200
						  ${copied
							? "text-green-700 dark:text-green-400"
							: "text-muted-foreground hover:text-primary"}`}
					aria-label="Copy title">
					{copied ? (
						<Check className="w-4 h-4" />
					) : (
						<Copy className="w-4 h-4" />
					)}
				</button>
			</div>
		</motion.div>
	)
}
