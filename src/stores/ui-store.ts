import { action, makeAutoObservable } from "mobx"

type MobilePanel = "search" | "chat" | "modal" | null

class UIStore {
	constructor() {
		makeAutoObservable(this)


		if (typeof window !== "undefined") {
			this.initializeViewportDetection()
		}
	}

	private _viewportWidth: number = typeof window !== "undefined" ? window.innerWidth : 1024
	public _activeMobilePanel: MobilePanel = null
	private resizeTimeout: NodeJS.Timeout | null = null
	private mediaQueryList: MediaQueryList | null = null
	private detectionFailed: boolean = false


	public get isMobileView(): boolean {

		if (this.detectionFailed) {
			return true
		}
		return this._viewportWidth < 768
	}


	private initializeViewportDetection = () => {
		let handleMediaQueryChange: ((_e: MediaQueryListEvent) => void) | null = null

		try {

			if (window.matchMedia) {
				this.mediaQueryList = window.matchMedia("(min-width: 768px)")


				handleMediaQueryChange = (_e: MediaQueryListEvent) => {
					try {

						this.updateViewportWidth(window.innerWidth)
					} catch (error) {
						console.warn("Error handling media query change:", error)
						this.detectionFailed = true
					}
				}


				if (this.mediaQueryList.addEventListener) {
					this.mediaQueryList.addEventListener("change", handleMediaQueryChange)
				}
			}


			if (window.innerWidth !== undefined) {
				this._viewportWidth = window.innerWidth
			} else {

				console.warn("window.innerWidth not available, falling back to mobile layout")
				this.detectionFailed = true
			}


			const handleResize = () => {
				try {
					if (this.resizeTimeout) {
						clearTimeout(this.resizeTimeout)
					}

					this.resizeTimeout = setTimeout(() => {
						try {
							if (window.innerWidth !== undefined) {
								this.updateViewportWidth(window.innerWidth)

								if (this.detectionFailed) {
									this.detectionFailed = false
								}
							}
						} catch (error) {
							console.warn("Error updating viewport width:", error)
							this.detectionFailed = true
						}
					}, 300)
				} catch (error) {
					console.warn("Error in resize handler:", error)
					this.detectionFailed = true
				}
			}

			window.addEventListener("resize", handleResize)


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

			this.detectionFailed = true
			return () => { }
		}
	}


	private updateViewportWidth = action((width: number) => {
		this._viewportWidth = width
	})


	public setActiveMobilePanel = action((panel: MobilePanel) => {
		this._activeMobilePanel = panel
	})


	public closeAllMobilePanels = action(() => {
		this._activeMobilePanel = null
	})


	public get viewportWidth(): number {
		return this._viewportWidth
	}
}

export const uiStore = new UIStore()
