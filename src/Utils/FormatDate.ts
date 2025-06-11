import {format} from "date-fns"

export const formatDate = (date: string): string => {
	try {
		const parsedDate = new Date(date)
		return format(parsedDate, "MMMM d, yyyy")
	} catch {
		return date
	}
}
