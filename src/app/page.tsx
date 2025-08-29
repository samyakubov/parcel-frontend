"use client"

import Hero from "@/components/landing/hero"
import Showcase from "@/components/landing/showcase"
import FAQ from "@/components/landing/faq"

export default function Landing() {
	return (
		<div className="min-h-screen">
			<Hero/>
			<Showcase/>
			<FAQ/>
		</div>
	)
}
