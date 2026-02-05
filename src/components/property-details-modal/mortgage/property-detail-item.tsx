"use client"
import React, {useState} from "react"
import {handleCopy} from "@/utils/handle-copy"
import {Check, Copy} from "lucide-react"

interface PropertyDetailItemProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	enableCopy?: boolean;
}

export default function PropertyDetailItem({ icon, label, value, enableCopy }: PropertyDetailItemProps) {
	const [copied, setCopied] = useState(false)

	const handleClick = async (e: React.MouseEvent) => {
		if (enableCopy) {
			await handleCopy(e, value)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

	return (
		<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
			<div className="p-2 rounded-full bg-muted">
				{icon}
			</div>
			<div className="flex-1 min-w-0">
				<div className="text-sm font-medium text-muted-foreground mb-1">
					{label}
				</div>
				{enableCopy ? (
					<div
						onClick={handleClick}
						className={`
                      inline-flex items-center gap-2 px-3 py-1.5 rounded-md
                      text-sm font-semibold
                      transition-all duration-200
                      ${copied
						? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
						: "bg-muted hover:bg-primary/10 text-foreground cursor-pointer hover:shadow-sm"
					}
                      border border-transparent hover:border-primary/20
                      max-w-full
                   `}
					>
						{copied ? (
							<Check className="w-3.5 h-3.5 flex-shrink-0" />
						) : (
							<Copy className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
						)}
						<span className="truncate">{value}</span>
					</div>
				) : (
					<div className="text-sm font-semibold text-foreground">
						{value}
					</div>
				)}
			</div>
		</div>
	)
}
