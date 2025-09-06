"use client"
import useInitMap from "@/hooks/mapbox/map/use-init-map"

export default function Map() {
	useInitMap("map")
	return (
		<div className="relative w-full h-screen">
			<div id="map" className="w-full h-full" />
		</div>
	)
}
