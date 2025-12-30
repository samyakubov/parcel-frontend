import {action, makeAutoObservable} from "mobx"


class PublicTransitStore {
    constructor() {
        makeAutoObservable(this)
    }

    public _routesNearBy:FeatureCollection | null = null

    public setRoutesNearby = action((routes: FeatureCollection) => {
        this._routesNearBy = routes
    })

}

export const publicTransitStore = new PublicTransitStore()
