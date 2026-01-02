"use client"
import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { isEmpty, isNil } from "lodash-es"
import { observer } from "mobx-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BusFront, MapPin } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface PublicTransportationCardProps {
    routesNearBy: Route[] | null
}

function PublicTransportation({ routesNearBy }: PublicTransportationCardProps) {
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

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                        <BusFront className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">
                        Public Transportation
                    </h3>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="max-h-96 overflow-y-auto pr-2">
                    <Accordion type="single" collapsible className="space-y-3">
                        {routesNearBy.map((route) => (
                            <AccordionItem
                                key={route.route_id}
                                value={route.route_id}
                                className="border-2 rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                            >
                                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50">
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
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {route.stops?.length || 0} stops
                                            </p>
                                        </div>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="px-0 pb-0">
                                    {route.stops && route.stops.length > 0 && (
                                        <div className="border-t bg-muted/30">
                                            <div className="max-h-64 overflow-y-auto">
                                                {route.stops.map((stop) => (
                                                    <div
                                                        key={stop.stop_id}
                                                        className="px-4 py-3 flex items-start gap-3 hover:bg-accent/30
                                                        transition-colors border-b last:border-b-0"
                                                    >
                                                        <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-sm">
                                                                {stop.stop_name}
                                                            </p>
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
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </CardContent>
        </Card>
    )
}

export default observer(PublicTransportation)
