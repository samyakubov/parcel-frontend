import { action, makeAutoObservable} from "mobx"

class MapStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _coords:Coordinates | null = null
    public _isPropertyDataLoading = false

	public setCoords = action((coords: Coordinates | null) => {
		this._coords = coords
	})
    public setIsPropertyDataLoading = action((isPropertyDataLoading: boolean) => {
        this._isPropertyDataLoading = isPropertyDataLoading
    })
}

export const mapStore = new MapStore()
