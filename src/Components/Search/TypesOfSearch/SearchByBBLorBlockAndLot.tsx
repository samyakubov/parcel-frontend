import {observer} from "mobx-react"
import SearchBar from "../../SearchBar"
import React from "react"
import useSearchByPropertyBBL from "../../../Hooks/Search/useSearchByPropertyBBL"
import {searchStore} from "../../../Stores/SearchStore"

function SearchByBBLorBlockAndLot() {
	const searchByBBL = useSearchByPropertyBBL()
	return (
		<SearchBar
			handleSearch={searchByBBL}
			onKeyDown={searchByBBL}
			onQueryChange={searchStore.setSearchBblQuery}
			query={searchStore.searchBblQuery}
			placeholder={"Search by BBL"}
			containerClassName="mb-2"
			inputClassName="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
		/>
	)
}

export default observer(SearchByBBLorBlockAndLot)
