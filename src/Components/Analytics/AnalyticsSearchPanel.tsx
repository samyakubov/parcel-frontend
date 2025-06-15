import React, {useState} from "react"
import { observer } from "mobx-react"
import StyledDropdown from "../StyledDropdown"
import { PROPERTY_TYPES } from "../../Constants/Constants"
import StyledInput from "../StyledInput"
import useGenerateAnalytics from "../../Hooks/Analytics/useGenerateAnalytics"
import {toast} from "react-toastify"
import isEmpty from "lodash-es/isEmpty"
import {analyticsStore} from "../../Stores/AnalyticsStore"


function GetTrackBackground (currentYear:number) {
	const min = 2003
	const max = currentYear
	const startPercentage = ((analyticsStore.analyticsSearchQuery.year_filed_start - min) / (max - min)) * 100
	const endPercentage = ((analyticsStore.analyticsSearchQuery.year_filed_end - min) / (max - min)) * 100

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

function AnalyticsSearchPanel() {
	const { setAnalyticsSearchQuery, analyticsSearchQuery, setGettingAnalytics } = analyticsStore
	const handleSearch = useGenerateAnalytics()
	const currentYear = new Date().getFullYear()
	const [zipCode, setZipCode] = useState("")

	return (
		<div className="w-full mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 transition-colors duration-200">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
						Property Type
					</label>
					<StyledDropdown
						options={PROPERTY_TYPES}
						onChange={(e) => {
							setAnalyticsSearchQuery("property_type", e)
						}}
					/>
				</div>

				<div>
					<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
						Zip Code
					</label>
					<StyledInput
						type="email"
						id="zip"
						name="zip_code"
						placeholder="Enter a zip code"
						onChange={(e) => {
							setZipCode(e.target.value)
						}}
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
						Min Price
					</label>
					<StyledInput
						type="email"
						id="minprice"
						name="min_price"
						placeholder="Minimum price"
						onChange={(e) => {
							setAnalyticsSearchQuery("from_amount", Number(e.target.value))
						}}
					/>
				</div>

				<div>
					<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
						Max Price
					</label>
					<StyledInput
						type="email"
						id="maxprice"
						name="max_price"
						placeholder="Maximum price"
						onChange={(e) => {
							setAnalyticsSearchQuery("to_amount", Number(e.target.value))
						}}
					/>
				</div>

				<div className="space-y-2">
					<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
						Date
						Range: {analyticsSearchQuery.year_filed_start} - {analyticsSearchQuery.year_filed_end}
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
								value={analyticsSearchQuery.year_filed_end}
								onChange={(e) => {
									const newEnd = Number(e.target.value)
									setAnalyticsSearchQuery("year_filed_end", Math.max(newEnd, analyticsSearchQuery.year_filed_start))
								}}
								className="absolute w-full h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-50 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-50 [&::-ms-thumb]:appearance-none [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-blue-500 [&::-ms-thumb]:cursor-pointer [&::-ms-thumb]:relative [&::-ms-thumb]:z-50"
							/>

							<input
								type="range"
								min="2003"
								max={currentYear}
								step={1}
								value={analyticsSearchQuery.year_filed_start}
								onChange={(e) => {
									const newStart = Number(e.target.value)
									setAnalyticsSearchQuery("year_filed_start", Math.min(newStart, analyticsSearchQuery.year_filed_end))
								}}
								className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-50 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-50 [&::-ms-thumb]:appearance-none [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-blue-500 [&::-ms-thumb]:cursor-pointer [&::-ms-thumb]:pointer-events-auto [&::-ms-thumb]:relative [&::-ms-thumb]:z-50"
							/>
						</div>
					</div>
				</div>
			</div>

			<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
				onClick={async () => {
					if (zipCode.length < 5 && !isEmpty(zipCode)) {
						toast("invalid zip code")
						setGettingAnalytics(false)
						return
					}
					if (analyticsSearchQuery.from_amount === 0) {
						setAnalyticsSearchQuery("from_amount", 100000)
					}
					setAnalyticsSearchQuery("zip_code", zipCode)
					await handleSearch()
				}}>
				Search Properties
			</button>

		</div>
	)
}

export default observer(AnalyticsSearchPanel)
