"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HEADER_NAV_OPTIONS } from "@/constants/navigation"

export default function FooterNav() {
	return (
		<nav className="flex flex-wrap items-center gap-2">
			{HEADER_NAV_OPTIONS.map((link) => (
				<Button
					key={link.href}
					variant="ghost"
					size="sm"
					asChild
					className="text-foreground hover:text-primary"
				>
					<Link href={link.href}>
						{link.label}
					</Link>
				</Button>
			))}
		</nav>
	)
}
