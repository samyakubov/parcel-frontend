import { useMapContext } from "../../Contexts/MapContext"
import Modal from "../Modal"
import React, { useCallback } from "react"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { motion } from "framer-motion"
import { useModalManagerContext } from "../../Contexts/ModalManagerContext"
import RelatedPropertyCard from "./RelatedPropertyModal/RelatedPropertyCard"
import useSearchByPropertyBBL from "../../Hooks/Search/useSearchByPropertyBBL"
import {useSearchContext} from "../../Contexts/SearchContext"

interface RelatedPropertiesModalProps {
	data: RelatedPropertyModal
}

// eslint-disable-next-line max-lines-per-function
function RelatedPropertiesModal(props: RelatedPropertiesModalProps) {
	const modal = props.data
	const baseClasses = "shadow-2xl fixed left-20 bottom-10 h-[70vh] overflow-y-auto overflow-hidden flex flex-col"
	const mapContext = useMapContext()
	const searchContext = useSearchContext()
	const modalManagerContext = useModalManagerContext()
	const properties = modal.relatedPropertyData
	const searchByBbl = useSearchByPropertyBBL()

	const onClickProperty = useCallback(async (index: number) => {
		mapContext.setCoords(mapContext.relatedPropertiesToOwnerCoords[index])
		searchContext.setSearchBblQuery(modal.relatedPropertyData[index].bbl)
		await searchByBbl()
	}, [mapContext, searchByBbl])


	if (isEmpty(properties) || modal.isMinimized || !modal.isOpen) {
		return null
	}

	const transitionProps = {
		duration: 0.8,
		ease: [0.4, 0, 0.2, 1]
	}

	return (
		<Modal
			open={modal.isOpen}
			panelClassName={baseClasses}
			isExpandable={false}
			modalId={modal.id}
			isRelatedPropertyModal={true}
		>
			<motion.div
				layout="preserve-aspect"
				transition={transitionProps}
				className="flex flex-col h-full"
				onClick={()=>modalManagerContext.focusModal(modal.id, true)}
				style={{ zIndex: modal.zIndex }}
			>
				<motion.div
					layout="preserve-aspect"
					transition={transitionProps}
					className="flex flex-col justify-between p-6 border-b border-gray-200 dark:border-gray-800"
				>
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
						Related Properties
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic">
						The information shown is not 100% accurate and can have mistakes
					</p>
				</motion.div>

				<motion.div
					layout="preserve-aspect"
					transition={transitionProps}
					className="flex-1 p-6 overflow-y-auto"
				>
					<div className="grid gap-6">
						{properties.map((property, index) => (
							<div
								key={index}
								onClick={async () => await onClickProperty(index)}
							>
								<RelatedPropertyCard property={property} />
							</div>
						))}
					</div>
				</motion.div>
			</motion.div>
		</Modal>
	)
}

export default observer(RelatedPropertiesModal)
