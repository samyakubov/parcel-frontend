declare global {
	interface RaceDemographic {
		label: string;
		value: number;
		[key: string]: string | number;
	}

	interface CensusDemographicDataResponse {
		population: number ;
		medianIncome: number;
		medianHomeValue: number;
		medianRent: number;
		medianAge: number;
		raceDemographics: RaceDemographic[];
	}
}

export { }
