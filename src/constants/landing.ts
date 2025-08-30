/* eslint-disable max-len */
import {Briefcase, DollarSign, ShieldCheck, Star, TrendingUp, Zap} from "lucide-react"

export const STATS: Stat[] = [
	{ value: "15%+", label: "Increased Home Value" },
	{ value: "30%", label: "Faster Sale Time" },
	{ value: "10k+", label: "Happy Homeowners" },
	{ value: "500k+", label: "Projects Documented" }
]


export const FAQ_QUESTIONS:FaqItem[] = [
	{
		id: "1",
		question: "What is a Home Timeline?",
		answer: "A Home Timeline is a digital record of your home's history, documenting every renovation, repair, and upgrade. It includes photos, costs, contractor details, and dates, giving you a comprehensive overview of your property.",
		hasImage: true,
	},
	{
		id: "2",
		question: "How does a Home Timeline benefit me as a seller?",
		answer: "A detailed Home Timeline builds trust with potential buyers by providing a transparent history of your home's maintenance and improvements. This can lead to a faster sale and a higher selling price.",
	},
	{
		id: "3",
		question: "Is it difficult to create a Home Timeline?",
		answer: "Not at all. Our platform is designed for ease of use. You can quickly add projects, upload photos and receipts, and organize your home's information in one place. We guide you through each step.",
	},
	{
		id: "4",
		question: "What should I include in my Home Timeline?",
		answer: "Document any significant updates to your home. This includes everything from major renovations like a new kitchen to smaller improvements like painting or landscaping. The more details you add, the more valuable your timeline becomes.",
	},
	{
		id: "5",
		question: "How do I share my Home Timeline with buyers?",
		answer: "When you're ready to sell, you can generate a unique, shareable link to your Home Timeline. This allows real estate agents and potential buyers to view your home's detailed history online.",
	},
]


export const TIMELINE: TimelineItem[] = [
	{
		title: "Create Your Home's Profile",
		desc: "Start by setting up a profile for your home. Add basic information, photos, and any existing documents to begin building your home's story.",
		img: "/modern-exterior.jpg",
	},
	{
		title: "Document Every Improvement",
		desc: "Easily track and document every renovation, repair, or upgrade. Upload photos, store contractor details, and keep a record of costs and dates for a complete history.",
		img: "/modern-interior.jpg",
	},
	{
		title: "Share with Confidence",
		desc: "When it's time to sell, share your home's detailed timeline with potential buyers. Provide transparency, build trust, and showcase the true value of your property.",
		img: "/hero-photo.jpg",
	}
]

export const BENEFITS = [
	{
		icon: TrendingUp,
		title: "Increase Property Value",
		description: "A detailed and well-documented home history can significantly increase your property's market value.",
		gradient: "from-green-500/20 to-emerald-500/20"
	},
	{
		icon: ShieldCheck,
		title: "Build Buyer Confidence",
		description: "Provide transparency and build trust with potential buyers by showcasing a complete history of your home.",
		gradient: "from-blue-500/20 to-cyan-500/20"
	},
	{
		icon: Briefcase,
		title: "Simplify Home Management",
		description: "Keep all your home-related documents, contractor information, and project details in one organized place.",
		gradient: "from-purple-500/20 to-pink-500/20"
	},
	{
		icon: Star,
		title: "Showcase Your Investment",
		description: "Highlight the care, quality, and financial investment you've put into your home over the years.",
		gradient: "from-rose-500/20 to-red-500/20"
	},
	{
		icon: Zap,
		title: "Streamline the Sale Process",
		description: "A comprehensive home timeline can help expedite the selling process by providing all necessary information upfront.",
		gradient: "from-yellow-500/20 to-orange-500/20"
	},
	{
		icon: DollarSign,
		title: "Preserve Your Home's Story",
		description: "Create a lasting digital record of your home's evolution, preserving its unique story for future owners.",
		gradient: "from-indigo-500/20 to-blue-500/20"
	}
]
