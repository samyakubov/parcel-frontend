import { action, makeAutoObservable} from "mobx"
import mapboxgl from "mapbox-gl"

class MapStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _coords:Coordinates | null = null
    public _isPropertyDataLoading = false
	public _map: mapboxgl.Map | null = null

	public setCoords = action((coords: Coordinates | null) => {
		this._coords = coords
	})
    public setIsPropertyDataLoading = action((isPropertyDataLoading: boolean) => {
        this._isPropertyDataLoading = isPropertyDataLoading
    })
	public setMap = action((map: mapboxgl.Map | null) => {
		this._map = map
	})
}

export const mapStore = new MapStore()
