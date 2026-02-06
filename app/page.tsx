"use client"
import useInitMap from "@/hooks/mapbox/map/use-init-map"
import ModalContainer from "@/components/modal/modal-container"
import MinimizedModalsBar from "@/components/minimized-modal-bar/minimized-modal-bar"
import SearchPanel from "@/components/address-search-bar/search-panel"
import useFlyTo from "@/hooks/mapbox/map/fly-to"
import { useEffect, useState } from "react"
import { mapStore } from "@/stores/map-store"
import { reaction } from "mobx"
import MapStyleSwitcher from "@/components/map-style-switcher"
import { MAP_STYLES, MapStyle } from "@/constants/mapbox"
import AiChatbot from "@/components/ai-chatbot/ai-chatbot"
import { Button } from "@/components/ui/button"
import { MessageCircle, LocateFixed } from "lucide-react"
import useSearchByFuzzyCoords from "@/hooks/property-search/use-search-by-fuzzy-coords"

export default function Map() {
	const mapRef = useInitMap("map", "satellite")

	const setMapStyle = (style: MapStyle) => {
		if (mapRef.current) {
			mapRef.current.setStyle(MAP_STYLES[style])
		}
	}

	const flyTo = useFlyTo()

	useEffect(() => {
		const dispose = reaction(
			() => mapStore._coords,
			(coords: Coordinates | null) => {
				if (coords) {
					mapStore.setMarker(coords.longitude, coords.latitude)
					flyTo()
				}
			}
		)

		return () => dispose()
	}, [flyTo])

	const [isChatOpen, setIsChatOpen] = useState(false)
	const searchByFuzzyCoords = useSearchByFuzzyCoords()

	const handleLocateUser = () => {
		if (!navigator.geolocation) {
			console.error("Geolocation is not supported by this browser")
			return
		}

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords
				mapStore.setCoords({ latitude, longitude })
				await searchByFuzzyCoords()
			},
			(error) => {
				console.error("Error getting location:", error)
			}
		)
	}

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
						onClick={handleLocateUser}
						className="h-10 w-10 cursor-pointer duration-0"
					>
						<LocateFixed size={20} />
					</Button>
					<Button
						size="icon"
						onClick={() => setIsChatOpen(!isChatOpen)}
						className="h-10 w-10 cursor-pointer duration-0"
					>
						<MessageCircle size={20} />
					</Button>
				</div>
			</div>

			<AiChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
		</div>
	)
}
