import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/explicit-function-return-type
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

