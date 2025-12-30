import axios from "axios"

export default class PublicTransitService {
    constructor() { }

    async findPublicTransitNearby(): Promise<FeatureCollection> {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_TRANSIT_API_URL}/routes/nearby?lat=40.733154&lon=-73.75385&radius_miles=0.5`
        )
        return response.data
    }
}
