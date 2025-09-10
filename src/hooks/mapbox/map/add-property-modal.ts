import { modalStore } from "@/stores/modal-store"
import { mockPropertyData } from "@/constants/mock-data"

export const addPropertyModal = (lat: number, lng: number) => {
	modalStore.addPropertyModal(
		{ latitude: lat, longitude: lng },
		"test" + Math.floor(Math.random() * 1000),
		mockPropertyData
	)
}