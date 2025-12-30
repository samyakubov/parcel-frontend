import axios from "axios"
import {mapStore} from "@/stores/map-store"

export default class PublicTransitService {
    constructor() { }

    async findPublicTransitNearby(): Promise<FeatureCollection> {
        const response = await axios.get(
            // eslint-disable-next-line max-len
            `${process.env.NEXT_PUBLIC_TRANSIT_API_URL}/routes/nearby?lat=${mapStore._coords?.latitude}&lon=${mapStore._coords?.longitude}&radius_miles=0.5`
        )
        return response.data
    }
}
