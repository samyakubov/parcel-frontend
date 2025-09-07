import { action, makeAutoObservable} from "mobx"

class MapStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _coords:Coordinates | null = null

	public setCoords = action((coords: Coordinates | null) => {
		this._coords = coords
	})
}

export const mapStore = new MapStore()
