"use client"
import { useState, useRef, useEffect } from "react"
import { observer } from "mobx-react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChatMessage } from "@/components/ai-chatbot/chat-message"
import useSendAiMessage from "@/hooks/use-ai-chat"
import { chatStore } from "@/stores/chat-store"

function AiChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const sendMessage = useSendAiMessage()
    const [inputValue, setInputValue] = useState("")
    const scrollEndRef = useRef<HTMLDivElement>(null)

    const toggleOpen = () => setIsOpen(!isOpen)

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
    }, [chatStore._messages, chatStore._isMessageLoading])

    return (
        <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end space-y-4">
            {isOpen && (
                <Card className="w-[380px] h-[500px] flex flex-col shadow-2xl
                border-border/50 animate-in fade-in slide-in-from-bottom-10 duration-300">
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
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={toggleOpen}
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
                                <div className="flex gap-4">
                                    <div className="mt-0.5 min-w-8">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Bot size={16} />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-foreground">AI Assistant</p>
                                        <div className="flex space-x-1 h-5 items-center">
                                            <div
                                                className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"
                                            />
                                            <div
                                                className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"
                                            />
                                            <div
                                                className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {chatStore._error && (
                                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg text-center">
                                    {chatStore._error}
                                </div>
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
                </Card>
            )}

            <Button
                onClick={toggleOpen}
                size="icon"
                className={cn(
                    "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105",
                    isOpen ? "rotate-0" : "rotate-0"
                )}
            >
                <MessageCircle size={28} />
            </Button>
        </div>
    )
}

export default observer(AiChatbot)
