import {observer} from "mobx-react"
import SearchBar from "../../SearchBar"
import React from "react"
import {useSearchContext} from "../../../Contexts/SearchContext"
import useSearchByPropertyBBL from "../../../Hooks/Search/useSearchByPropertyBBL"

function SearchByBBLorBlockAndLot() {
	const searchByBBL = useSearchByPropertyBBL()
	const searchContext = useSearchContext()
	return (
		<SearchBar
			handleSearch={searchByBBL}
			onKeyDown={searchByBBL}
			onQueryChange={searchContext.setSearchBblQuery}
			query={searchContext.searchBblQuery}
			placeholder={"Search by BBL"}
			containerClassName="mb-2"
			inputClassName="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
		/>
	)
}

export default observer(SearchByBBLorBlockAndLot)
