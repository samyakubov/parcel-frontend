import React from "react"
import {useLocation} from "react-router"

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
	const location = useLocation()
	const showParcelPrefix = location.pathname === "/"
	return (
		<div className={containerClassName}>
			<div className="flex-1 relative">
				{showParcelPrefix && (
					<div className="absolute left-0 top-0 bottom-0 flex items-center px-3 pointer-events-none z-10 bg-white rounded-l-xl font-medium">
						<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400 bg-clip-text text-transparent animate-pulse">
                            Parcel/
						</span>
					</div>
				)}
				<input
					ref={props.ref}
					type="text"
					placeholder={placeholder}
					className={`${inputClassName} ${showParcelPrefix ? "pl-20" : ""}`}
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
