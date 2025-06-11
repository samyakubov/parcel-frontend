import { useCallback } from "react"
import { useNavigate } from "react-router"

export default function useTypedNavigate (): (route: PageNames) => void {
	const navigate = useNavigate()

	return useCallback((route: PageNames): void => {
		void navigate(route)
	}, [navigate])
}
