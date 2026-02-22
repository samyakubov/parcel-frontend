export interface ZipCodeHeatmapItem {
	zip_code: string;
	num_sales: number;
	median_price: number;
	avg_price: number;
	median_price_per_sqft: number | null;
}

export interface HeatmapResponse {
	data: ZipCodeHeatmapItem[];
	start_date: string | null;
	end_date: string | null;
}
