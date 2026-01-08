"use client"
import useInitMap from "@/hooks/mapbox/map/use-init-map"
import ModalContainer from "@/components/modal/modal-container"
import MinimizedModalsBar from "@/components/minimized-modal-bar/minimized-modal-bar"
import SearchPanel from "@/components/address-search-bar/search-panel"
import useFlyTo from "@/hooks/mapbox/map/fly-to"
import { useEffect, useState } from "react"
import { mapStore } from "@/stores/map-store"
import { reaction } from "mobx"
import ThemeToggle from "@/components/theme-toggle"
import MapStyleSwitcher from "@/components/map-style-switcher"
import { MAP_STYLES, MapStyle } from "@/constants/mapbox"
import AiChatbot from "@/components/ai-chatbot/ai-chatbot"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function Map() {
	const mapRef = useInitMap("map", "satellite")

	const setMapStyle = (style: MapStyle) => {
		if (mapRef.current) {
			mapRef.current.setStyle(MAP_STYLES[style])

			mapRef.current.once("styledata", () => {
				const map = mapRef.current
				if (!map) return

				const layersToHide = ["poi-label", "poi-label-park", "transit-label"]
				layersToHide.forEach(layerId => {
					if (map.getLayer(layerId)) {
						map.setLayoutProperty(layerId, "visibility", "none")
					}
				})
			})
		}
	}

	const flyTo = useFlyTo()

	useEffect(() => {
		const dispose = reaction(
			() => mapStore._coords,
			(coords: Coordinates | null) => {
				if (coords) {
					flyTo()
					mapStore.setMarker(coords.longitude, coords.latitude)
				}
			}
		)

		return () => dispose()
	}, [flyTo])

	const [isChatOpen, setIsChatOpen] = useState(false)

	return (
		<div className="flex w-full h-screen">
			<div className="relative flex-1 h-full">
				<div id="map" className="w-full h-full" />

				<div className="absolute top-4 left-4 z-10">
					<SearchPanel />
				</div>

				<div className="absolute top-4 right-4 z-10">
					<MapStyleSwitcher onStyleChange={setMapStyle} />
				</div>

				<ModalContainer />
				<MinimizedModalsBar />

				<div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
					<Button
						size="icon"
						onClick={() => setIsChatOpen(!isChatOpen)}
						className="h-10 w-10"
					>
						<MessageCircle size={20} />
					</Button>
					<ThemeToggle />
				</div>
			</div>

			<AiChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
		</div>
	)
}
