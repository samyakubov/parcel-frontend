import { makeAutoObservable, runInAction } from "mobx"
import { apiClient } from "@/api/api-client"
import { HeatmapResponse } from "@/types/heatmap"

class HeatmapStore {
	constructor() {
		makeAutoObservable(this)
	}

	public isHeatmapVisible: boolean = false
	public heatmapData: HeatmapResponse | null = null
	public isLoading: boolean = false
	public error: string | null = null

	public toggleHeatmap = async () => {
		this.isHeatmapVisible = !this.isHeatmapVisible

		if (this.isHeatmapVisible && !this.heatmapData) {
			await this.fetchHeatmapData()
		}
	}

	public fetchHeatmapData = async () => {
		this.isLoading = true
		this.error = null

		try {
			const data = await apiClient.heatmapService.getZipcodeHeatmap()
			runInAction(() => {
				this.heatmapData = data
				this.isLoading = false
			})
		} catch (error: unknown) {
			runInAction(() => {
				this.error = error instanceof Error ? error.message : "Failed to fetch heatmap data"
				this.isLoading = false
				this.isHeatmapVisible = false // Turn off if it fails to load
			})
		}
	}
}

export const heatmapStore = new HeatmapStore()
