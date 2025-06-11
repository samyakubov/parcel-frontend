import {useCallback} from "react"


export function useIsMaintenanceWindow() {
	return useCallback(() => {
		const now = new Date()
		const isLastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() === now.getDate()
		const hour = now.getHours()
		return isLastDayOfMonth && hour >= 2 && hour < 6
	}, [])
}
