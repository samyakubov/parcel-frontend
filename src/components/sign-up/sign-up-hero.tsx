"use client"
import React from "react"

export default function SignUpHero() {
	return (
		<div className="flex-1 relative overflow-hidden bg-gradient-to-br rounded-l-3xl">
			<div
				className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url(landing-page-assets/signup-background-photo.jpg)" }}
			/>
			<div className="absolute inset-0 backdrop-blur-md" />
			<div className="relative z-10 h-full flex flex-col justify-center items-end p-8 text-right">
				<h2 className="text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 leading-tight drop-shadow-lg">
					Start Your <span className="text-accent">Timeline</span>
				</h2>
				<p className="text-xl md:text-2xl text-primary-foreground/90 max-w-lg leading-relaxed drop-shadow-md">
					Document every upgrade and create a lasting story of your home&apos;s evolution
				</p>
			</div>
		</div>
	)
}
