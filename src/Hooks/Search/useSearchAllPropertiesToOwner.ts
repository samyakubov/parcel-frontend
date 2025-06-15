import { useCallback } from "react"
import isHTTPError from "../../Utils/HTTPError"
import {toast} from "react-toastify"
import {apiClientStore} from "../../Stores/ApiClientStore"
import {mapStore} from "../../Stores/MapStore"
import {modalStore} from "../../Stores/ModalStore"

export default function useSearchAllPropertiesToOwner(): (address:string, ownerName:string) => Promise<void> {
	return useCallback(async (address:string, ownerName:string): Promise<void> => {
		try {
			if (modalStore.relatedPropertyModals.length >= 4) {
				toast.info("Close a modal to open more")
				return
			}
			const response = await apiClientStore.propertyService.searchAllPropertiesToOwner(address, ownerName)
			if (isHTTPError(response)) {
				toast.error(response.message)
				return
			}
			mapStore.relatedPropertiesToOwnerCoords = response.coordinates
			modalStore.addRelatedPropertyModal(ownerName, response.related_properties_summary)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
		}
	},[apiClientStore.propertyService, modalStore])
}
