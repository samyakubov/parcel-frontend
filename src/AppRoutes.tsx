import React, {useEffect} from "react"
import {Routes, Route} from "react-router"
import Missing from "./Pages/Missing"
import Map from "./Pages/Map"
import Search from "./Pages/Search"
import DatabaseUpdating from "./Pages/DatabaseUpdating"
import {useIsMaintenanceWindow} from "./Hooks/useIsMaintenanceWindow"
import useTypedNavigate from "./Hooks/useTypedNavigate"
import Analytics from "./Pages/Analytics"

export default function AppRoutes() {
	const isMaintenanceWindow = useIsMaintenanceWindow()
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (!isMaintenanceWindow()) return
		navigate("/database-updating")
	}, [isMaintenanceWindow, navigate])

	return (
		<Routes>
			<Route path="/" element={<Map />} />
			<Route path="/search" element={<Search />} />
			<Route path="/database-updating" element={<DatabaseUpdating /> } />
			<Route path="/analytics" element={<Analytics />} />
			<Route path="*" element={<Missing />} />
		</Routes>
	)
}
