"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {HEADER_NAV_OPTIONS} from "@/constants/navigation"

export default function Footer() {

	return (
		<footer className="w-full bg-background border-t border-border">
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
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

					<div className="text-2xl font-bold text-foreground">
                        Buildly
					</div>
				</div>
			</div>

		</footer>
	)
}
