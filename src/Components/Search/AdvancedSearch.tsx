import StyledDropdown from "../StyledDropdown"
import {DOCUMENT_TYPES, PROPERTY_TYPES} from "../../Constants/Constants"
import React from "react"
import {observer} from "mobx-react"
import StyledButton from "../StyledButton"
import StyledInput from "../StyledInput"
import useAdvancedSearch from "../../Hooks/Search/useAdvancedSearch"
import {searchStore} from "../../Stores/SearchStore"

function GetTrackBackground (currentYear:number) {
	const min = 2003
	const max = currentYear
	const startPercentage = ((searchStore.advancedSearchQuery.year_filed_start - min) / (max - min)) * 100
	const endPercentage = ((searchStore.advancedSearchQuery.year_filed_end - min) / (max - min)) * 100

	return `linear-gradient(
            to right,
            #e5e7eb 0%,
            #e5e7eb ${startPercentage}%,
            #3b82f6 ${startPercentage}%,
            #3b82f6 ${endPercentage}%,
            #e5e7eb ${endPercentage}%,
            #e5e7eb 100%
        )`
}


function AdvancedSearch() {
	const advancedSearch = useAdvancedSearch()
	const currentYear = new Date().getFullYear()
	return (
		<div className="space-y-4">
			<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
				Document Type
			</label>
			<StyledDropdown options={DOCUMENT_TYPES}
				onChange={(e) => searchStore.setAdvancedSearchQuery("document_type", e)}/>

			<div className="space-y-2">
				<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
					Date
					Range: {searchStore.advancedSearchQuery.year_filed_start} - {searchStore.advancedSearchQuery.year_filed_end}
				</label>
				<div className="relative h-2">
					<div
						className="absolute w-full h-full bg-gray-200 rounded"
						style={{
							background: GetTrackBackground(currentYear)
						}}
					/>

					<div className="relative">
						<input
							type="range"
							min="2003"
							max={currentYear}
							step={1}
							value={searchStore.advancedSearchQuery.year_filed_end}
							onChange={(e) => {
								const newEnd = Number(e.target.value)
								searchStore.setAdvancedSearchQuery("year_filed_end", Math.max(newEnd, searchStore.advancedSearchQuery.year_filed_start))
							}}
							className="absolute w-full h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-50 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-50 [&::-ms-thumb]:appearance-none [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-blue-500 [&::-ms-thumb]:cursor-pointer [&::-ms-thumb]:relative [&::-ms-thumb]:z-50"
						/>

						<input
							type="range"
							min="2003"
							max={currentYear}
							step={1}
							value={searchStore.advancedSearchQuery.year_filed_start}
							onChange={(e) => {
								const newStart = Number(e.target.value)
								searchStore.setAdvancedSearchQuery("year_filed_start", Math.min(newStart, searchStore.advancedSearchQuery.year_filed_end))
							}}
							className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-50 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-50 [&::-ms-thumb]:appearance-none [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-blue-500 [&::-ms-thumb]:cursor-pointer [&::-ms-thumb]:pointer-events-auto [&::-ms-thumb]:relative [&::-ms-thumb]:z-50"
						/>
					</div>
				</div>
			</div>

			<div>
				<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
					Property Type
				</label>
				<StyledDropdown options={PROPERTY_TYPES} onChange={(e) => {
					searchStore.setAdvancedSearchQuery("property_type", e)
				}}/>
			</div>

			<div className="space-y-2">
				<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
					Price Range
				</label>
				<div className="flex gap-4 w-full">
					<StyledInput
						type="email"
						id="from_amount"
						name="Min Amount"
						placeholder="Min."
						onChange={(e) => {
							searchStore.setAdvancedSearchQuery("from_amount", Number(e.target.value))
						}}
					/>
					<StyledInput
						type="email"
						id="To_amount"
						name="Max Amount"
						placeholder="Max"
						onChange={(e) => {
							searchStore.setAdvancedSearchQuery("to_amount", Number(e.target.value))
						}}
					/>
				</div>
			</div>

			<StyledButton text={"Search"} onClick={advancedSearch}/>
		</div>
	)
}

export default observer(AdvancedSearch)
