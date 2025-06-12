import React, { useState } from "react"
import { observer } from "mobx-react"
import { useMap } from "../Hooks/Mapbox/useMap"
import Layout from "../Components/Layout/Layout"
import { Loader2, Navigation } from "lucide-react"
import useCurrentLocation from "../Hooks/Mapbox/useCurrentLocation"
import SEOHelmet from "../Components/SEOHelmet"
import AddressAutocomplete from "../Components/AddressSearchWithAutoComplete/AddressSearchWithAutoComplete"
import MinimizedModalsBar from "../Components/Map/MinimizedModalsBar"
import MinimizedRelatedModalsBar from "../Components/Map/MinimizedRelatedModalsBar"
import ModalContainer from "../Components/Map/ModalContainer"
import PropertyInfoModal from "../Components/Map/PropertyInfoModal"
import RelatedPropertiesModal from "../Components/Map/RelatedPropertiesModal"
import { useSearchContext } from "../Contexts/SearchContext"
import SearchByBBLorBlockAndLot from "../Components/Search/TypesOfSearch/SearchByBBLorBlockAndLot"

function Map() {
	const searchByCurrentLocation = useCurrentLocation()
	const searchContext = useSearchContext()
	const [isSearchByCurrentLocationLoading, setIsSearchByCurrentLocationLoading] = useState(false)
	useMap("map")

	return (
		<Layout>
			<SEOHelmet/>
			<div className="absolute top-6 left-20 right-20 z-10 flex items-center w-1/4">
				<div className="flex flex-col flex-grow p-8 rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-gray-50/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 shadow-2xl border border-white/30 dark:border-gray-700/30 backdrop-blur-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] group">
					<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
					{searchContext.isSearchResultLoading ? (
						<div className="relative flex flex-col justify-center items-center h-36 space-y-4">
							<div className="relative">
								<div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse opacity-20"></div>
								<div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-ping opacity-10"></div>
								<Loader2 className="relative animate-spin text-transparent bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text" size={40} />
							</div>
							<div className="text-center space-y-2">
								<p className="text-sm font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
									Gathering property information...
								</p>
								<div className="flex space-x-1 justify-center">
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
									<div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
									<div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
								</div>
							</div>
						</div>
					) : (
						<div className="relative space-y-3 animate-fadeIn">
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
								<div className="relative transform transition-all duration-500 hover:scale-[1.02]">
									<SearchByBBLorBlockAndLot />
								</div>
							</div>

							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
								<div className="relative transform transition-all duration-500 hover:scale-[1.02]">
									<AddressAutocomplete />
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			<button
				onClick={async () => {
					setIsSearchByCurrentLocationLoading(true)
					await searchByCurrentLocation()
					setIsSearchByCurrentLocationLoading(false)
				}}
				disabled={isSearchByCurrentLocationLoading}
				className="absolute bottom-8 right-8 group flex justify-center items-center bg-white/10 dark:bg-gray-900/10 backdrop-blur-2xl p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 z-10 transition-all duration-500 hover:scale-110 hover:shadow-3xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 dark:hover:bg-gray-800/20"
			>
				<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
				{isSearchByCurrentLocationLoading ? (
					<div className="relative">
						<div className="absolute inset-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse opacity-20"></div>
						<Loader2 className="relative h-7 w-7 text-gray-600 dark:text-gray-300 animate-spin" />
					</div>
				) : (
					<Navigation className="relative h-7 w-7 text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
				)}
			</button>

			<ModalContainer
				renderModal={(modal) => <PropertyInfoModal data={modal as PropertyModal} key={modal.id} />}
			/>
			<ModalContainer
				isRelatedPropertyContainer={true}
				renderModal={(modal) => <RelatedPropertiesModal data={modal as RelatedPropertyModal} key={modal.id} />}
			/>

			<MinimizedModalsBar />
			<MinimizedRelatedModalsBar />

			<div className="relative w-full h-screen">
				<div id="map" className="w-full h-full" />
			</div>
		</Layout>
	)
}

export default observer(Map)
