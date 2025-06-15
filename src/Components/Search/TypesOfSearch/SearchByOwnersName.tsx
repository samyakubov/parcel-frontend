import {observer} from "mobx-react"
import SearchBar from "../../SearchBar"
import React, {useCallback, useState} from "react"
import {toast} from "react-toastify"
import isEmpty from "lodash-es/isEmpty"
import useSearchByPartyName from "../../../Hooks/Search/useSearchByPartyName"
import {searchStore} from "../../../Stores/SearchStore"


function SearchByOwnersName() {
	const searchByPartyName = useSearchByPartyName()
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")

	const handleSearchByOwnersName = useCallback(async () => {
		if (isEmpty(firstName)) {
			return toast.error("Please enter first name")
		}
		if (isEmpty(lastName)) {
			return toast.error("Please enter last name")
		}

		const normalizedName = lastName + ", " + firstName
		searchStore.setSearchNameQuery(normalizedName)
		await searchByPartyName()
	}, [firstName, searchByPartyName, lastName, searchStore])

	return (
		<div className="flex flex-col space-y-4">
			<SearchBar
				handleSearch={handleSearchByOwnersName}
				query={firstName}
				onQueryChange={setFirstName}
				placeholder="First Name"
				inputClassName="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
			/>
			<SearchBar
				handleSearch={handleSearchByOwnersName}
				query={lastName}
				onQueryChange={setLastName}
				placeholder="Last Name"
				inputClassName="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
			/>
		</div>
	)
}

export default observer(SearchByOwnersName)
