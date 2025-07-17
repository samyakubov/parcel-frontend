import { action, makeAutoObservable } from "mobx"
import { v4 as uuidv4 } from "uuid"
import isUndefined from "lodash-es/isUndefined"
import {toast} from "react-toastify"

class ModalStore {
	constructor() {
		makeAutoObservable(this)
	}

	private currentZIndex = 100

	public propertyModals: PropertyModal[] = []
	public relatedPropertyModals: RelatedPropertyModal[] = []

	private getNextZIndex = (): number => {
		return ++this.currentZIndex
	}

	private setModalState = action((id: string, updates: Partial<PropertyModal | RelatedPropertyModal>, isRelatedPropertyModal: boolean) => {
		if (isRelatedPropertyModal) {
			const modalIndex = this.relatedPropertyModals.findIndex(modal => modal.id === id)
			if (modalIndex !== -1) {
				this.relatedPropertyModals[modalIndex] = {
					...this.relatedPropertyModals[modalIndex],
					...updates as Partial<RelatedPropertyModal>
				}
			}
		} else {
			const modalIndex = this.propertyModals.findIndex(modal => modal.id === id)
			if (modalIndex !== -1) {
				this.propertyModals[modalIndex] = {
					...this.propertyModals[modalIndex],
					...updates as Partial<PropertyModal>
				}
			}
		}
	})

	private getModal = (id: string, isRelatedPropertyModal: boolean): PropertyModal | RelatedPropertyModal | undefined => {
		if (isRelatedPropertyModal) {
			return this.relatedPropertyModals.find(modal => modal.id === id)
		} else {
			return this.propertyModals.find(modal => modal.id === id)
		}
	}

	public addRelatedPropertyModal = action((title: string, relatedPropertyData: RelatedPropertySummary[]) => {
		const existingModal = this.relatedPropertyModals.find(modal => modal.title === title)
		if (!isUndefined(existingModal)) {
			if (existingModal.isMinimized) {
				existingModal.isMinimized = false
				existingModal.isOpen = true
			}
			existingModal.relatedPropertyData = relatedPropertyData
			existingModal.zIndex = this.getNextZIndex()
			return existingModal.id
		}

		const newModal: RelatedPropertyModal = {
			id: uuidv4(),
			isOpen: true,
			isMinimized: false,
			isExpanded: false,
			title,
			position: { x: 0, y: 0 },
			relatedPropertyData,
			zIndex: this.getNextZIndex()
		}
		this.relatedPropertyModals.push(newModal)
		return newModal.id
	})

	private calculateNewModalPosition = (): { x: number, y: number } => {
		const MODAL_WIDTH = 465
		const START_X = 0
		const START_Y = 0

		const activeModals = this.propertyModals.filter(modal =>
			modal.isOpen && !modal.isMinimized
		)

		if (activeModals.length === 0) {
			return { x: START_X, y: START_Y }
		}

		const occupiedXPositions = new Set(
			activeModals.map(modal => modal.position.x)
		)

		for (let x = START_X; x >= -1395; x -= MODAL_WIDTH) {
			if (!occupiedXPositions.has(x)) {
				return { x, y: START_Y }
			}
		}

		return { x: START_X, y: START_Y }
	}

	public addPropertyModal = action((coords: Coordinates, title: string, propertyData: PropertyDetails) => {
		if (this.propertyModals.length >= 8) {
			return toast.info("Modal limit reached. Close one to open more")
		}

		const existingModal = this.propertyModals.find(modal => modal.title === title)

		if (!isUndefined(existingModal)) {
			if (existingModal.isMinimized) {
				existingModal.isMinimized = false
				existingModal.isOpen = true
			}
			existingModal.propertyData = propertyData
			existingModal.zIndex = this.getNextZIndex()
			return existingModal.id
		}

		const newPosition = this.calculateNewModalPosition()

		const newModal: PropertyModal = {
			id: uuidv4(),
			isOpen: true,
			isMinimized: false,
			isExpanded: false,
			coords,
			title,
			position: newPosition,
			propertyData,
			zIndex: this.getNextZIndex()
		}

		this.propertyModals.push(newModal)
		return newModal.id
	})

	public getCurrentPropertyModal = (modalId: string) => {
		return this.getModal(modalId, false)
	}

	public getCurrentRelatedPropertyModal = (modalId: string) => {
		return this.getModal(modalId, true)
	}

	public focusModal = action((id: string, isRelatedPropertyModal: boolean) => {
		const modal = this.getModal(id, isRelatedPropertyModal)
		if (modal && !modal.isMinimized) {
			modal.zIndex = this.getNextZIndex()
		}
	})

	public minimizeModal = action((id: string, isRelatedPropertyModal: boolean) => {
		if (this.propertyModals.filter((modal)=>modal.isMinimized).length >= 4) {
			return toast.info("You can only have 4 minimized modals. Please close one before minimizing another.")
		}
		this.setModalState(id, { isMinimized: true }, isRelatedPropertyModal)
	})

	public restoreModal = action((id: string, isRelatedPropertyModal: boolean) => {
		this.setModalState(id, {
			isMinimized: false,
			isOpen: true,
			zIndex: this.getNextZIndex()
		}, isRelatedPropertyModal)
	})

	public toggleModalExpand = action((id: string, isRelatedPropertyModal: boolean) => {
		const modal = this.getModal(id, isRelatedPropertyModal)
		if (modal) {
			this.setModalState(id, {
				isExpanded: !modal.isExpanded,
				position: { x: 0, y: 0 }
			}, isRelatedPropertyModal)
		}
	})

	public updateModalPosition = action((id: string, position: ModalPosition, isRelatedPropertyModal: boolean) => {
		this.setModalState(id, { position }, isRelatedPropertyModal)
	})

	public closeModal = action((id: string, isRelatedPropertyModal: boolean) => {
		if (isRelatedPropertyModal) {
			const relatedIndex = this.relatedPropertyModals.findIndex(modal => modal.id === id)
			if (relatedIndex !== -1) {
				this.relatedPropertyModals.splice(relatedIndex, 1)
			}
		} else {
			const propertyIndex = this.propertyModals.findIndex(modal => modal.id === id)
			if (propertyIndex !== -1) {
				this.propertyModals.splice(propertyIndex, 1)
			}
		}
	})
}

export const modalStore = new ModalStore()
