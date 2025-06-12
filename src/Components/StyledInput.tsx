import React from "react"

interface StyledInputProps {
	labelCss?: string;
	inputContainerCss?: string;
	inputCss?: string;
	label?: string;
	type: "email" | "password";
	id: string;
	name: string;
	placeholder?: string;
	required?: boolean;
	autoComplete?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function StyledInput({
	labelCss = "block text-sm/6 font-medium text-gray-900 dark:text-white",
	inputContainerCss = "mt-2",
	inputCss = "block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:focus:outline-indigo-500 sm:text-sm/6 transition-all duration-300",
	label,
	type,
	id,
	name,
	placeholder = "",
	required = false,
	autoComplete,
	onChange,
	onKeyDown
}: StyledInputProps) {
	return (
		<div>
			<label htmlFor={id} className={labelCss}>
				{label}
			</label>
			<div className={inputContainerCss}>
				<input
					id={id}
					name={name}
					type={type}
					placeholder={placeholder}
					required={required}
					autoComplete={autoComplete}
					className={inputCss}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
			</div>
		</div>
	)
}
