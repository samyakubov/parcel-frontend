"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { TIMELINE } from "@/constants/landing"
import TimelineStep from "@/components/landing/timeline-step"

export default function Timeline() {
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start center", "end center"],
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
			return distance < 2 ? Math.max(0, 1 - distance * 0.8) : 0
		})
	)

	const stepPointerEvents = stepOpacities.map((opacity) =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
		useTransform(opacity, (o) => (o > 0 ? "auto" : "none"))
	)

	return (
		<section ref={containerRef} className="relative w-full mx-auto px-8 py-40" id="timeline">
			<div className="relative">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-border rounded-full" />

				<motion.div
					className="absolute left-1/2 -translate-x-1/2 w-10 h-10 border-4 border-secondary rounded-full z-20"
					style={{ top: markerY }}
				/>

				{TIMELINE.map((step, i) => (
					<TimelineStep key={i} step={step} i={i} stepOpacities={stepOpacities} stepPointerEvents={stepPointerEvents } />
				))}
			</div>
		</section>
	)
}
