import React from "react"
import { Linkedin, Mail } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

const Footer = () => {
	const socialLinks = [
		{ icon: Linkedin, href: process.env.REACT_APP_LINKEDIN_URL, label: "LinkedIn" },
		{ icon: Mail, href: "mailto:" + process.env.REACT_APP_MAILTO, label: "Email" },
	]

	return (
		<footer className="bg-white dark:bg-gray-900 py-4 relative">
			<div className="container mx-auto px-4 flex items-center justify-between">
				<h2 className="text-xl font-bold text-gray-800 dark:text-white">
					Parcel
				</h2>

				<div className="flex items-center gap-4">
					{socialLinks.map(({ icon: Icon, href, label }) => (
						<a
							key={label}
							href={href}
							className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
							aria-label={label}
						>
							<Icon size={18} />
						</a>
					))}
					<div className="ml-2">
						<ThemeToggle />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
