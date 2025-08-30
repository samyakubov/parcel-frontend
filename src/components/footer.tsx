"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Linkedin } from "lucide-react"
import {HEADER_NAV_OPTIONS} from "@/constants/navigation"

export default function Footer() {
	return (
		<footer className="w-full">
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
					<div className="text-2xl items-center font-bold text-foreground">
                        Buildly
					</div>
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
								<Button
									variant="ghost"
									size="sm"
									className="text-muted-foreground hover:text-foreground hover:bg-accent/50
									transition-all duration-300 p-2 rounded-full hover:scale-110"
								>
									<Instagram size={18} />
								</Button>
							</Link>

							<Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
								<Button
									variant="ghost"
									size="sm"
									className="text-muted-foreground hover:text-foreground hover:bg-accent/50
									transition-all duration-300 p-2 rounded-full hover:scale-110"
								>
									<Twitter size={18} />
								</Button>
							</Link>

							<Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
								<Button
									variant="ghost"
									size="sm"
									className="text-muted-foreground hover:text-foreground
									hover:bg-accent/50 transition-all duration-300 p-2 rounded-full hover:scale-110"
								>
									<Linkedin size={18} />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>

		</footer>
	)
}
