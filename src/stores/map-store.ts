import { action, makeAutoObservable} from "mobx"
import mapboxgl from "mapbox-gl"
import createMarker from "@/hooks/mapbox/map/create-marker"
import {NYC_CENTER} from "@/constants/mapbox"

class MapStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _coords:Coordinates | null = null
	public _map: mapboxgl.Map | null = null
	private _currentMarker: mapboxgl.Marker | null = null

	public setCoords = action((coords: Coordinates | null) => {
		this._coords = coords
	})
	public setMap = action((map: mapboxgl.Map | null) => {
		this._map = map
	})

	public setMarker = action((longitude: number, latitude: number) => {
		if (this._currentMarker) {
			this._currentMarker.remove()
			this._currentMarker = null
		}

		if (this._map) {
			this._currentMarker = createMarker(longitude, latitude)
		}
	})

	public clearMarker = action(() => {
		if (this._currentMarker) {
			this._currentMarker.remove()
			this._currentMarker = null
		}
	})

	public cleanup = action(() => {
		this.clearMarker()
	})

	public resetMap = action(() => {
		const map = this._map

		if (!map) return

		this.cleanup()

		this._coords = null

		map.flyTo({
			center: [NYC_CENTER.longitude, NYC_CENTER.latitude],
			zoom: 10,
			duration: 2000,
			essential: true,
			curve: 1.42,
		})
	})
}

export const mapStore = new MapStore()
