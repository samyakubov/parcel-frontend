import React from "react"
import { Building2, Home, Hash } from "lucide-react"
import isEmpty from "lodash-es/isEmpty"

interface PropertyDetailProps {
    firstRecord: PropertyRecord
}

export default function Details(props: PropertyDetailProps) {
	const record = props.firstRecord

	if (isEmpty(record)) {
		return (
			<div className="property-details-card property-details-card--error">
				<div className="property-details-header property-details-header--error">
					<div className="property-details-icon property-details-icon--error">
						<Building2 className="property-details-icon-svg--error" />
					</div>
					<h3 className="property-details-title property-details-title--error">
                        Property Details
					</h3>
				</div>
				<p className="property-details-error-text">
                    No property details available.
				</p>
			</div>
		)
	}

	return (
		<div className="property-details-card property-details-card--success">
			<div className="property-details-header property-details-header--success">
				<div className="property-details-icon property-details-icon--success">
					<Building2 className="property-details-icon-svg--success" />
				</div>
				<h3 className="property-details-title property-details-title--success">
                    Property Details
				</h3>
			</div>

			<div className="property-details-content">
				<div className="property-details-item">
					<div className="property-details-item-icon">
						<Home className="property-details-item-icon-svg" />
					</div>
					<div className="property-details-item-content">
						<div className="property-details-item-label">
                            Property Type
						</div>
						<div className="property-details-item-value">
							{record.prop_type}
						</div>
					</div>
				</div>

				<div className="property-details-item">
					<div className="property-details-item-icon">
						<Hash className="property-details-item-icon-svg" />
					</div>
					<div className="property-details-item-content">
						<div className="property-details-item-label">
                            BBL
						</div>
						<div className="property-details-item-value property-details-item-value--mono">
							{record.bbl}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
