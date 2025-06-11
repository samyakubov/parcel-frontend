import React from "react"
import { observer } from "mobx-react"
import { useSearchContext } from "../../Contexts/SearchContext"

function RecentlySoldModal() {
	const { propertyResults } = useSearchContext()

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-xl font-bold">Recently Sold Properties</h1>
				</div>
				<div className="max-h-96 overflow-y-auto">
					{propertyResults.records.map((record) => (
						<div key={record.documentid} className="border-b border-gray-200 py-4 last:border-b-0">
							<div className="flex justify-between items-start mb-2">
								<div className="flex-1">
									<h3 className="font-semibold text-lg">
										{record.prop_streetnumber} {record.prop_streetname}
									</h3>
									{record.prop_unit && (
										<p className="text-sm text-gray-600">Unit: {record.prop_unit}</p>
									)}
								</div>
								<div className="text-right">
									<p className="font-bold text-lg text-green-600">
										${record.amount.toLocaleString()}
									</p>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
								<div>
									<p><span className="font-medium">Type:</span> {record.prop_type}</p>
									<p><span className="font-medium">BBL:</span> {record.bbl}</p>
								</div>
								<div>
									<p><span className="font-medium">Recorded:</span> {new Date(record.recordedfiled).toLocaleDateString()}</p>
									<p><span className="font-medium">Doc Type:</span> {record.doc_type}</p>
								</div>
							</div>
							<div className="mt-2 text-sm text-gray-600">
								<p><span className="font-medium">Buyer:</span> {record.party_name}</p>
								<p>{record.party_address1}, {record.party_city}, {record.party_state} {record.party_zip}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default observer(RecentlySoldModal)
