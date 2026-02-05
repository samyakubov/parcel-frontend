import {Bot} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatBotMessageLoading() {
	return (
		<div className="flex gap-4">
			<div className="mt-0.5 min-w-8">
				<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
					<Bot size={16} />
				</div>
			</div>
			<div className="space-y-1">
				<p className="text-sm font-medium text-foreground">AI Assistant</p>
				<div className="space-y-2 py-1">
					<Skeleton className="h-3 w-[200px]" />
					<Skeleton className="h-3 w-[160px]" />
				</div>
			</div>
		</div>
	)
}
