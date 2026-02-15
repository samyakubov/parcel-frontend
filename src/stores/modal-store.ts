import { action, makeAutoObservable } from "mobx"
import isUndefined from "lodash-es/isUndefined"
import { toast } from "react-toastify"
import { mapStore } from "@/stores/map-store"
import { isEmpty } from "lodash-es"
import { uiStore } from "@/stores/ui-store"

class ModalStore {
	constructor() {
		makeAutoObservable(this)
	}

	private _currentZIndex = 100

	public _propertyModals: PropertyModal[] = []

	public getNextZIndex = (): number => {
		return ++this._currentZIndex
	}

	public setModalState = action((id: string, updates: Partial<PropertyModal>) => {
		const modalIndex = this._propertyModals.findIndex(modal => modal.id === id)
		if (modalIndex !== -1) {
			this._propertyModals[modalIndex] = {
				...this._propertyModals[modalIndex],
				...updates as Partial<PropertyModal>
			}
		}
	})

	public getModal = (id: string): PropertyModal | undefined => {
		return this._propertyModals.find(modal => modal.id === id)
	}

	public calculateNewModalPosition = (): { x: number, y: number } => {
		const MODAL_WIDTH = 465
		const START_X = 0
		const START_Y = 0

		const activeModals = this._propertyModals.filter(modal =>
			modal.isOpen && !modal.isMinimized
		)

		const viewportWidth = window.innerWidth
		const maxModalsVisible = Math.floor(viewportWidth / MODAL_WIDTH)
		const index = activeModals.length

		if (index >= maxModalsVisible) {
			return { x: START_X, y: START_Y }
		}

		return {
			x: START_X - (index * MODAL_WIDTH),
			y: START_Y
		}
	}

	public addPropertyModal = action((newModal: PropertyModal) => {
		if (this._propertyModals.length >= 8) {
			return toast.info("Modal limit reached. Close one to open more")
		}

		const existingModal = this._propertyModals.find(modal => modal.title === newModal.title)
		if (!isUndefined(existingModal)) {
			this.restoreModal(existingModal.id)
			return
		}

		// On mobile, minimize all currently open modals before adding new one
		if (uiStore.isMobileView) {
			const openModals = this._propertyModals.filter(
				modal => modal.isOpen && !modal.isMinimized
			)
			openModals.forEach(modal => {
				this.setModalState(modal.id, { isMinimized: true })
			})
		}

		this._propertyModals.push(newModal)
		return
	})

	public focusModal = action((id: string) => {
		const modal = this.getModal(id)
		if (modal && !modal.isMinimized) {
			this.setModalState(id, { zIndex: this.getNextZIndex() })
			mapStore.setCoords(modal.propertyData.coordinates)
		}
	})

	public minimizeModal = action((id: string) => {
		if (this._propertyModals.filter((modal) => modal.isMinimized).length >= 8) {
			return toast.info("You can only have 8 minimized modals. Please close one before minimizing another.")
		}
		this.setModalState(id, { isMinimized: true })
		return
	})

	public restoreModal = action((id: string) => {
		// On mobile, minimize all other open modals before restoring this one
		if (uiStore.isMobileView) {
			const otherOpenModals = this._propertyModals.filter(
				modal => modal.id !== id && modal.isOpen && !modal.isMinimized
			)
			otherOpenModals.forEach(modal => {
				this.setModalState(modal.id, { isMinimized: true })
			})
		}

		this.setModalState(id, {
			isMinimized: false,
			isOpen: true,
			position: this.calculateNewModalPosition()
		})
		this.focusModal(id)
	})

	public toggleModalExpand = action((id: string) => {
		const modal = this.getModal(id)
		if (modal) {
			this.setModalState(id, {
				isExpanded: !modal.isExpanded,
				position: { x: 0, y: 0 }
			})
			this.focusModal(id)
		}
	})

	public closeModal = action((id: string) => {
		const propertyIndex = this._propertyModals.findIndex(modal => modal.id === id)

		if (propertyIndex === -1) return
		this._propertyModals.splice(propertyIndex, 1)

		if (isEmpty(this._propertyModals)) {
			mapStore.resetMap()
		} else {
			const lastModal = this._propertyModals[this._propertyModals.length - 1]
			if (lastModal) {
				this.focusModal(lastModal.id)
			}
		}
	})

}

export const modalStore = new ModalStore()
