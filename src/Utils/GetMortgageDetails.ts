import isEmpty from "lodash-es/isEmpty"

export default function getMortgageDetails(
	records: PropertyRecord[],
	sale_date: string
): PropertyRecord | null {
	if (isEmpty(records)) return null

	const mortgageRecords = records.filter(record => record.doc_type === "MORTGAGE")
	if (isEmpty(mortgageRecords)) return null

	const saleDate = new Date(sale_date)

	const nearSaleRecords = mortgageRecords.filter(record => {
		const recordDate = new Date(record.recordedfiled)
		const diffTime = Math.abs(recordDate.getTime() - saleDate.getTime())
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		return diffDays <= 7
	})

	return isEmpty(nearSaleRecords)
		? mortgageRecords.sort((a, b) =>
			new Date(b.recordedfiled).getTime() - new Date(a.recordedfiled).getTime()
		)[0]
		: nearSaleRecords[0]
}
