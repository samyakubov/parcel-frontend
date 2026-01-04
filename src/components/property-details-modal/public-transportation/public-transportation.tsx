"use client"
import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { isEmpty, isNil, isUndefined } from "lodash-es"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BusFront, MapPin } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"

interface PublicTransportationCardProps {
    routesNearBy: Route[] | null | undefined
    stopsNearBy: Stop[] | null | undefined
}

export default function PublicTransportation({ routesNearBy, stopsNearBy }: PublicTransportationCardProps) {
    const nearbyStopIds = React.useMemo(() => {
        if (!stopsNearBy) return new Set<string>()
        return new Set(stopsNearBy.map(stop => stop.stop_id))
    }, [stopsNearBy])

    const isStopNearby = (stopId: string) => nearbyStopIds.has(stopId)

    const deduplicateStops = (stops: Stop[] | undefined) => {
        if (!stops) return []

        const seenNames = new Set<string>()
        return stops.filter(stop => {
            if (seenNames.has(stop.stop_name)) {
                return false
            }
            seenNames.add(stop.stop_name)
            return true
        })
    }

    // Loading state
    if (isUndefined(routesNearBy) || isUndefined(stopsNearBy)) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                            <BusFront className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-semibold">
                                Public Transportation
                            </h3>
                            <p className="text-sm italic text-gray-500">
                                Within a mile radius
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </CardContent>
            </Card>
        )
    }

    // No data state
    if (isNil(routesNearBy) || isEmpty(routesNearBy)) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                            <BusFront className="h-4 w-4 text-destructive" />
                        </div>
                        <h3 className="text-lg font-semibold text-destructive">
                            Public Transportation
                        </h3>
                    </div>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertDescription>
                            No public transit information available.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }

    // Data loaded state

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                        <BusFront className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">
                            Public Transportation
                        </h3>
                        <p className="text-sm italic text-gray-500">
                            Within a mile radius
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-3">
                <div className="max-h-96 overflow-y-auto pr-2">
                    <Accordion type="single" collapsible className="space-y-3">
                        {routesNearBy.map((route) => {
                            const dedupedStops = deduplicateStops(route.stops)
                            const nearbyStopsCount = dedupedStops.filter(stop =>
                                isStopNearby(stop.stop_id)
                            ).length || 0

                            return (
                                <AccordionItem
                                    key={route.route_id}
                                    value={route.route_id}
                                    className="border-2 rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                                >
                                    <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-accent/50">
                                        <div className="flex items-center gap-4 flex-1">
                                            <Avatar className="h-12 w-12 flex-shrink-0 shadow-sm">
                                                <AvatarFallback
                                                    className="text-lg font-bold"
                                                    style={{
                                                        backgroundColor: `#${route.route_color}`,
                                                        color: `#${route.route_text_color}`
                                                    }}
                                                >
                                                    {route.route_id}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1 min-w-0 text-left">
                                                <p className="font-semibold truncate text-base">
                                                    {route.route_long_name}
                                                </p>
                                                {route.route_desc && (
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {route.route_desc}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-2 mt-1">
                                                    <p className="text-xs text-muted-foreground">
                                                        {dedupedStops.length} stops
                                                    </p>
                                                    {nearbyStopsCount > 0 && (
                                                        <>
                                                            <span className="text-xs text-muted-foreground">•</span>
                                                            <p className="text-xs font-medium text-primary">
                                                                {nearbyStopsCount} nearby
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="px-0 pb-0">
                                        {dedupedStops.length > 0 && (
                                            <div className="border-t bg-muted/30">
                                                <div className="max-h-64 overflow-y-auto">
                                                    {dedupedStops.map((stop) => {
                                                        const isNearby = isStopNearby(stop.stop_id)

                                                        return (
                                                            <div
                                                                key={stop.stop_id}
                                                                className={`px-4 py-3 flex items-start 
                                                                gap-3 transition-colors border-b last:border-b-0 ${isNearby
                                                                        ? "bg-primary/10 hover:bg-primary/20 border-l-4 border-l-primary"
                                                                        : "hover:bg-accent/30"
                                                                    }`}
                                                            >
                                                                <MapPin
                                                                    className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isNearby ? "text-primary fill-primary/20" : "text-primary"
                                                                        }`}
                                                                />
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2">
                                                                        <p className={`font-medium text-sm ${isNearby ? "text-primary font-semibold" : ""
                                                                            }`}>
                                                                            {stop.stop_name}
                                                                        </p>
                                                                        {isNearby && (
                                                                            <span className="text-xs px-2 py-0.5 bg-primary
                                                                            text-primary-foreground rounded-full font-medium">
                                                                                Nearby
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {stop.platform_code && (
                                                                        <p className="text-xs text-muted-foreground">
                                                                            Platform {stop.platform_code}
                                                                        </p>
                                                                    )}
                                                                    {stop.stop_desc && (
                                                                        <p className="text-xs text-muted-foreground mt-1">
                                                                            {stop.stop_desc}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            </CardContent>
        </Card>
    )
}
