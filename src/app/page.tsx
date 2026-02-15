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
import { LocateFixed, MessageCircle, Search } from "lucide-react"
import useLocateUser from "@/hooks/property-search/use-locate-user"
import { uiStore } from "@/stores/ui-store"
import { observer } from "mobx-react"

export default observer(function Map() {
	const mapRef = useInitMap("map", "satellite")
	const handleLocateUser = useLocateUser()
	const [isChatOpen, setIsChatOpen] = useState(false)
	const isMobile = uiStore.isMobileView

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

	const handleSearchClick = () => {
		uiStore.setActiveMobilePanel("search")
	}

	return (
		<div className="flex w-full h-screen">
			<div className="relative flex-1 h-full">
				<div id="map" className="w-full h-full" />

				{/* Search Panel - always rendered, visibility controlled by component */}
				<div className="absolute top-4 left-4 z-10 md:block">
					<SearchPanel />
				</div>

				{/* Mobile Search Button - only visible on mobile when search panel is closed */}
				{isMobile && uiStore._activeMobilePanel !== "search" && (
					<div className="absolute top-4 left-4 z-10 md:hidden">
						<Button
							size="icon"
							onClick={handleSearchClick}
							className="h-12 w-12 cursor-pointer duration-0"
						>
							<Search size={20} />
						</Button>
					</div>
				)}

				{/* Map Style Switcher - top right on desktop, bottom right on mobile */}
				<div className="hidden md:block absolute top-4 right-4 z-10">
					<MapStyleSwitcher onStyleChange={setMapStyle} />
				</div>

				<ModalContainer />
				<MinimizedModalsBar />

				{/* Bottom right controls - vertical stack on mobile with style switcher */}
				<div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 safe-area-bottom-right md:pb-0 md:pr-0">
					{/* Map Style Switcher - only visible on mobile, positioned above other buttons */}
					<div className="md:hidden">
						<MapStyleSwitcher onStyleChange={setMapStyle} />
					</div>
					<Button
						size="icon"
						onClick={handleLocateUser}
						className="h-12 w-12 md:h-10 md:w-10 cursor-pointer duration-0"
					>
						<LocateFixed size={20} />
					</Button>
					<Button
						size="icon"
						onClick={() => setIsChatOpen(!isChatOpen)}
						className="h-12 w-12 md:h-10 md:w-10 cursor-pointer duration-0"
					>
						<MessageCircle size={20} />
					</Button>
				</div>
			</div>

			<AiChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
		</div>
	)
})
