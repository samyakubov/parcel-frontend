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

interface AiChatbotProps {
	isOpen: boolean
	onClose: () => void
}

function AiChatbot({ isOpen, onClose }: AiChatbotProps) {
	const sendMessage = useSendAiMessage()
	const [inputValue, setInputValue] = useState("")
	const scrollEndRef = useRef<HTMLDivElement>(null)

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

	useEffect(() => {
		if (scrollEndRef.current) {
			setTimeout(() => {
				scrollEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
			}, 100)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatStore._messages, chatStore._isMessageLoading])

	if (!isOpen) return null

	return (
		<div className="w-[400px] border-l bg-background h-full flex flex-col shadow-xl z-20">
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
					className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
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
						className="pr-12 bg-background border-muted-foreground/20 focus-visible:ring-1"
						disabled={chatStore._isMessageLoading}
						autoFocus
					/>
					<Button
						size="icon"
						className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
						onClick={handleSend}
						disabled={!inputValue.trim() || chatStore._isMessageLoading}
					>
						<Send size={11} />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default observer(AiChatbot)
