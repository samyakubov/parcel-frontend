"use client"

import Hero from "@/components/landing/hero"
import Timeline from "@/components/landing/timeline"
import FAQ from "@/components/landing/faq"
import Stats from "@/components/landing/stats"

export default function Landing() {
	return (
		<div className="min-h-screen">
			<Hero/>
			<Stats/>
			<Timeline/>
			<FAQ/>
		</div>
	)
}
