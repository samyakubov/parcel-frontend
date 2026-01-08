import {Bot, User} from "lucide-react"

export function ChatMessage({ message }: { message: Message }) {
    const isAi = message.role === "ai"

    return (
        <div className="flex gap-4 group">
            <div className="mt-0.5 min-w-8">
                {isAi ? (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Bot size={16} />
                    </div>
                ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <User size={16} />
                    </div>
                )}
            </div>
            <div className="space-y-1 overflow-hidden">
                <p className="text-sm font-medium text-foreground">
                    {isAi ? "AI Assistant" : "You"}
                </p>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {message.content}
                </div>
            </div>
        </div>
    )
}
