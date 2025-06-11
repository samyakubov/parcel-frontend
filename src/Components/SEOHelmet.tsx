import React from "react"
import { Helmet } from "react-helmet-async"

interface SEOHelmetProps {
	title?: string,
	description?: string,
	keywords?: string
}

export default function SEOHelmet({title = "Parcel", description = "Comprehensive property database system for real estate records, property management, and documentation tracking", keywords = "property database, real estate records, property management, real estate documentation, property tracking, real estate data, property records search, real estate database, property information system, real estate management software, property documentation system, real estate data management, property records database, real estate record keeping, property data tracking"}: SEOHelmetProps) {
	const formattedKeywords = [
		...(keywords.split(",").map(k => k.trim())),
		"property database",
		"real estate records",
		"property management",
		"real estate documentation",
		"property tracking",
		"real estate data",
		"property records search",
		"real estate database",
		"property information",
		"real estate management",
		"property documentation",
		"real estate data management",
		"property records",
		"real estate records",
		"property data"
	].filter((value, index, self) => self.indexOf(value) === index)
		.filter(Boolean)
		.join(", ")

	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={formattedKeywords} />
		</Helmet>
	)
}
