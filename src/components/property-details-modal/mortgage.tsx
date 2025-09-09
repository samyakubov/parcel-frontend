"use client"
import React from "react"
import { DollarSign, Calendar, Building2, Landmark } from "lucide-react"
import {FORMAT_PRICE} from "@/utils/format-price"
import {FORMAT_DATE} from "@/utils/format-date"

interface MortgageDetailsProps {
    borrower: PropertyRecord
    lender: PropertyRecord
}

export default function Mortgage(props: MortgageDetailsProps) {
	const { recordedfiled, amount } = props.borrower
	const lenderName = props.lender.party_name

	return (
		<div className="mortgage-container">
			<div className="mortgage-header">
				<div className="mortgage-icon-container">
					<Building2 className="mortgage-icon" />
				</div>
				<h3 className="mortgage-title">
                    Mortgage Details
				</h3>
			</div>

			<div className="mortgage-content">
				<div className="mortgage-item">
					<div className="mortgage-item-icon-container">
						<Landmark className="mortgage-item-icon" />
					</div>
					<div className="mortgage-item-content">
						<div className="mortgage-item-label">
                            Lender
						</div>
						<div className="mortgage-lender-name">
							{lenderName}
						</div>
					</div>
				</div>

				<div className="mortgage-item">
					<div className="mortgage-item-icon-container">
						<DollarSign className="mortgage-item-icon" />
					</div>
					<div className="mortgage-item-content">
						<div className="mortgage-item-label">
                            Amount
						</div>
						<div className="mortgage-amount">
                            ${FORMAT_PRICE(amount)}
						</div>
					</div>
				</div>

				<div className="mortgage-item">
					<div className="mortgage-item-icon-container">
						<Calendar className="mortgage-item-icon" />
					</div>
					<div className="mortgage-item-content">
						<div className="mortgage-item-label">
                            Recorded On
						</div>
						<div className="mortgage-date">
							{FORMAT_DATE(recordedfiled)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
