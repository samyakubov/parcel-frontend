import isEmpty from "lodash-es/isEmpty"
import isUndefined from "lodash-es/isUndefined"

export default function getMortgageDetails(
	records: PropertyRecord[],
	sale_date: string
): { lender: PropertyRecord; borrower: PropertyRecord } | null {
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

	const selectedRecords = isEmpty(nearSaleRecords)
		? mortgageRecords.sort((a, b) =>
			new Date(b.recordedfiled).getTime() - new Date(a.recordedfiled).getTime()
		)
		: nearSaleRecords

	const lenderParty = selectedRecords.find(
		party => party.partytype_desc === "MORTGAGEE/LENDER"
	)

	const borrowerParty = selectedRecords.find(
		party => party.partytype_desc === "MORTGAGOR/BORROWER"
	)

	if (isUndefined(lenderParty) || isUndefined(borrowerParty)) return null

	return {
		lender: lenderParty,
		borrower: borrowerParty
	}
}
