declare global {
    interface Message {
        id: string
        role: "user" | "ai"
        content: string
    }
    interface ChatResponse {
        response: string
        propertyData:PropertyDetailsWithCoords
    }
}

export { }
