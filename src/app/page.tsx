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
import { LocateFixed, MessageCircle, Loader2, Flame } from "lucide-react"
import useLocateUser from "@/hooks/property-search/use-locate-user"
import useHeatmapLayer from "@/hooks/mapbox/map/use-heatmap-layer"
import { heatmapStore } from "@/stores/heatmap-store"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import HeatmapLegend from "@/components/heatmap-legend"

export default function Map() {
	const mapRef = useInitMap("map", "satellite")
	useHeatmapLayer(mapRef)
	const handleLocateUser = useLocateUser()
	const [isChatOpen, setIsChatOpen] = useState(false)

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

				<HeatmapLegend />

				<TooltipProvider delayDuration={300}>
					<div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size="icon"
									onClick={() => heatmapStore.toggleHeatmap()}
									className={`h-10 w-10 cursor-pointer duration-0 ${heatmapStore.isHeatmapVisible ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"}`}
								>
									{heatmapStore.isLoading ? (
										<Loader2 size={20} className="animate-spin" />
									) : (
										<Flame size={20} />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent side="left">
								<p>Toggle Heatmap</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size="icon"
									onClick={handleLocateUser}
									className="h-10 w-10 cursor-pointer duration-0"
								>
									<LocateFixed size={20} />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="left">
								<p>Locate Me</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size="icon"
									onClick={() => setIsChatOpen(!isChatOpen)}
									className="h-10 w-10 cursor-pointer duration-0"
								>
									<MessageCircle size={20} />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="left">
								<p>AI Chatbot</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</TooltipProvider>
			</div>

			<AiChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
		</div>
	)
}
