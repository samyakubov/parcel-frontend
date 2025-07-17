import React from "react"

interface SearchHeaderProps {
	handleSearch?: () => void;
	onQueryChange: (query: string) => void;
	query: string;
	containerClassName?: string;
	inputClassName?: string;
	placeholder?: string;
	disabled?: boolean;
	ref?: React.RefObject<HTMLInputElement>;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchBar(props: SearchHeaderProps) {
	const { placeholder, query, onQueryChange, handleSearch, containerClassName, inputClassName, disabled } = props
	return (
		<div className={containerClassName}>
			<div className="flex-1 relative">
				<input
					ref={props.ref}
					type="text"
					placeholder={placeholder}
					className={`${inputClassName}`}
					value={query}
					onChange={(e) => {
						onQueryChange(e.target.value)
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" && handleSearch) {
							handleSearch()
						}
					}}
					disabled={disabled}
				/>
			</div>
		</div>
	)
}
