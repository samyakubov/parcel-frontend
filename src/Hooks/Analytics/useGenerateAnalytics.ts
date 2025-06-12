import {useCallback} from "react"
import {useAnalyticsContext} from "../../Contexts/AnalyticsContext"
import {toast} from "react-toastify"
import isHTTPError from "../../Utils/HTTPError"
import {useApiClientContext} from "../../Contexts/ApiClientContext"


export default function useGenerateAnalytics() {
	const analyticsContext = useAnalyticsContext()
	const apiClientContext = useApiClientContext()

	return useCallback(async () => {
		try {
			analyticsContext.setGettingAnalytics(true)
			const response = await apiClientContext.propertyService.generateAnalytics(analyticsContext.analyticsSearchQuery)
			if (isHTTPError(response)) {
				toast.error(response.message)
				analyticsContext.setGettingAnalytics(false)
				return
			}
			analyticsContext.setAnalyticsData(response)
			analyticsContext.setGettingAnalytics(false)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
			analyticsContext.setGettingAnalytics(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[apiClientContext.propertyService, analyticsContext.analyticsSearchQuery])
}
