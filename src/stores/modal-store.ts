import { action, makeAutoObservable } from "mobx"
import { v4 as uuidv4 } from "uuid"
import isUndefined from "lodash-es/isUndefined"
import {toast} from "react-toastify"

class ModalStore {
	constructor() {
		makeAutoObservable(this)
	}

	private _currentZIndex = 100

	public _propertyModals: PropertyModal[] = []

	private getNextZIndex = (): number => {
		return ++this._currentZIndex
	}

	private setModalState = action((id: string, updates: Partial<PropertyModal>) => {
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

	private calculateNewModalPosition = (): { x: number, y: number } => {
		const MODAL_WIDTH = 465
		const START_X = 0
		const START_Y = 0

		const activeModals = this._propertyModals.filter(modal =>
			modal.isOpen && !modal.isMinimized
		)

		const position = activeModals.length * MODAL_WIDTH

		if (position >= 1395) {
			return { x: START_X, y: START_Y }
		}

		return { x: -position, y: START_Y }
	}

	public addPropertyModal = action((coords: Coordinates, title: string, propertyData: PropertyDetails) => {
		if (this._propertyModals.length >= 8) {
			return toast.info("Modal limit reached. Close one to open more")
		}

		const existingModal = this._propertyModals.find(modal => modal.title === title)

		if (!isUndefined(existingModal)) {
			this.restoreModal(existingModal.id)
		}

		const newModal: PropertyModal = {
			id: uuidv4(),
			isOpen: true,
			isMinimized: false,
			isExpanded: false,
			coords,
			title,
			position: this.calculateNewModalPosition(),
			propertyData,
			zIndex: this.getNextZIndex()
		}

		this._propertyModals.push(newModal)
	})

	public focusModal = action((id: string) => {
		const modal = this.getModal(id)
		if (modal && !modal.isMinimized) {
			this.setModalState(id, { zIndex: this.getNextZIndex() })
		}
	})

	public minimizeModal = action((id: string) => {
		if (this._propertyModals.filter((modal)=>modal.isMinimized).length >= 4) {
			return toast.info("You can only have 4 minimized modals. Please close one before minimizing another.")
		}
		this.setModalState(id, { isMinimized: true })
	})

	public restoreModal = action((id: string) => {
		this.setModalState(id, {
			isMinimized: false,
			isOpen: true,
			position:this.calculateNewModalPosition()
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
		}
	})

	public closeModal = action((id: string, ) => {
		const propertyIndex = this._propertyModals.findIndex(modal => modal.id === id)
		if (propertyIndex !== -1) {
			this._propertyModals.splice(propertyIndex, 1)
		}
	})
}

export const modalStore = new ModalStore()
