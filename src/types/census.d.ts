declare global {

    interface CensusDemographicDataResponse {
        tractName: string;
        population: number | null;
        medianIncome: number | null;
        medianHomeValue: number | null;
        medianRent: number | null;
        medianAge: number | null;
    }

}

export { }
