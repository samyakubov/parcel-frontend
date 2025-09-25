import isEmpty from "lodash-es/isEmpty"
import isUndefined from "lodash-es/isUndefined"
import isNull from "lodash-es/isNull"

interface MortgageDetails {
    lender: PropertyRecord
    borrower: PropertyRecord
}

export default function getMortgageDetails(
    records: PropertyRecord[],
    lastSoldFor: LastSoldWithSqft | LastSold
): MortgageDetails | null {
    if (isEmpty(records)) return null

    const mortgageRecords = records.filter(record => record.doc_type === "MORTGAGE")
    if (isEmpty(mortgageRecords)) return null

    let selectedRecords: PropertyRecord[]

    if (!isNull(lastSoldFor)) {
        const saleDate = new Date(lastSoldFor.sale_date)

        const nearSaleRecords = mortgageRecords.filter(record => {
            const recordDate = new Date(record.record_filed)
            const diffTime = Math.abs(recordDate.getTime() - saleDate.getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays <= 7
        })

        selectedRecords = isEmpty(nearSaleRecords) ? mortgageRecords : nearSaleRecords
    } else {
        selectedRecords = mortgageRecords
    }

    selectedRecords.sort((a, b) =>
        new Date(b.record_filed).getTime() - new Date(a.record_filed).getTime()
    )

    const lenderParty = selectedRecords.find(
        party => party.partytype_desc === "MORTGAGEE/LENDER"
    )

    const borrowerParty = selectedRecords.find(
        party => party.partytype_desc === "MORTGAGOR/BORROWER"
    )

    if (isUndefined(lenderParty) || isUndefined(borrowerParty)) {
        return null
    }

    return {
        lender: lenderParty,
        borrower: borrowerParty
    }
}
