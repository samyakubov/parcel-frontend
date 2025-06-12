import { useCallback } from "react"
import {useApiClientContext} from "../../Contexts/ApiClientContext"
import isHTTPError from "../../Utils/HTTPError"
import {toast} from "react-toastify"
import {useModalManagerContext} from "../../Contexts/ModalManagerContext"
import {useMapContext} from "../../Contexts/MapContext"

export default function useSearchAllPropertiesToOwner(): (address:string, ownerName:string) => Promise<void> {
	const apiClientContext = useApiClientContext()
	const modalManagerContext = useModalManagerContext()
	const mapContext = useMapContext()
	return useCallback(async (address:string, ownerName:string): Promise<void> => {
		try {
			if (modalManagerContext.relatedPropertyModals.length >= 4) {
				toast.info("Close a modal to open more")
				return
			}
			const response = await apiClientContext.propertyService.searchAllPropertiesToOwner(address, ownerName)
			if (isHTTPError(response)) {
				toast.error(response.message)
				return
			}
			mapContext.relatedPropertiesToOwnerCoords = response.coordinates
			modalManagerContext.addRelatedPropertyModal(ownerName, response.related_properties_summary)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
		}
	},[apiClientContext.propertyService, modalManagerContext])
}
