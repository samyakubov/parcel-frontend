import React from "react"

interface StyledDropdownProps {
    options: string[];
    value?: string | number;
    onChange?: (value: string) => void;
    className?: string;
}

export default function StyledDropdown({ options, value, onChange, className }: StyledDropdownProps) {
	return (
		<div className="relative">
			<select
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 transition-all duration-300 ${className}`}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	)
}

