import { action, makeAutoObservable } from "mobx"

type MobilePanel = "search" | "chat" | "modal" | null

class UIStore {
	constructor() {
		makeAutoObservable(this)

		// Initialize viewport detection
		if (typeof window !== "undefined") {
			this.initializeViewportDetection()
		}
	}

	private _viewportWidth: number = typeof window !== "undefined" ? window.innerWidth : 1024
	public _activeMobilePanel: MobilePanel = null
	private resizeTimeout: NodeJS.Timeout | null = null
	private mediaQueryList: MediaQueryList | null = null
	private detectionFailed: boolean = false

	// Computed property for mobile view detection
	public get isMobileView(): boolean {
		// Fallback to mobile layout if detection fails
		if (this.detectionFailed) {
			return true
		}
		return this._viewportWidth < 768
	}

	// Initialize viewport detection with matchMedia and debounced resize handler
	private initializeViewportDetection = () => {
		let handleMediaQueryChange: ((_e: MediaQueryListEvent) => void) | null = null

		try {
			// Use matchMedia for reliable breakpoint detection
			if (window.matchMedia) {
				this.mediaQueryList = window.matchMedia("(min-width: 768px)")

				// Listen to media query changes for more reliable detection
				handleMediaQueryChange = (_e: MediaQueryListEvent) => {
					try {
						// Update viewport width based on media query
						this.updateViewportWidth(window.innerWidth)
					} catch (error) {
						console.warn("Error handling media query change:", error)
						this.detectionFailed = true
					}
				}

				// Modern browsers
				if (this.mediaQueryList.addEventListener) {
					this.mediaQueryList.addEventListener("change", handleMediaQueryChange)
				}
			}

			// Set initial viewport width with error handling
			if (window.innerWidth !== undefined) {
				this._viewportWidth = window.innerWidth
			} else {
				// Fallback if innerWidth is not available
				console.warn("window.innerWidth not available, falling back to mobile layout")
				this.detectionFailed = true
			}

			// Add debounced resize handler (300ms)
			const handleResize = () => {
				try {
					if (this.resizeTimeout) {
						clearTimeout(this.resizeTimeout)
					}

					this.resizeTimeout = setTimeout(() => {
						try {
							if (window.innerWidth !== undefined) {
								this.updateViewportWidth(window.innerWidth)
								// Reset detection failed flag if we successfully get width
								if (this.detectionFailed) {
									this.detectionFailed = false
								}
							}
						} catch (error) {
							console.warn("Error updating viewport width:", error)
							this.detectionFailed = true
						}
					}, 300) // 300ms debounce delay
				} catch (error) {
					console.warn("Error in resize handler:", error)
					this.detectionFailed = true
				}
			}

			window.addEventListener("resize", handleResize)

			// Cleanup function (can be called if needed)
			return () => {
				try {
					window.removeEventListener("resize", handleResize)
					if (this.resizeTimeout) {
						clearTimeout(this.resizeTimeout)
					}
					if (this.mediaQueryList && handleMediaQueryChange) {
						if (this.mediaQueryList.removeEventListener) {
							this.mediaQueryList.removeEventListener("change", handleMediaQueryChange)
						}
					}
				} catch (error) {
					console.warn("Error during cleanup:", error)
				}
			}
		} catch (error) {
			console.error("Failed to initialize viewport detection:", error)
			// Fallback to mobile layout if initialization fails
			this.detectionFailed = true
			return () => {} // Return empty cleanup function
		}
	}

	// Update viewport width
	private updateViewportWidth = action((width: number) => {
		this._viewportWidth = width
	})

	// Set active mobile panel
	public setActiveMobilePanel = action((panel: MobilePanel) => {
		this._activeMobilePanel = panel
	})

	// Close all mobile panels
	public closeAllMobilePanels = action(() => {
		this._activeMobilePanel = null
	})

	// Get current viewport width (for testing/debugging)
	public get viewportWidth(): number {
		return this._viewportWidth
	}
}

export const uiStore = new UIStore()
