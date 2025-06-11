declare global {
    interface MapboxProperties {
        accuracy?: string;
        address?: string;
        category?: string;
        maki?: string;
        wikidata?: string;
        short_code?: string;
    }

    interface MapboxGeometry {
        coordinates: [number, number];
        type: "Point" | "LineString" | "Polygon";
    }

    interface MapboxFeature {
        id: string;
        place_name: string;
        place_type: string[];
        properties: MapboxProperties;
        text: string;
        center: [number, number];
        geometry: MapboxGeometry;
        type: "Feature";
        relevance: number;
        address?: string;
        context: Array<{
            id: string;
            text: string;
            wikidata?: string;
            short_code?: string;
        }>;
    }


}

export { }
