import React from "react"
import Hero from "../Components/Landing/Hero"
import Subscribe from "../Components/Landing/Subscribe"
import Features from "../Components/Landing/Features"
import Stats from "../Components/Landing/Stats"
import SEOHelmet from "../Components/SEOHelmet"
import Faq from "../Components/Landing/Faq"

export default function Landing() {
	return (
		<>
			<SEOHelmet/>
			<Hero/>
			<Stats/>
			<Features/>
			<Faq/>
			<Subscribe/>
		</>
	)
}
