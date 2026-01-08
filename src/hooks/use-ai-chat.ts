import { useCallback } from "react"
import { apiClient } from "@/api/api-client"
import {chatStore} from "@/stores/chat-store"

export default function useSendAiMessage() {

    return useCallback(async (content: string) => {
        if (!content.trim()) return

        chatStore.pushMessage({
            id: crypto.randomUUID(),
            role: "user",
            content
        })
        chatStore.setIsLoading(true)

        const result = await apiClient.aiService.ask(content)

        chatStore.pushMessage({
            id: crypto.randomUUID(),
            role: "ai",
            content: result.response
        })

        chatStore.setIsLoading(false)
    }, [])
}
