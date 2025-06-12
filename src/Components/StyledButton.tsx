import React from "react"

interface ButtonProps {
	text: string
	onClick?: () => void
	type?: "button" | "submit" | "reset"
	disabled?: boolean
	className?: string
}

export default function StyledButton({
	text,
	onClick,
	type = "button",
	disabled = false,
	className = ""
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
		>
			{text}
		</button>
	)
}
