import React, {useState} from "react"
import Hero from "../Components/Landing/Hero"
import Subscribe from "../Components/Landing/Subscribe"
import Features from "../Components/Landing/Features"
import Stats from "../Components/Landing/Stats"
import Announcement from "../Components/Landing/Announcement"
import SEOHelmet from "../Components/SEOHelmet"
import Faq from "../Components/Landing/Faq"

export default function Landing() {
	const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)
	return (
		<>
			<SEOHelmet/>
			<Announcement title={"This is a test"} isOpen={isAnnouncementOpen} setIsOpen={setIsAnnouncementOpen} />
			<Hero/>
			<Stats/>
			<Features/>
			<Faq/>
			<Subscribe/>
		</>
	)
}
