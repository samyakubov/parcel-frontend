import AdvancedSearch from "./AdvancedSearch"
import React from "react"
import SearchByOwnersName from "./TypesOfSearch/SearchByOwnersName"
import SearchByBBLorBlockAndLot from "./TypesOfSearch/SearchByBBLorBlockAndLot"
import AddressAutocomplete from "../AddressSearchWithAutoComplete/AddressSearchWithAutoComplete"

interface RenderSearchProps {
    activeTab: SearchTab
}

export default function RenderSearch ({ activeTab }:RenderSearchProps) {
	if (activeTab === "Owner(s) Name") {
		return <SearchByOwnersName />
	} else if (activeTab === "BBL") {
		return <SearchByBBLorBlockAndLot />
	} else if (activeTab === "Address") {
		return (
			<div className="flex flex-col space-y-4">
				<AddressAutocomplete />
			</div>
		)
	}
	return <AdvancedSearch />
}
