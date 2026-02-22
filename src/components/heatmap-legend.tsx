"use client"
import { observer } from "mobx-react"
import { heatmapStore } from "@/stores/heatmap-store"
import {LEGEND_LAYERS} from "@/constants/mapbox"


function HeatmapLegend() {
	if (!heatmapStore.isHeatmapVisible) return null

	return (
		<div className="absolute bottom-8 left-4 z-10 bg-background/95 backdrop-blur-sm border border-border p-4 rounded-lg shadow-lg">
			<h4 className="font-semibold text-sm mb-3">Price per SqFt</h4>
			<div className="flex flex-col gap-1.5">
				{LEGEND_LAYERS.map((item) => (
					<div key={item.color} className="flex items-center gap-2">
						<div
							className="w-4 h-4 rounded-sm shadow-sm"
							style={{ backgroundColor: item.color }}
						/>
						<span className="text-xs font-medium text-foreground/80">{item.label}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(HeatmapLegend)
