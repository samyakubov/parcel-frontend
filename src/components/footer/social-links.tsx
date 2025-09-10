"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Linkedin } from "lucide-react"

export default function SocialLinks() {
	return (
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
	)
}
