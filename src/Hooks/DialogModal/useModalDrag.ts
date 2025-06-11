import { useState, useRef, useCallback, useEffect } from "react"

interface UseModalDragReturn {
  dragPosition: ModalPosition
  isDragging: boolean
  handleMouseDown: (e: React.MouseEvent) => void
}

export default function useModalDrag(
	initialPosition?: ModalPosition
): UseModalDragReturn {
	const [dragPosition, setDragPosition] = useState<ModalPosition>(
		initialPosition || { x: 0, y: 0 }
	)

	const [isDragging, setIsDragging] = useState(false)
	const dragStartRef = useRef<ModalDragStart>({ x: 0, y: 0, dragX: 0, dragY: 0 })
	const prevPositionRef = useRef<ModalPosition | null>(null)

	useEffect(() => {
		if (initialPosition &&
        (!prevPositionRef.current ||
         (prevPositionRef.current.x !== initialPosition.x ||
          prevPositionRef.current.y !== initialPosition.y)) &&
        !isDragging) {
			prevPositionRef.current = initialPosition
			setDragPosition(initialPosition)
		}
	}, [initialPosition?.x, initialPosition?.y, isDragging])

	const handleMouseDown = (e: React.MouseEvent) => {
		if (e.target instanceof Element &&
        !e.target.closest("button") &&
        !e.target.closest("input") &&
        !e.target.closest("select") &&
        !e.target.closest("textarea")) {
			setIsDragging(true)
			dragStartRef.current = {
				x: e.clientX - dragPosition.x,
				y: e.clientY - dragPosition.y,
				dragX: dragPosition.x,
				dragY: dragPosition.y
			}
		}
	}

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (isDragging) {
			const newX = e.clientX - dragStartRef.current.x
			const newY = e.clientY - dragStartRef.current.y
			setDragPosition({ x: newX, y: newY })
		}
	}, [isDragging])

	const handleMouseUp = useCallback(() => {
		setIsDragging(false)
	}, [])

	useEffect(() => {
		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove)
			window.addEventListener("mouseup", handleMouseUp)
		}
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			window.removeEventListener("mouseup", handleMouseUp)
		}
	}, [isDragging, handleMouseMove, handleMouseUp])

	return {
		dragPosition,
		isDragging,
		handleMouseDown
	}
}
