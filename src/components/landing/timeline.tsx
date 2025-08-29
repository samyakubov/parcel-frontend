"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"

const TIMELINE = [
	{ title: "Step 1", desc: "Feature 1 explained.", img: "/step1.jpg" },
	{ title: "Step 2", desc: "Feature 2 explained.", img: "/step2.jpg" },
	{ title: "Step 3", desc: "Feature 3 explained.", img: "/step3.jpg" },
]

export default function Timeline() {
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	})

	const markerY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
	const stepProgress: MotionValue<number> = useTransform(
		scrollYProgress,
		[0, 1],
		[0, TIMELINE.length - 1]
	)

	const step0Opacity = useTransform(stepProgress, (p) => {
		const distance = Math.abs(p - 0)
		return distance < 0.5 ? 1 - distance * 2 : 0
	})
	const step1Opacity = useTransform(stepProgress, (p) => {
		const distance = Math.abs(p - 1)
		return distance < 0.5 ? 1 - distance * 2 : 0
	})
	const step2Opacity = useTransform(stepProgress, (p) => {
		const distance = Math.abs(p - 2)
		return distance < 0.5 ? 1 - distance * 2 : 0
	})

	const step0PointerEvents = useTransform(step0Opacity, (o) => (o > 0 ? "auto" : "none"))
	const step1PointerEvents = useTransform(step1Opacity, (o) => (o > 0 ? "auto" : "none"))
	const step2PointerEvents = useTransform(step2Opacity, (o) => (o > 0 ? "auto" : "none"))

	const stepOpacities = [step0Opacity, step1Opacity, step2Opacity]
	const stepPointerEvents = [step0PointerEvents, step1PointerEvents, step2PointerEvents]

	return (
		<section ref={containerRef} className="relative w-full max-w-4xl mx-auto px-6 py-32">
			<div className="relative">
				{/* Vertical line */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-muted rounded-full" />

				{/* Scroll marker */}
				<motion.div
					className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full z-10"
					style={{ top: markerY }}
				/>

				{/* Timeline steps */}
				{TIMELINE.map((step, i) => (
					<motion.div
						key={i}
						className="relative flex items-center justify-center mb-32 w-full"
						style={{ opacity: stepOpacities[i], pointerEvents: stepPointerEvents[i] }}
					>
						{/* Content container with proper spacing from center line */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
							{/* Left side content (even indices) */}
							{i % 2 === 0 && (
								<div className="lg:pr-8 lg:text-right order-1 lg:order-1">
									<h3 className="text-2xl font-bold mb-2">{step.title}</h3>
									<p className="text-muted-foreground mb-4">{step.desc}</p>
									<div className="relative h-64 w-full rounded-2xl overflow-hidden bg-muted">
										<Image src={step.img} alt={step.title} fill className="object-cover" />
									</div>
								</div>
							)}

							{i % 2 === 1 && (
								<div className="lg:pl-8 lg:text-left order-1 lg:order-2">
									<h3 className="text-2xl font-bold mb-2">{step.title}</h3>
									<p className="text-muted-foreground mb-4">{step.desc}</p>
									<div className="relative h-64 w-full rounded-2xl overflow-hidden bg-muted">
										<Image src={step.img} alt={step.title} fill className="object-cover" />
									</div>
								</div>
							)}

							<div className={`hidden lg:block ${i % 2 === 0 ? "order-2" : "order-1"}`} />
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}
