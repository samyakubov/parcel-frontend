"use client"
import useInitMap from "@/hooks/mapbox/map/use-init-map"
import ModalContainer from "@/components/modal/modal-container"
import MinimizedModalsBar from "@/components/minimized-modal-bar"
import SearchPanel from "@/components/address-search-bar/search-panel"
import useGetNearbyRoutes from "@/hooks/public-transit/use-get-nearby-routes"
import {useEffect} from "react"
import {mapStore} from "@/stores/map-store"

export default function Map() {
	useInitMap("map")
	const getNearbyRoutes = useGetNearbyRoutes()

	useEffect(() => {
		getNearbyRoutes()
	}, [mapStore._coords, getNearbyRoutes])


	return (
		<div className="relative w-full h-screen">
			<div className="absolute top-4 left-4 z-10">
				<SearchPanel />
			</div>

			<ModalContainer />
			<MinimizedModalsBar />

			<div id="map" className="w-full h-full" />
		</div>
	)
}
