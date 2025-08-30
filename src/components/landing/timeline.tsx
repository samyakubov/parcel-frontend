"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"
import { TIMELINE } from "@/constants/landing"

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
					<motion.div
						key={i}
						className="relative flex items-center justify-center mb-40 w-full"
						style={{ opacity: stepOpacities[i], pointerEvents: stepPointerEvents[i] }}
					>
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
						w-8 h-8 border-2 border-border rounded-full z-10" />

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
							<div
								className={`order-1 flex gap-6 ${
									i % 2 === 0 ? "lg:pr-12 lg:flex-row" : "lg:pl-12 lg:flex-row-reverse lg:order-2"
								}`}
							>
								<div className="flex-1">
									<h3 className="text-3xl font-bold mb-4">{step.title}</h3>
									<p className="text-lg text-muted-foreground mb-6">{step.desc}</p>
								</div>
								<div className="relative h-96 w-[32rem] flex-shrink-0 rounded-3xl overflow-hidden bg-muted">
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
