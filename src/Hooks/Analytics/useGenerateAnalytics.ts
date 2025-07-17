import {useCallback} from "react"
import {toast} from "react-toastify"
import isHTTPError from "../../Utils/HTTPError"
import {analyticsStore} from "../../Stores/AnalyticsStore"
import {apiClientService} from "../../Services/ApiClientService"


export default function useGenerateAnalytics() {
	return useCallback(async () => {
		try {
			analyticsStore.setGettingAnalytics(true)
			const response = await apiClientService.propertyService.generateAnalytics(analyticsStore.analyticsSearchQuery)
			if (isHTTPError(response)) {
				toast.error(response.message)
				analyticsStore.setGettingAnalytics(false)
				return
			}
			analyticsStore.setAnalyticsData(response)
			analyticsStore.setGettingAnalytics(false)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
			analyticsStore.setGettingAnalytics(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[apiClientService.propertyService, analyticsStore.analyticsSearchQuery])
}
