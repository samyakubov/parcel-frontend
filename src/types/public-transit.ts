
declare global {
	interface Stop {
		stop_id: string;
		stop_name: string;
		stop_lat: number;
		stop_lon: number;
		location_type: number;
		wheelchair_boarding: number;
		platform_code: string | null;
		stop_desc: string | null;
		zone_id: string | null;
	}

	interface Route {
		route_id: string;
		route_short_name: string;
		route_long_name: string;
		route_color: string;
		route_text_color: string;
		route_type: number;
		stops:Stop[];
		route_desc:string;
	}
}

export {}
