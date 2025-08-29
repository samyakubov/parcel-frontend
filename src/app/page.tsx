"use client"

import Hero from "@/components/landing/hero"
import Timeline from "@/components/landing/timeline"
import FAQ from "@/components/landing/faq"

export default function Landing() {
	return (
		<div className="min-h-screen">
			<Hero/>
			<Timeline/>
			<FAQ/>
		</div>
	)
}
