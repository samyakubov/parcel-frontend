"use client"
import React from "react"
import PropertyTabBar from "@/components/property-details-modal/property-tab-bar"

interface PropertyDetailsModalHeaderProps {
	modal: PropertyModal;
}

export default function PropertyDetailsModalHeader({ modal }: PropertyDetailsModalHeaderProps) {
	const { latitude, longitude } = modal.propertyData.coordinates
	const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=800x600&scale=2&fov=90&pitch=10&location=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_STREETVIEW_API_KEY}`

	return (
		<div className="flex-none">
			<div className="relative h-52 w-full">
				<img
					src={streetViewUrl}
					alt="Street View"
					className="w-full h-full object-cover"
				/>
				{/* Top dark gradient so controls stay readable */}
				<div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent" />
				{/* Bottom gradient fading into modal background */}
				<div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
			</div>

			<div className="px-5 pt-5 pb-3">
				<h1 className="text-2xl font-semibold leading-tight uppercase" style={{ letterSpacing: "-0.8px" }}>
					{modal.title}
				</h1>
			</div>

			<PropertyTabBar modal={modal} />
		</div>
	)
}
