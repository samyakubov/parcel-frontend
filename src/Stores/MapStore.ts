import { action, makeAutoObservable} from "mobx"

class MapStore {
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

export const mapStore = new MapStore()
