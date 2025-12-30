
declare global {

    interface FeatureCollection {
        type: "FeatureCollection";
        features: PublicTransitFeature[];
    }

    interface PublicTransitFeature {
        type: "Feature";
        geometry: {
            type: "LineString";
            coordinates: number[][];
        };
        properties: PublicTransitProperties;
    }

    interface PublicTransitProperties {
        distance: number;
        route_color: string;
        route_id: string;
        route_long_name: string;
        route_name: string;
        route_text_color: string;
        shape_id: string;
    }
}

export {}
