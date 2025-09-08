"use client"
import useInitMap from "@/hooks/mapbox/map/use-init-map"
import PropertyDetailsModal from "@/components/property-details-modal"
import ModalContainer from "@/components/modal/modal-container"
import MinimizedModalsBar from "@/components/modal/minimized-modal-bar"

export default function Map() {
	useInitMap("map")
	return (
		<div>
			<ModalContainer
				renderModal={(modal) => <PropertyDetailsModal data={modal as PropertyModal} key={modal.id} />}
			/>

			<MinimizedModalsBar />
			<div className="relative w-full h-screen">
				<div id="map" className="w-full h-full" />
			</div>
		</div>
	)
}
