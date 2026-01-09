declare global {
    interface Message {
        id: string
        role: "user" | "ai"
        content: string
    }
    interface ChatResponse {
        response: string
        property_data:PropertyDetailsWithCoords
    }
}

export { }
