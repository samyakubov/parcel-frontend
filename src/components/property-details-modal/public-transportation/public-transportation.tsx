"use client"
import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {isNil} from "lodash-es"
import {observer} from "mobx-react"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {BusFront} from "lucide-react"

interface PublicTransportationCardProps {
    routesNearBy:FeatureCollection | null
}

function PublicTransportation({routesNearBy}:PublicTransportationCardProps) {
    const features = routesNearBy?.features

    if (isNil(features) || features.length === 0) {
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
            <CardContent className="space-y-0">
                {features.map((item, index) => {
                    const properties = item.properties
                    return (
                        <div key={index} className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarFallback
                                        style={{
                                            backgroundColor: `#${properties.route_color}`,
                                            color: `#${properties.route_text_color}`
                                        }}
                                    >
                                        {properties.route_name}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{properties.route_long_name}</p>
                                    <p className="text-sm text-gray-500">{properties.route_id}</p>
                                </div>
                            </div>
                            <p className="text-sm">{properties.distance} mi</p>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default observer(PublicTransportation)
