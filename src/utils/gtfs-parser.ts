
interface GTFSShape {
	shape_id: string
	shape_pt_lat: string
	shape_pt_lon: string
	shape_pt_sequence: string
}

interface GTFSRoute {
	route_id: string
	agency_id: string
	route_short_name: string
	route_long_name: string
	route_desc: string
	route_type: string
	route_color: string
	route_text_color: string
}

interface GTFSTrip {
	route_id: string
	service_id: string
	trip_id: string
	trip_headsign: string
	direction_id: string
	block_id: string
	shape_id: string
}

export interface RouteInfo {
	route_id: string
	route_short_name: string
	route_long_name: string
	route_color: string
	route_type: number
}

export interface Coordinate {
	longitude: number
	latitude: number
}

export interface GTFSParseProgress {
	stage: 'loading' | 'parsing-shapes' | 'parsing-routes' | 'parsing-trips' | 'linking' | 'complete'
	progress: number
	message: string
	processedCount?: number
	totalCount?: number
}

export interface GTFSCacheEntry {
	data: GeoJSON.FeatureCollection
	timestamp: number
	version: string
}

export interface GTFSParseOptions {
	useCache?: boolean
	cacheExpiry?: number
	chunkSize?: number
	onProgress?: (progress: GTFSParseProgress) => void
	signal?: AbortSignal
}

// GeoJSON interfaces
export interface RouteFeatureProperties {
	routeId: string
	routeName: string
	routeColor: string
	routeLongName: string
}

export interface RouteFeature extends GeoJSON.Feature {
	geometry: {
		type: "LineString"
		coordinates: [number, number][]
	}
	properties: RouteFeatureProperties
}

export class GTFSParser {
	private static readonly CACHE_KEY = 'gtfs-route-data'
	private static readonly CACHE_VERSION = '1.0.0'
	private static readonly DEFAULT_CACHE_EXPIRY = 24 * 60 * 60 * 1000
	private static readonly DEFAULT_CHUNK_SIZE = 1000

	private abortController: AbortController | null = null
	private progressCallback: ((progress: GTFSParseProgress) => void) | null = null

	private logProgress(message: string, stage?: GTFSParseProgress['stage'], progress?: number): void {
		const timestamp = new Date().toISOString()
		console.log(`[GTFS Parser] ${timestamp}: ${message}`)

		if (this.progressCallback && stage) {
			this.progressCallback({
				stage,
				progress: progress || 0,
				message
			})
		}
	}

	private logError(message: string, error?: unknown): void {
		console.error(`[GTFS Parser ERROR] ${new Date().toISOString()}: ${message}`, error || "")
	}

	private checkAborted(): void {
		if (this.abortController?.signal.aborted) {
			throw new Error('GTFS parsing was aborted')
		}
	}

	private getCachedData(cacheExpiry: number): GeoJSON.FeatureCollection | null {
		try {
			const cached = localStorage.getItem(GTFSParser.CACHE_KEY)
			if (!cached) return null

			const cacheEntry: GTFSCacheEntry = JSON.parse(cached)

			if (cacheEntry.version !== GTFSParser.CACHE_VERSION) {
				localStorage.removeItem(GTFSParser.CACHE_KEY)
				return null
			}

			const now = Date.now()
			if (now - cacheEntry.timestamp > cacheExpiry) {
				localStorage.removeItem(GTFSParser.CACHE_KEY)
				return null
			}

			this.logProgress('Using cached GTFS data', 'complete', 100)
			return cacheEntry.data
		} catch (error) {
			this.logError('Error reading cache', error)
			localStorage.removeItem(GTFSParser.CACHE_KEY)
			return null
		}
	}

	private setCachedData(data: GeoJSON.FeatureCollection): void {
		try {
			const cacheEntry: GTFSCacheEntry = {
				data,
				timestamp: Date.now(),
				version: GTFSParser.CACHE_VERSION
			}

			localStorage.setItem(GTFSParser.CACHE_KEY, JSON.stringify(cacheEntry))
			this.logProgress('GTFS data cached successfully')
		} catch (error) {
			this.logError('Error caching data', error)
		}
	}

	private async parseCSVStream(csvText: string, chunkSize: number): Promise<string[][]> {
		const lines = csvText.split('\n')
		const result: string[][] = []
		let processedLines = 0

		for (let i = 0; i < lines.length; i += chunkSize) {
			this.checkAborted()

			const chunk = lines.slice(i, Math.min(i + chunkSize, lines.length))

			for (const line of chunk) {
				if (line.trim()) {
					const fields: string[] = []
					let current = ""
					let inQuotes = false

					for (let j = 0; j < line.length; j++) {
						const char = line[j]

						if (char === "\"") {
							inQuotes = !inQuotes
						} else if (char === "," && !inQuotes) {
							fields.push(current.trim())
							current = ""
						} else {
							current += char
						}
					}

					fields.push(current.trim())
					result.push(fields)
				}
			}

			processedLines += chunk.length

			if (this.progressCallback) {
				const progress = Math.round((processedLines / lines.length) * 100)
				this.progressCallback({
					stage: 'loading',
					progress,
					message: `Processing CSV data: ${processedLines}/${lines.length} lines`,
					processedCount: processedLines,
					totalCount: lines.length
				})
			}

			if (i % (chunkSize * 5) === 0) {
				await new Promise(resolve => setTimeout(resolve, 0))
			}
		}

		return result
	}

	private csvToObjects<T>(csvData: string[][]): T[] {
		if (csvData.length === 0) return []

		const headers = csvData[0]
		const objects: T[] = []

		for (let i = 1; i < csvData.length; i++) {
			const row = csvData[i]
			const obj: Record<string, string> = {}

			for (let j = 0; j < headers.length && j < row.length; j++) {
				obj[headers[j]] = row[j]
			}

			objects.push(obj as T)
		}

		return objects
	}

	private validateCoordinates(shape: GTFSShape): { latitude: number; longitude: number } | null {
		if (!shape.shape_id || !shape.shape_pt_lat || !shape.shape_pt_lon) {
			return null
		}

		const latitude = parseFloat(shape.shape_pt_lat)
		const longitude = parseFloat(shape.shape_pt_lon)

		if (isNaN(latitude) || isNaN(longitude)) {
			this.logError(
				`Invalid coordinates for shape ${shape.shape_id}: lat=${shape.shape_pt_lat}, lon=${shape.shape_pt_lon}`
			)
			return null
		}

		const isValidLatitude = latitude >= 40.4 && latitude <= 40.9
		const isValidLongitude = longitude >= -74.3 && longitude <= -73.7

		if (!isValidLatitude || !isValidLongitude) {
			this.logError(
				`Coordinates out of NYC bounds for shape ${shape.shape_id}: lat=${latitude}, lon=${longitude}`
			)
			return null
		}

		return { latitude, longitude }
	}

	async parseShapes(shapesData: string, chunkSize: number = GTFSParser.DEFAULT_CHUNK_SIZE): Promise<Map<string, Coordinate[]>> {
		this.logProgress("Starting shapes parsing...", 'parsing-shapes', 0)

		const shapesMap = new Map<string, Coordinate[]>()
		let processedCount = 0
		let errorCount = 0

		try {
			const csvData = await this.parseCSVStream(shapesData, chunkSize)
			const shapes = this.csvToObjects<GTFSShape>(csvData)
			const totalShapes = shapes.length

			for (let i = 0; i < shapes.length; i += chunkSize) {
				this.checkAborted()

				const chunk = shapes.slice(i, Math.min(i + chunkSize, shapes.length))

				for (const shape of chunk) {
					try {
						const coords = this.validateCoordinates(shape)
						if (!coords) {
							errorCount++
							continue
						}

						if (!shapesMap.has(shape.shape_id)) {
							shapesMap.set(shape.shape_id, [])
						}

						const shapeCoords = shapesMap.get(shape.shape_id)
						if (shapeCoords) {
							shapeCoords.push({
								longitude: coords.longitude,
								latitude: coords.latitude
							})
						}

						processedCount++
					} catch (error) {
						this.logError(`Error processing shape record: ${JSON.stringify(shape)}`, error)
						errorCount++
					}
				}

				const progress = Math.round(((i + chunk.length) / totalShapes) * 100)
				this.logProgress(
					`Processing shapes: ${i + chunk.length}/${totalShapes}`,
					'parsing-shapes',
					progress
				)

				if (i % (chunkSize * 10) === 0) {
					await new Promise(resolve => setTimeout(resolve, 0))
				}
			}

			this.logProgress(
				`Shapes parsing complete. Processed: ${processedCount}, Errors: ${errorCount}, Unique shapes: ${shapesMap.size}`,
				'parsing-shapes',
				100
			)
		} catch (error) {
			this.logError("Critical error in shapes parsing", error)
			throw error
		}

		return shapesMap
	}


	private processRoute(route: GTFSRoute): RouteInfo | null {
		if (!route.route_id || !route.route_type) {
			return null
		}

		const routeType = parseInt(route.route_type)

		if (routeType !== 3) {
			return null
		}

		return {
			route_id: route.route_id,
			route_short_name: route.route_short_name || route.route_id,
			route_long_name: route.route_long_name || "",
			route_color: route.route_color ? `#${route.route_color}` : "#0066CC",
			route_type: routeType
		}
	}

	async parseRoutes(routesData: string, chunkSize: number = GTFSParser.DEFAULT_CHUNK_SIZE): Promise<Map<string, RouteInfo>> {
		this.logProgress("Starting routes parsing...", 'parsing-routes', 0)

		const routesMap = new Map<string, RouteInfo>()
		let processedCount = 0
		let errorCount = 0
		let busRouteCount = 0

		try {
			const csvData = await this.parseCSVStream(routesData, chunkSize)
			const routes = this.csvToObjects<GTFSRoute>(csvData)
			const totalRoutes = routes.length

			for (let i = 0; i < routes.length; i += chunkSize) {
				this.checkAborted()

				const chunk = routes.slice(i, Math.min(i + chunkSize, routes.length))

				for (const route of chunk) {
					try {
						const routeInfo = this.processRoute(route)
						if (routeInfo) {
							routesMap.set(route.route_id, routeInfo)
							busRouteCount++
						}
						processedCount++
					} catch (error) {
						this.logError(`Error processing route record: ${JSON.stringify(route)}`, error)
						errorCount++
					}
				}

				// Report progress
				const progress = Math.round(((i + chunk.length) / totalRoutes) * 100)
				this.logProgress(
					`Processing routes: ${i + chunk.length}/${totalRoutes}`,
					'parsing-routes',
					progress
				)

				// Yield control periodically
				if (i % (chunkSize * 10) === 0) {
					await new Promise(resolve => setTimeout(resolve, 0))
				}
			}

			this.logProgress(
				`Routes parsing complete. Processed: ${processedCount}, Errors: ${errorCount}, Bus routes: ${busRouteCount}`,
				'parsing-routes',
				100
			)
		} catch (error) {
			this.logError("Critical error in routes parsing", error)
			throw error
		}

		return routesMap
	}

	async parseTrips(tripsData: string, chunkSize: number = GTFSParser.DEFAULT_CHUNK_SIZE): Promise<Map<string, string>> {
		this.logProgress("Starting trips parsing...", 'parsing-trips', 0)

		const routeToShapeMap = new Map<string, string>()
		let processedCount = 0
		let errorCount = 0

		try {
			const csvData = await this.parseCSVStream(tripsData, chunkSize)
			const trips = this.csvToObjects<GTFSTrip>(csvData)
			const totalTrips = trips.length

			for (let i = 0; i < trips.length; i += chunkSize) {
				this.checkAborted()

				const chunk = trips.slice(i, Math.min(i + chunkSize, trips.length))

				for (const trip of chunk) {
					try {
						if (!trip.route_id || !trip.shape_id) {
							errorCount++
							continue
						}

						if (!routeToShapeMap.has(trip.route_id)) {
							routeToShapeMap.set(trip.route_id, trip.shape_id)
						}

						processedCount++
					} catch (error) {
						this.logError(`Error processing trip record: ${JSON.stringify(trip)}`, error)
						errorCount++
					}
				}

				const progress = Math.round(((i + chunk.length) / totalTrips) * 100)
				this.logProgress(
					`Processing trips: ${i + chunk.length}/${totalTrips}`,
					'parsing-trips',
					progress
				)

				if (i % (chunkSize * 10) === 0) {
					await new Promise(resolve => setTimeout(resolve, 0))
				}
			}

			this.logProgress(
				`Trips parsing complete. Processed: ${processedCount}, Errors: ${errorCount}, Route-shape mappings: ${routeToShapeMap.size}`,
				'parsing-trips',
				100
			)
		} catch (error) {
			this.logError("Critical error in trips parsing", error)
			throw error
		}

		return routeToShapeMap
	}

	private createRouteFeature(routeInfo: RouteInfo, coordinates: Coordinate[]): RouteFeature {
		const geoJsonCoordinates: [number, number][] = coordinates.map(coord => [
			coord.longitude,
			coord.latitude
		])

		return {
			type: "Feature",
			geometry: {
				type: "LineString",
				coordinates: geoJsonCoordinates
			},
			properties: {
				routeId: routeInfo.route_id,
				routeName: routeInfo.route_short_name,
				routeColor: routeInfo.route_color,
				routeLongName: routeInfo.route_long_name
			}
		}
	}

	private processRouteLink(
		routeId: string,
		routeInfo: RouteInfo,
		trips: Map<string, string>,
		shapes: Map<string, Coordinate[]>
	): RouteFeature | null {
		const shapeId = trips.get(routeId)
		if (!shapeId) {
			this.logError(`No shape found for route ${routeId}`)
			return null
		}

		const coordinates = shapes.get(shapeId)
		if (!coordinates || coordinates.length === 0) {
			this.logError(`No coordinates found for shape ${shapeId} (route ${routeId})`)
			return null
		}

		return this.createRouteFeature(routeInfo, coordinates)
	}

	async linkRoutesToShapes(
		routes: Map<string, RouteInfo>,
		trips: Map<string, string>,
		shapes: Map<string, Coordinate[]>,
		chunkSize: number = GTFSParser.DEFAULT_CHUNK_SIZE
	): Promise<GeoJSON.FeatureCollection> {
		this.logProgress("Starting route-shape linking...", 'linking', 0)

		const features: RouteFeature[] = []
		let linkedCount = 0
		let skippedCount = 0

		try {
			const routeEntries = Array.from(routes.entries())
			const totalRoutes = routeEntries.length

			for (let i = 0; i < routeEntries.length; i += chunkSize) {
				this.checkAborted()

				const chunk = routeEntries.slice(i, Math.min(i + chunkSize, routeEntries.length))

				for (const [routeId, routeInfo] of chunk) {
					try {
						const feature = this.processRouteLink(routeId, routeInfo, trips, shapes)
						if (feature) {
							features.push(feature)
							linkedCount++
						} else {
							skippedCount++
						}
					} catch (error) {
						this.logError(`Error linking route ${routeId}`, error)
						skippedCount++
					}
				}

				// Report progress
				const progress = Math.round(((i + chunk.length) / totalRoutes) * 100)
				this.logProgress(
					`Linking routes: ${i + chunk.length}/${totalRoutes}`,
					'linking',
					progress
				)

				if (i % (chunkSize * 5) === 0) {
					await new Promise(resolve => setTimeout(resolve, 0))
				}
			}

			this.logProgress(
				`Route-shape linking complete. Linked: ${linkedCount}, Skipped: ${skippedCount}`,
				'linking',
				100
			)
		} catch (error) {
			this.logError("Critical error in route-shape linking", error)
			throw error
		}

		return {
			type: "FeatureCollection",
			features
		}
	}

	async parseGTFSFiles(options: GTFSParseOptions = {}): Promise<GeoJSON.FeatureCollection> {
		const {
			useCache = true,
			cacheExpiry = GTFSParser.DEFAULT_CACHE_EXPIRY,
			chunkSize = GTFSParser.DEFAULT_CHUNK_SIZE,
			onProgress,
			signal
		} = options

		// Set up progress callback and abort controller
		this.progressCallback = onProgress || null
		this.abortController = signal ? { signal } : new AbortController()

		this.logProgress("Starting GTFS parsing process...", 'loading', 0)

		try {
			if (useCache) {
				const cachedData = this.getCachedData(cacheExpiry)
				if (cachedData) {
					return cachedData
				}
			}

			this.logProgress("Loading GTFS files...", 'loading', 10)

			const loadPromises = [
				this.loadFileWithRetry("/shapes_nyc_all", signal),
				this.loadFileWithRetry("/routes_nyc_all", signal),
				this.loadFileWithRetry("/trips_nyc_all", signal)
			]

			const [shapesData, routesData, tripsData] = await Promise.all(loadPromises)

			this.logProgress("GTFS files loaded successfully", 'loading', 30)

			const shapes = await this.parseShapes(shapesData, chunkSize)
			this.checkAborted()

			const routes = await this.parseRoutes(routesData, chunkSize)
			this.checkAborted()

			const trips = await this.parseTrips(tripsData, chunkSize)
			this.checkAborted()

			const geoJson = await this.linkRoutesToShapes(routes, trips, shapes, chunkSize)
			this.checkAborted()

			this.logProgress(
				`GTFS parsing complete! Generated ${geoJson.features.length} route features`,
				'complete',
				100
			)

			if (useCache) {
				this.setCachedData(geoJson)
			}

			return geoJson
		} catch (error) {
			if (error instanceof Error && error.message === 'GTFS parsing was aborted') {
				this.logProgress("GTFS parsing was cancelled")
				throw error
			}

			this.logError("Failed to parse GTFS files", error)
			throw error
		} finally {
			this.progressCallback = null
			this.abortController = null
		}
	}

	private async loadFileWithRetry(
		url: string,
		signal?: AbortSignal,
		maxRetries: number = 3,
		timeout: number = 30000
	): Promise<string> {
		let lastError: Error | null = null

		for (let attempt = 1; attempt <= maxRetries; attempt++) {
			try {
				const controller = new AbortController()
				const timeoutId = setTimeout(() => controller.abort(), timeout)

				if (signal) {
					signal.addEventListener('abort', () => controller.abort())
				}

				const response = await fetch(url, {
					signal: controller.signal,
					cache: 'no-cache'
				})

				clearTimeout(timeoutId)

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}: ${response.statusText}`)
				}

				return await response.text()
			} catch (error) {
				lastError = error as Error

				if (lastError.name === 'AbortError') {
					throw new Error('File loading was cancelled')
				}

				this.logError(`Attempt ${attempt}/${maxRetries} failed for ${url}`, error)

				if (attempt < maxRetries) {
					const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
					await new Promise(resolve => setTimeout(resolve, delay))
				}
			}
		}

		throw new Error(`Failed to load ${url} after ${maxRetries} attempts: ${lastError?.message}`)
	}

	static clearCache(): void {
		try {
			localStorage.removeItem(GTFSParser.CACHE_KEY)
		} catch (error) {
			console.error('Error clearing GTFS cache:', error)
		}
	}

	static getCacheInfo(): { exists: boolean; timestamp?: number; size?: number } {
		try {
			const cached = localStorage.getItem(GTFSParser.CACHE_KEY)
			if (!cached) return { exists: false }

			const cacheEntry: GTFSCacheEntry = JSON.parse(cached)
			return {
				exists: true,
				timestamp: cacheEntry.timestamp,
				size: cached.length
			}
		} catch {
			return { exists: false }
		}
	}
}

export const gtfsParser = new GTFSParser()