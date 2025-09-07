import isUndefined from "lodash-es/isUndefined"
import {motion} from "framer-motion"
import {Maximize2, Minimize2} from "lucide-react"
import React from "react"

interface ExpandModalButtonProps {
    isExpanded?: boolean
    setIsExpanded?: (isExpanded: boolean) => void
    isExpandable: boolean
}

export default function ExpandModalButton(props: ExpandModalButtonProps) {
	const {isExpanded, setIsExpanded, isExpandable} = props

	if (!isExpandable || isUndefined(setIsExpanded)) return null

	return (
		<motion.button
			onClick={() => setIsExpanded(!isExpanded)}
			// className={""}
			aria-label={isExpanded ? "Restore" : "Maximize"}
			whileHover={{ scale: 1.05, y: -1 }}
			whileTap={{ scale: 0.95 }}
			transition={{ duration: 0.15 }}
		>
			{isExpanded ? (
				<Minimize2 size={16} />
			) : (
				<Maximize2 size={16} />
			)}
		</motion.button>
	)
}
