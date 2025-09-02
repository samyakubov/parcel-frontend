"use client"
import Hero from "@/components/landing/hero"
import Timeline from "@/components/landing/timeline"
import FAQ from "@/components/landing/faq"
import Stats from "@/components/landing/stats"
import Benefits from "@/components/landing/benefits"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Landing() {
	return (
		<div className="min-h-screen">
			<Header />
			<Hero/>
			<Stats/>
			<Timeline/>
			<Benefits/>
			<FAQ/>
			<Footer/>
		</div>
	)
}
