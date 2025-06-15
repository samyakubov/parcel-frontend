import isEmpty from "lodash-es/isEmpty"
import {Download} from "lucide-react"
import React from "react"
import {useExportToExcel} from "../Hooks/useExportToExcel"
import {observer} from "mobx-react"
import {toast} from "react-toastify"
import {searchStore} from "../Stores/SearchStore"


function ExportToExcelButton() {
	const exportToExcel = useExportToExcel()

	const handleExport = () => {
		if (isEmpty(searchStore.propertyResults.records)) {
			return toast.warning("Nothing to export")
		}
		exportToExcel(searchStore.propertyResults, `${searchStore.searchAddressQuery.toLowerCase()} report`)
	}

	return (
		<button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40">
			<Download className="h-4 w-4" />
			Export
		</button>
	)
}

export default observer(ExportToExcelButton)
