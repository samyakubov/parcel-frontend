import { useCallback } from "react"
import { NormalizeStreetName } from "../../Utils/NormalizeStreetName"
import { useSearchContext } from "../../Contexts/SearchContext"
import useSearchByPropertyAddress from "./useSearchByPropertyAddress"
import useTypedNavigate from "../useTypedNavigate"

export function useHandleFindAddressOnMap() {
	const searchContext = useSearchContext()
	const searchByPropertyAddress = useSearchByPropertyAddress()
	const navigate = useTypedNavigate()

	return useCallback(async (params: {
    data: {
      prop_streetnumber: string;
      prop_streetname: string;
    }
  }) => {
		try {
			const address = `${params.data.prop_streetnumber} ${NormalizeStreetName(params.data.prop_streetname)}`
			searchContext.setAddressSearchQuery(address)
			await searchByPropertyAddress()
			navigate("/map")
		} catch (error) {
			console.error("Error handling map click:", error)
		}
	}, [searchContext, searchByPropertyAddress, navigate])
}
