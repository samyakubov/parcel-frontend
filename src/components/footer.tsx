"use client"
import FooterNav from "@/components/footer/footer-nav"
import SocialLinks from "@/components/footer/social-links"

export default function Footer() {
	return (
		<footer className="w-full">
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
					<FooterNav />
					<div className="text-2xl items-center font-bold text-foreground">
                        Buildly
					</div>
					<SocialLinks />
				</div>
			</div>

		</footer>
	)
}
