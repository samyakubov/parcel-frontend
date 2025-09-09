import React from "react"
import { DollarSign, Calendar, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import {FORMAT_PRICE} from "@/utils/format-price"
import {FORMAT_DATE} from "@/utils/format-date"

interface PropertyLastSaleProps {
    lastSoldFor: LastSoldFor
}

export default function LastSold(props: PropertyLastSaleProps) {
	const saleData = props.lastSoldFor
	const hasNoSaleData = !saleData.last_sold_price && !saleData.sale_date

	if (hasNoSaleData) {
		return (
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="last-sale-card last-sale-card--error"
			>
				<div className="last-sale-header">
					<div className="last-sale-icon last-sale-icon--error">
						<TrendingUp className="last-sale-icon-svg--error" />
					</div>
					<h3 className="last-sale-title last-sale-title--error">
                        Last Sale Information
					</h3>
				</div>
				<p className="last-sale-error-text">No sale history available</p>
			</motion.div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="last-sale-card last-sale-card--success"
		>
			<div className="last-sale-header">
				<div className="last-sale-icon last-sale-icon--success">
					<TrendingUp className="last-sale-icon-svg--success" />
				</div>
				<h3 className="last-sale-title last-sale-title--success">
                    Last Sale Information
				</h3>
			</div>

			<div className="last-sale-content">
				<div className="last-sale-item">
					<div className="last-sale-item-wrapper">
						<div className="last-sale-item-icon">
							<DollarSign className="last-sale-item-icon-svg" />
						</div>
						<div className="last-sale-item-content">
							<div className="last-sale-item-label">
                                Last Sold Price
							</div>
							{saleData.last_sold_price === 0 ? (
								<p className="last-sale-price-disclaimer">
                                    Price not disclosed: likely a transfer to trust, LLC, or sold pre-ACRIS.
								</p>
							) : (
								<div className="last-sale-price-value">
									{FORMAT_PRICE(saleData.last_sold_price)}
								</div>
							)}
						</div>
					</div>
				</div>

				{saleData.sale_date && (
					<div className="last-sale-item">
						<div className="last-sale-item-wrapper">
							<div className="last-sale-item-icon">
								<Calendar className="last-sale-item-icon-svg" />
							</div>
							<div className="last-sale-item-content">
								<div className="last-sale-item-label">
                                    Sold On
								</div>
								<div className="last-sale-date-value">
									{FORMAT_DATE(saleData.sale_date)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</motion.div>
	)
}
