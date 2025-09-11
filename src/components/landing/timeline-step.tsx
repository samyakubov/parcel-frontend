"use client"
import { motion, MotionValue } from "framer-motion"
import Image from "next/image"

interface TimelineStepProps {
    step: TimelineItem;
    i: number;
    stepOpacities: MotionValue<number>[];
    stepPointerEvents: MotionValue<"auto" | "none">[]
}

export default function TimelineStep({ step, i, stepOpacities, stepPointerEvents }: TimelineStepProps) {
	return (
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
	)
}
