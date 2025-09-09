"use client"
import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import isArray from "lodash-es/isArray"
import isUndefined from "lodash-es/isUndefined"
import React, { useState, useMemo } from "react"
import { Users, Search, ChevronDown, ChevronUp, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface OwnerProps {
    currentOwners: string[];
    previousOwners: string[];
}

// eslint-disable-next-line complexity
export default function Owners(props: OwnerProps) {
	const { currentOwners, previousOwners } = props

	const [searchTerm, setSearchTerm] = useState<string>("")
	const [previousOwnersSearchTerm, setPreviousOwnersSearchTerm] = useState<string>("")
	const [isPreviousOwnersOpen, setIsPreviousOwnersOpen] = useState<boolean>(false)

	const filteredOwners = useMemo(() => {
		if (!isArray(currentOwners)) return []

		if (!searchTerm.trim()) return currentOwners

		return currentOwners.filter(owner =>
			owner.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [currentOwners, searchTerm])

	const filteredPreviousOwners = useMemo(() => {
		if (!isArray(previousOwners)) return []

		if (!previousOwnersSearchTerm.trim()) return previousOwners

		return previousOwners.filter(owner =>
			owner.toLowerCase().includes(previousOwnersSearchTerm.toLowerCase())
		)
	}, [previousOwners, previousOwnersSearchTerm])

	const sortedOwners = useMemo(() => {
		return filteredOwners.slice().sort((a, b) => a.localeCompare(b))
	}, [filteredOwners])

	const sortedPreviousOwners = useMemo(() => {
		return filteredPreviousOwners.slice().sort((a, b) => a.localeCompare(b))
	}, [filteredPreviousOwners])

	if (isNull(currentOwners) || isEmpty(currentOwners) || isUndefined(currentOwners)) {
		return (
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="owners-card owners-card--error"
			>
				<div className="owners-header">
					<div className="owners-icon owners-icon--error">
						<Users className="owners-icon-svg--error" />
					</div>
					<h3 className="owners-title owners-title--error">
                        Owners
					</h3>
				</div>
				<p className="owners-error-text">No owners found.</p>
			</motion.div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="owners-card owners-card--success"
		>
			<div className="owners-header">
				<div className="owners-icon owners-icon--success">
					<Users className="owners-icon-svg--success"/>
				</div>
				<h3 className="owners-title owners-title--success">
                    Owners
				</h3>
			</div>

			<div className="owners-content">
				<div className="owners-search-wrapper">
					<div className="owners-search-icon">
						<Search className="owners-search-icon-svg" />
					</div>
					<input
						type="text"
						className="owners-search-input owners-search-input--current"
						placeholder="Search current owners..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				{sortedOwners.length > 0 ? (
					<div className="owners-list-container owners-list-container--current">
						<ul className="owners-list owners-list--current">
							{sortedOwners.map((owner, index) => (
								<li
									key={index}
									className="owners-list-item owners-list-item--current"
								>
									<span className="owners-list-item-text owners-list-item-text--current">
										{owner}
									</span>
								</li>
							))}
						</ul>
					</div>
				) : (
					<div className="owners-empty-state">
						<div className="owners-empty-state-icon">
							<Search className="owners-empty-state-icon-svg" />
						</div>
						<p className="owners-empty-state-text">No matching current owners found.</p>
					</div>
				)}
			</div>

			{isArray(previousOwners) && previousOwners.length > 0 && (
				<div>
					<div
						className="previous-owners-toggle"
						onClick={() => setIsPreviousOwnersOpen(!isPreviousOwnersOpen)}
					>
						<div className="previous-owners-toggle-content">
							<div className="previous-owners-toggle-icon">
								<Clock className="previous-owners-toggle-icon-svg" />
							</div>
							<h4 className="previous-owners-toggle-title">
                                Previous Owners ({previousOwners.length})
							</h4>
						</div>
						{isPreviousOwnersOpen ? (
							<ChevronUp className="previous-owners-chevron" />
						) : (
							<ChevronDown className="previous-owners-chevron" />
						)}
					</div>

					{isPreviousOwnersOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="owners-search-wrapper">
								<div className="owners-search-icon">
									<Search className="owners-search-icon-svg" />
								</div>
								<input
									type="text"
									className="owners-search-input owners-search-input--previous"
									placeholder="Search previous owners..."
									value={previousOwnersSearchTerm}
									onChange={(e) => setPreviousOwnersSearchTerm(e.target.value)}
								/>
							</div>

							{sortedPreviousOwners.length > 0 ? (
								<div className="owners-list-container owners-list-container--previous">
									<ul className="owners-list owners-list--previous">
										{sortedPreviousOwners.map((owner, index) => (
											<li
												key={index}
												className="owners-list-item owners-list-item--previous"
											>
												<span className="owners-list-item-text owners-list-item-text--previous">
													{owner}
												</span>
											</li>
										))}
									</ul>
								</div>
							) : (
								<div className="owners-empty-state">
									<div className="owners-empty-state-icon">
										<Search className="owners-empty-state-icon-svg" />
									</div>
									<p className="owners-empty-state-text">No matching previous owners found.</p>
								</div>
							)}
						</motion.div>
					)}
				</div>
			)}
		</motion.div>
	)
}
