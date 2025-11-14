/* eslint-disable max-len */
import {Briefcase, DollarSign, ShieldCheck, Star, TrendingUp, Zap} from "lucide-react"

export const STATS: Stat[] = [
	{ value: "10M+", label: "Property Records" },
	{ value: "50+", label: "Cities Covered" },
	{ value: "100k+", label: "Active Users" },
	{ value: "24/7", label: "Data Updates" }
]


export const FAQ_QUESTIONS:FaqItem[] = [
	{
		id: "1",
		question: "What information can I find about a property?",
		answer: "You can access comprehensive property records including ownership history, sale prices, building permits, violations, complaints, zoning information, mortgage details, and more. All data is sourced from official public records.",
		hasImage: true,
	},
	{
		id: "2",
		question: "How accurate and up-to-date is the property data?",
		answer: "Our platform aggregates data from official government sources and public records databases. We update our records regularly to ensure you have access to the most current information available.",
	},
	{
		id: "3",
		question: "Can I search for any property address?",
		answer: "Yes! Simply enter any property address in the search bar to access its complete record history. Our database covers millions of properties across multiple cities and continues to expand.",
	},
	{
		id: "4",
		question: "Is this service free to use?",
		answer: "We offer both free and premium tiers. Basic property information is available to all users, while detailed reports and advanced features are available with a premium subscription.",
	},
	{
		id: "5",
		question: "How can property records help me make better decisions?",
		answer: "Access to comprehensive property records helps you make informed decisions whether you're buying, selling, or managing property. Discover potential issues, verify claims, understand property value, and gain insights into neighborhood trends.",
	},
]


export const TIMELINE: TimelineItem[] = [
	{
		title: "Search Any Property",
		desc: "Enter any property address to instantly access comprehensive records. Our intuitive search makes it easy to find the information you need.",
		img: "/modern-exterior.jpg",
	},
	{
		title: "Explore Detailed Records",
		desc: "View ownership history, sale prices, building permits, violations, complaints, zoning details, and more. All official records in one place.",
		img: "/modern-interior.jpg",
	},
	{
		title: "Make Informed Decisions",
		desc: "Use comprehensive property data to make confident decisions about buying, selling, or managing real estate. Knowledge is power.",
		img: "/hero-photo.jpg",
	}
]

export const BENEFITS = [
	{
		icon: TrendingUp,
		title: "Comprehensive Property Data",
		description: "Access complete property records including ownership history, sales data, permits, violations, and more in one place.",
		gradient: "from-green-500/20 to-emerald-500/20"
	},
	{
		icon: ShieldCheck,
		title: "Verified Public Records",
		description: "All data is sourced from official government databases and public records, ensuring accuracy and reliability.",
		gradient: "from-blue-500/20 to-cyan-500/20"
	},
	{
		icon: Briefcase,
		title: "Smart Property Search",
		description: "Easily search any property address and instantly access detailed records with our intuitive interface.",
		gradient: "from-purple-500/20 to-pink-500/20"
	},
	{
		icon: Star,
		title: "Uncover Hidden Issues",
		description: "Discover violations, complaints, and potential problems before making important property decisions.",
		gradient: "from-rose-500/20 to-red-500/20"
	},
	{
		icon: Zap,
		title: "Real-Time Updates",
		description: "Stay informed with regularly updated property records and notifications about changes to properties you track.",
		gradient: "from-yellow-500/20 to-orange-500/20"
	},
	{
		icon: DollarSign,
		title: "Make Informed Decisions",
		description: "Use comprehensive data to evaluate property value, assess risks, and make confident real estate decisions.",
		gradient: "from-indigo-500/20 to-blue-500/20"
	}
]
