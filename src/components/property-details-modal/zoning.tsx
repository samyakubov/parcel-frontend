"use client"
import React from "react"
import { Hash, Map, Building2, Clock } from "lucide-react"
import isNull from "lodash-es/isNull"
import isUndefined from "lodash-es/isUndefined"
import {FORMAT_DATE} from "@/utils/format-date"

interface ZoningSectionProps {
    zoning: Zoning
}

export default function Zoning({ zoning }: ZoningSectionProps) {

	const hasNoZoningData = isNull(zoning.zoning_districts) || isUndefined(zoning.zoning_districts) || (
		zoning.zoning_districts.length === 0 &&
        zoning.commercial_overlays.length === 0 &&
        zoning.special_districts.length === 0 &&
        !zoning.limited_height_district
	)

	if (hasNoZoningData) {
		return (
			<div className="zoning-card zoning-card--error">
				<div className="zoning-header zoning-header--error">
					<div className="zoning-icon zoning-icon--error">
						<Map className="zoning-icon-svg--error" />
					</div>
					<h3 className="zoning-title zoning-title--error">
                        Zoning Information
					</h3>
				</div>
				<p className="zoning-error-text">
                    No zoning information available.
				</p>
			</div>
		)
	}

	return (
		<div className="zoning-card zoning-card--success">
			<div className="zoning-header zoning-header--success">
				<div className="zoning-icon zoning-icon--success">
					<Map className="zoning-icon-svg--success" />
				</div>
				<h3 className="zoning-title zoning-title--success">
                    Zoning Information
				</h3>
			</div>

			<div className="zoning-content">
				{zoning.zoning_districts.length > 0 && (
					<div className="zoning-item">
						<div className="zoning-item-icon">
							<Map className="zoning-item-icon-svg" />
						</div>
						<div className="zoning-item-content">
							<div className="zoning-item-label">
                                Zoning Districts
							</div>
							<div className="zoning-item-value">
								{zoning.zoning_districts.join(", ")}
							</div>
						</div>
					</div>
				)}

				{zoning.commercial_overlays.length > 0 && (
					<div className="zoning-item">
						<div className="zoning-item-icon">
							<Building2 className="zoning-item-icon-svg" />
						</div>
						<div className="zoning-item-content">
							<div className="zoning-item-label">
                                Commercial Overlays
							</div>
							<div className="zoning-item-value">
								{zoning.commercial_overlays.join(", ")}
							</div>
						</div>
					</div>
				)}

				{zoning.special_districts.length > 0 && (
					<div className="zoning-item">
						<div className="zoning-item-icon">
							<Hash className="zoning-item-icon-svg" />
						</div>
						<div className="zoning-item-content">
							<div className="zoning-item-label">
                                Special Districts
							</div>
							<div className="zoning-item-value">
								{zoning.special_districts.join(", ")}
							</div>
						</div>
					</div>
				)}

				{zoning.limited_height_district && (
					<div className="zoning-item">
						<div className="zoning-item-icon">
							<Building2 className="zoning-item-icon-svg" />
						</div>
						<div className="zoning-item-content">
							<div className="zoning-item-label">
                                Limited Height District
							</div>
							<div className="zoning-item-value">
								{zoning.limited_height_district}
							</div>
						</div>
					</div>
				)}

				{zoning.last_updated && (
					<div className="zoning-item">
						<div className="zoning-item-icon">
							<Clock className="zoning-item-icon-svg" />
						</div>
						<div className="zoning-item-content">
							<div className="zoning-item-label">
                                Last Updated
							</div>
							<div className="zoning-item-value">
								{FORMAT_DATE(zoning.last_updated)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
