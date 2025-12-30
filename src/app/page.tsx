"use client"
import useInitMap from "@/hooks/mapbox/map/use-init-map"
import ModalContainer from "@/components/modal/modal-container"
import MinimizedModalsBar from "@/components/minimized-modal-bar"
import SearchPanel from "@/components/address-search-bar/search-panel"
import useFlyTo from "@/hooks/mapbox/map/fly-to"
import {useEffect} from "react"
import {mapStore} from "@/stores/map-store"
import {reaction} from "mobx"

export default function Map() {
	useInitMap("map")
	const flyTo = useFlyTo()

	useEffect(() => {
		const dispose = reaction(
			() => mapStore._coords,
			(coords:Coordinates | null) => {
				if (coords) {
					flyTo()
					mapStore.setMarker(coords.longitude, coords.latitude)
				}
			}
		)

		return () => dispose()
	}, [flyTo])
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
