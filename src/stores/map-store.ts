import { action, makeAutoObservable} from "mobx"

class MapStore {
	constructor() {
		makeAutoObservable(this)
	}

	public coords:Coordinates | null = null

	public setCoords = action((coords: Coordinates | null) => {
		this.coords = coords
	})
}

export const mapStore = new MapStore()
