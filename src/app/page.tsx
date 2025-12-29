"use client"
import useInitMap from "@/hooks/mapbox/map/use-init-map"
import ModalContainer from "@/components/modal/modal-container"
import MinimizedModalsBar from "@/components/minimized-modal-bar"
import SearchPanel from "@/components/address-search-bar/search-panel"
import RouteControlsContainer from "@/components/route-controls/route-controls-container"

export default function Map() {
	useInitMap("map")
	return (
		<div className="relative w-full h-screen">
			<div className="absolute top-4 left-4 z-20 max-w-[calc(100vw-2rem)] sm:max-w-md">
				<SearchPanel />
			</div>

			<ModalContainer />

			<MinimizedModalsBar />

			<RouteControlsContainer />

			<div id="map" className="w-full h-full" />
		</div>
	)
}
