import { action, makeAutoObservable, runInAction } from "mobx"
import { gtfsParser, GTFSParseProgress, GTFSParseOptions, RouteInfo, StopInfo } from "@/utils/gtfs-parser"

interface RouteLoadingState {
	isLoading: boolean
	progress: number
	stage: string
	message: string
	error: string | null
}

class RouteStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _routeData: GeoJSON.FeatureCollection | null = null
	public _stopsData: GeoJSON.FeatureCollection | null = null
	public _loadingState: RouteLoadingState = {
		isLoading: false,
		progress: 0,
		stage: '',
		message: '',
		error: null
	}
	public _hoveredRoute: string | null = null
	public _tooltipPosition: { x: number; y: number } = { x: 0, y: 0 }
	public _hoveredRouteInfo: RouteInfo | null = null
	public _hoveredStopInfo: StopInfo | null = null
	private _abortController: AbortController | null = null

	public get isLoading(): boolean {
		return this._loadingState.isLoading
	}

	public get error(): string | null {
		return this._loadingState.error
	}

	public get loadingProgress(): number {
		return this._loadingState.progress
	}

	public get loadingMessage(): string {
		return this._loadingState.message
	}

	public setRouteData = action((data: { routes: GeoJSON.FeatureCollection, stops: GeoJSON.FeatureCollection } | null) => {
		if (data) {
			this._routeData = data.routes
			this._stopsData = data.stops
		} else {
			this._routeData = null
			this._stopsData = null
		}
	})


	public setLoadingState = action((state: Partial<RouteLoadingState>) => {
		Object.assign(this._loadingState, state)
	})

	public setLoading = action((loading: boolean) => {
		this._loadingState.isLoading = loading
		if (!loading) {
			this._loadingState.progress = 0
			this._loadingState.stage = ''
			this._loadingState.message = ''
		}
	})

	public setError = action((error: string | null) => {
		this._loadingState.error = error
		if (error) {
			this._loadingState.isLoading = false
		}
	})

	public setHoveredRoute = action((routeId: string | null) => {
		this._hoveredRoute = routeId
	})

	public setHoveredRouteInfo = action((routeInfo: RouteInfo | null) => {
		this._hoveredRouteInfo = routeInfo
	})

	public setHoveredStopInfo = action((stopInfo: StopInfo | null) => {
		this._hoveredStopInfo = stopInfo
	})

	public setTooltipPosition = action((position: { x: number; y: number }) => {
		this._tooltipPosition = position
	})



	public clearRouteSelection = action(() => {
		this._hoveredRoute = null
		this._hoveredRouteInfo = null
	})

	/**
	 * Load GTFS data with progress tracking and error handling
	 */
	public loadRouteData = action(async (options: GTFSParseOptions = {}) => {
		// Cancel any existing loading operation
		if (this._abortController) {
			this._abortController.abort()
		}

		this._abortController = new AbortController()

		const loadOptions: GTFSParseOptions = {
			...options,
			signal: this._abortController.signal,
			onProgress: (progress: GTFSParseProgress) => {
				runInAction(() => {
					this.setLoadingState({
						progress: progress.progress,
						stage: progress.stage,
						message: progress.message,
						error: null
					})
				})
			}
		}

		try {
			this.setLoadingState({
				isLoading: true,
				progress: 0,
				stage: 'loading',
				message: 'Starting GTFS data loading...',
				error: null
			})

			const result = await gtfsParser.parseGTFSFiles(loadOptions)

			runInAction(() => {
				this.setRouteData(result)
				this.setLoadingState({
					isLoading: false,
					progress: 100,
					stage: 'complete',
					message: `Loaded ${result.routes.features.length} bus routes and ${result.stops.features.length} stops`,
					error: null
				})
			})

			return result
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

			runInAction(() => {
				this.setLoadingState({
					isLoading: false,
					progress: 0,
					stage: 'error',
					message: '',
					error: errorMessage
				})
			})

			if (errorMessage !== 'GTFS parsing was aborted') {
				throw error
			}
		} finally {
			this._abortController = null
		}
	})

	/**
	 * Cancel ongoing loading operation
	 */
	public cancelLoading = action(() => {
		if (this._abortController) {
			this._abortController.abort()
			this._abortController = null
		}

		this.setLoadingState({
			isLoading: false,
			progress: 0,
			stage: '',
			message: 'Loading cancelled',
			error: null
		})
	})

	/**
	 * Retry loading with exponential backoff
	 */
	public retryLoading = action(async (maxRetries: number = 3) => {
		let attempt = 0

		while (attempt < maxRetries) {
			try {
				await this.loadRouteData()
				return // Success
			} catch (error) {
				attempt++

				if (attempt >= maxRetries) {
					throw error // Final attempt failed
				}

				// Exponential backoff
				const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)

				runInAction(() => {
					this.setLoadingState({
						message: `Retrying in ${delay / 1000}s... (attempt ${attempt + 1}/${maxRetries})`,
						error: null
					})
				})

				await new Promise(resolve => setTimeout(resolve, delay))
			}
		}
	})

	/**
	 * Clear cache and reload data
	 */
	public refreshData = action(async () => {
		// Clear cache first
		try {
			localStorage.removeItem('gtfs-route-data')
		} catch (error) {
			console.warn('Could not clear cache:', error)
		}

		// Reload with fresh data
		await this.loadRouteData({ useCache: false })
	})

	public cleanup = action(() => {
		// Cancel any ongoing operations
		if (this._abortController) {
			this._abortController.abort()
			this._abortController = null
		}

		// Reset all state
		this._routeData = null
		this._stopsData = null
		this._loadingState = {
			isLoading: false,
			progress: 0,
			stage: '',
			message: '',
			error: null
		}
		this._hoveredRoute = null
		this._hoveredRouteInfo = null
		this._hoveredStopInfo = null
		this._tooltipPosition = { x: 0, y: 0 }
	})
}

export const routeStore = new RouteStore()
