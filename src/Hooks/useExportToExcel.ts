import {useCallback} from "react"
import * as XLSX from "xlsx"

type DataRecord = PropertyRecord | Violation | Complaint | LastSoldFor;

export function useExportToExcel() {
	const formatColumnHeader = useCallback((header: string): string => {
		return header
			.split("_")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")
	}, [])

	const getColumnWidths = useCallback(<T extends DataRecord>(data: T[], keys: (keyof T)[]): XLSX.ColInfo[] => {
		return keys.map(key => ({
			wch: Math.max(
				formatColumnHeader(String(key)).length,
				...data.map(row => String(row[key] || "").length),
				15
			)
		}))
	}, [formatColumnHeader])
	return useCallback((data: PropertyDetails, fileName:string): void => {
		const wb = XLSX.utils.book_new()
		const numberFormat = "#,##0.00"
		const dateFormat = "yyyy-mm-dd"

		const lastSoldWS = XLSX.utils.json_to_sheet([data.last_sold_for])
		lastSoldWS["!cols"] = getColumnWidths([data.last_sold_for], Object.keys(data.last_sold_for) as (keyof LastSoldFor)[])
		const salePriceCell = XLSX.utils.encode_cell({r: 1, c: 1})
		if (lastSoldWS[salePriceCell]) {
			lastSoldWS[salePriceCell].z = numberFormat
		}

		if (data.records.length > 0) {
			const recordsWS = XLSX.utils.json_to_sheet(data.records)
			recordsWS["!cols"] = getColumnWidths(data.records, Object.keys(data.records[0]) as (keyof PropertyRecord)[])
			XLSX.utils.book_append_sheet(wb, recordsWS, "Property Records")
		}

		const ownersWS = XLSX.utils.json_to_sheet(
			data.owners.current_owners.map(owner => ({owner}))
		)

		ownersWS["!cols"] = [{wch: 50}]

		XLSX.utils.book_append_sheet(wb, ownersWS, "Current Owners")

		XLSX.utils.book_append_sheet(wb, lastSoldWS, "Last Sold Info")

		if (data.violations.length > 0) {
			const violationsWS = XLSX.utils.json_to_sheet(data.violations)
			violationsWS["!cols"] = getColumnWidths(data.violations, Object.keys(data.violations[0]) as (keyof Violation)[])

			const violationNumberCols: (keyof Violation)[] = ["penalty_amount", "amountpaid", "balancedue"]
			data.violations.forEach((_, idx) => {
				violationNumberCols.forEach(col => {
					const cellRef = XLSX.utils.encode_cell({
						r: idx + 1,
						c: Object.keys(data.violations[0]).indexOf(col as string)
					})
					if (violationsWS[cellRef]) {
						violationsWS[cellRef].z = numberFormat
					}
				})
			})
			XLSX.utils.book_append_sheet(wb, violationsWS, "Violations")
		}

		if (data.complaints.length > 0) {
			const complaintsWS = XLSX.utils.json_to_sheet(data.complaints)
			complaintsWS["!cols"] = getColumnWidths(data.complaints, Object.keys(data.complaints[0]) as (keyof Complaint)[])

			const complaintDateCols: (keyof Complaint)[] = ["date_entered", "disposition_date", "inspection_date", "dobrun_date"]
			data.complaints.forEach((_, idx) => {
				complaintDateCols.forEach(col => {
					const cellRef = XLSX.utils.encode_cell({
						r: idx + 1,
						c: Object.keys(data.complaints[0]).indexOf(col as string)
					})
					if (complaintsWS[cellRef]) {
						complaintsWS[cellRef].z = dateFormat
					}
				})
			})
			XLSX.utils.book_append_sheet(wb, complaintsWS, "Complaints")
		}
		XLSX.writeFile(wb, `${fileName}.xlsx`)
	}, [getColumnWidths])
}
