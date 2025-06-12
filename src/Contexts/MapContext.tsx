import React, { createContext, useContext, useMemo } from "react"
import { action, makeAutoObservable} from "mobx"

class MapContextClass {
	constructor() {
		makeAutoObservable(this)
	}

	public coords:Coordinates | null = null

	public isRelatedPropertySummaryModalOpen = false
	public relatedPropertiesToOwnerCoords:Coordinates[] = []
	public isRelatedPropertiesLoading = false

	public setCoords = action((coords: Coordinates | null) => {
		this.coords = coords
	})

	public setIsRelatedPropertiesLoading = action((isRelatedPropertiesLoading: boolean) => {
		this.isRelatedPropertiesLoading = isRelatedPropertiesLoading
	})

	public setIsRelatedPropertySummaryModalOpen = action((isOpen: boolean) => {
		this.isRelatedPropertySummaryModalOpen = isOpen
	})
}

const MapContext = createContext(new MapContextClass())

export default function MapContextProvider ({ children }: { children: React.ReactNode }) {
	const mapContextClass = useMemo(() => new MapContextClass(), [])

	return (
		<MapContext.Provider value={mapContextClass}>
			{children}
		</MapContext.Provider>
	)
}

export const useMapContext = () => useContext(MapContext)
