"use client"

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
	tooltipTrigger: React.ReactNode
	tooltipContent: React.ReactNode
	contentSide?: "bottom" | "top" | "right" | "left" | undefined
	noAnimation?: boolean
	className?: string
}

export default function CustomTooltip(props: Props): React.ReactNode {
	const { tooltipTrigger, tooltipContent, contentSide, noAnimation, className } = props

	const animationClasses = noAnimation
		? "opacity-100! scale-100! translate-x-0! translate-y-0! transition-none! duration-0! animate-none! " +
        "data-[state=closed]:opacity-100! data-[state=closed]:scale-100! " +
        "data-[state=closed]:translate-x-0! data-[state=closed]:translate-y-0!"
		: ""

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					{tooltipTrigger}
				</TooltipTrigger>
				<TooltipContent side={contentSide} className={animationClasses + " " + className}>
					{tooltipContent}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
