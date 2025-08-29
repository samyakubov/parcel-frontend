"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"

export default function Footer() {
	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Properties", href: "/properties" },
		{ name: "Services", href: "/services" }
	]

	const rightNavLinks = [
		{ name: "Gallery", href: "/gallery" },
		{ name: "FAQ", href: "/faq" },
		{ name: "Pricing", href: "/pricing" },
		{ name: "Contact", href: "/contact" }
	]

	return (
		<footer className="w-full bg-background border-t border-border">
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
					<nav className="flex flex-wrap items-center gap-2">
						{navLinks.map((link) => (
							<Button
								key={link.name}
								variant="ghost"
								size="sm"
								asChild
								className="text-foreground hover:text-primary"
							>
								<Link href={link.href}>
									{link.name}
								</Link>
							</Button>
						))}
					</nav>

					<div className="text-2xl font-bold text-foreground">
                        Buildly
					</div>

					<nav className="flex flex-wrap items-center gap-2">
						{rightNavLinks.map((link) => (
							<Button
								key={link.name}
								variant="ghost"
								size="sm"
								asChild
								className="text-foreground hover:text-primary"
							>
								<Link href={link.href}>
									{link.name}
								</Link>
							</Button>
						))}
					</nav>
				</div>
			</div>

		</footer>
	)
}
