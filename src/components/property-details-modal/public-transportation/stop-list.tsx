import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import StopItem from "@/components/property-details-modal/public-transportation/stop-item"

interface StopListProps {
    stops: Stop[]
    nearbyStopIds: Set<string>
}

export default function StopList({ stops, nearbyStopIds }: StopListProps) {
    if (stops.length === 0) return null

    return (
        <div className="border-t bg-muted/30">
            <ScrollArea className="h-64 w-full">
                {stops.map((stop) => (
                    <StopItem
                        key={stop.stop_id}
                        stop={stop}
                        isNearby={nearbyStopIds.has(stop.stop_id)}
                    />
                ))}
            </ScrollArea>
        </div>
    )
}
