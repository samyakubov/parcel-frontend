declare global {
    interface Message {
        id: string
        role: "user" | "ai"
        content: string
    }
}

export { }
