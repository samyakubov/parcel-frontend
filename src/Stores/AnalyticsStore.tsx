import { action, makeAutoObservable } from "mobx"

class AnalyticsStore {
	constructor() {
		makeAutoObservable(this)
	}

	public analyticsData: Analytics = {
		prices: [],
		recent_sales: [],
	}

	public analyticsSearchQuery: AdvancedSearchFilter = {
		document_type: "",
		year_filed_start: 1966,
		year_filed_end: new Date().getFullYear(),
		property_type: "",
		from_amount: 0,
		to_amount: 0,
		zip_code: "",
	}


	public isGettingAnalytics = false

	public setAnalyticsData = action((analytics: Analytics)=> {
		this.analyticsData = analytics
	})

	public setAnalyticsSearchQuery = action(<K extends keyof AdvancedSearchFilter>(
		field: K,
		value: AdvancedSearchFilter[K]
	) => {
		this.analyticsSearchQuery[field] = value
	})

	public setGettingAnalytics = action((isLoading: boolean) => {
		this.isGettingAnalytics = isLoading
	})
}

export const analyticsStore = new AnalyticsStore()


