"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"
import {TIMELINE} from "@/constants/landing"



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

	const stepOpacities = TIMELINE.map((item, i) =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
		useTransform(stepProgress, (p) => {
			const distance = Math.abs(p - i)
			return distance < 0.5 ? 1 - distance * 2 : 0
		})
	)

	const stepPointerEvents = stepOpacities.map((opacity) =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
		useTransform(opacity, (o) => (o > 0 ? "auto" : "none"))
	)

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
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
							<div
								className={`order-1 ${
									i % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8 lg:text-left lg:order-2"
								}`}
							>
								<h3 className="text-2xl font-bold mb-2">{step.title}</h3>
								<p className="text-muted-foreground mb-4">{step.desc}</p>
								<div className="relative h-64 w-full rounded-2xl overflow-hidden bg-muted">
									<Image src={step.img} alt={step.title} fill className="object-cover" />
								</div>
							</div>
							<div className={`hidden lg:block ${i % 2 === 0 ? "order-2" : "order-1"}`} />
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}
