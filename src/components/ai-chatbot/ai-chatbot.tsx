"use client"
import { useState, useRef, useEffect } from "react"
import { observer } from "mobx-react"
import { X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/ai-chatbot/chat-message"
import useSendAiMessage from "@/hooks/property-search/use-ai-chat"
import { chatStore } from "@/stores/chat-store"
import ChatBotMessageLoading from "@/components/ai-chatbot/chat-message-loading"
import { motion, PanInfo } from "framer-motion"
import { uiStore } from "@/stores/ui-store"

interface AiChatbotProps {
	isOpen: boolean
	onClose: () => void
}

function AiChatbot({ isOpen, onClose }: AiChatbotProps) {
	const sendMessage = useSendAiMessage()
	const [inputValue, setInputValue] = useState("")
	const scrollEndRef = useRef<HTMLDivElement>(null)
	const isMobileView = uiStore.isMobileView

	const handleSend = async () => {
		if (!inputValue.trim()) return
		const msg = inputValue
		setInputValue("")
		await sendMessage(msg)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		// Swipe right to close on mobile (threshold: 100px)
		// Gestures below threshold are ignored, allowing map interactions to work
		if (isMobileView && info.offset.x > 100) {
			// Prevent default to avoid conflicts with browser gestures
			if (event && event.preventDefault) {
				event.preventDefault()
			}
			onClose()
		}
	}

	useEffect(() => {
		if (scrollEndRef.current) {
			setTimeout(() => {
				scrollEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
			}, 100)
		}
	}, [chatStore._messages, chatStore._isMessageLoading])

	// Set active mobile panel when chat opens
	useEffect(() => {
		if (isOpen && isMobileView) {
			uiStore.setActiveMobilePanel("chat")
		} else if (!isOpen && uiStore._activeMobilePanel === "chat") {
			uiStore.closeAllMobilePanels()
		}
	}, [isOpen, isMobileView])

	if (!isOpen) return null

	return (
		<motion.div
			initial={{ x: "100%", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: "100%", opacity: 0 }}
			transition={{
				duration: 0.3,
				ease: "easeOut"
			}}
			onPanEnd={handlePanEnd}
			className="
				fixed inset-0
				md:w-[400px] md:left-auto md:right-0 md:top-0 md:bottom-0
				border-l bg-background flex flex-col shadow-xl z-40
				motion-reduce:transition-none
			"
			style={{
				willChange: isOpen ? "transform, opacity" : "auto"
			}}
		>
			<div className="flex items-center justify-between p-4 border-b bg-muted/30">
				<div className="flex items-center gap-2">
					<div className="p-1.5 bg-primary/10 rounded-full text-primary">
						<Bot size={20} />
					</div>
					<div>
						<h3 className="font-semibold text-sm">AI Assistant</h3>
						<p className="text-xs text-muted-foreground">Ask me anything about properties</p>
					</div>
				</div>
				<Button variant="ghost"
					size="icon"
					className="h-11 w-11 md:h-8 md:w-8 text-muted-foreground hover:text-foreground"
					onClick={onClose}
				>
					<X size={18} />
				</Button>
			</div>

			<ScrollArea className="flex-1 min-h-0">
				<div className="space-y-6 p-4">
					{chatStore._messages.length === 0 && (
						<div className="text-center text-muted-foreground mt-10 space-y-2">
							<Bot className="mx-auto text-muted-foreground/50" size={40} />
							<p className="text-sm">Hi! How can I help you today?</p>
						</div>
					)}

					{chatStore._messages.map((msg) => (
						<ChatMessage key={msg.id} message={msg} />
					))}

					{chatStore._isMessageLoading && (
						<ChatBotMessageLoading/>
					)}

					<div ref={scrollEndRef} />
				</div>
			</ScrollArea>

			<div className="p-4 border-t bg-muted/30">
				<div className="relative">
					<Input
						placeholder="Type a message..."
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
						className="pr-12 h-12 md:h-10 bg-background border-muted-foreground/20 focus-visible:ring-1"
						disabled={chatStore._isMessageLoading}
						autoFocus
					/>
					<Button
						size="icon"
						className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 md:h-7 md:w-7"
						onClick={handleSend}
						disabled={!inputValue.trim() || chatStore._isMessageLoading}
					>
						<Send size={16} className="md:w-[11px] md:h-[11px]" />
					</Button>
				</div>
			</div>
		</motion.div>
	)
}

export default observer(AiChatbot)
