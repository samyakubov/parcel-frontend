import { useState, useCallback } from "react"
import { apiClient } from "@/api/api-client"

export type Message = {
    id: string
    role: "user" | "ai"
    content: string
}

export default function useAiChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content
        }

        setMessages(prev => [...prev, userMessage])
        setIsLoading(true)
        setError(null)

        try {
            const result = await apiClient.aiService.ask(content)

            const aiMessage: Message = {
                id: crypto.randomUUID(),
                role: "ai",
                content: result.response
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (err) {
            console.error(err)
            setError("Failed to get response from AI. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    const clearMessages = useCallback(() => {
        setMessages([])
        setError(null)
    }, [])

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages
    }
}
