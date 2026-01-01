"use client"
import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {isEmpty, isNil, uniqBy} from "lodash-es"
import {observer} from "mobx-react"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {BusFront} from "lucide-react"

interface PublicTransportationCardProps {
    routesNearBy:FeatureCollection | null
}

function PublicTransportation({routesNearBy}:PublicTransportationCardProps) {
    const features = routesNearBy?.features
    const dedupedFeatures = features ? uniqBy(features, "properties.route_long_name") : []

    if (isNil(features) || isEmpty(features)) {
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
            <CardContent className="p-0">
                {dedupedFeatures.map((item, index) => {
                    const properties = item.properties

                    return (
                        <div
                            key={index}
                            className={`flex items-center justify-between 
                                        p-5 transition-colors duration-200`}
                            >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <Avatar className="h-12 w-12 flex-shrink-0 shadow-sm">
                                    <AvatarFallback
                                        className="text-lg font-bold"
                                        style={{
                                            backgroundColor: properties.route_color,
                                            color: properties.route_text_color
                                        }}
                                    >
                                        {properties.route_name}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate">
                                        {properties.route_long_name}
                                    </p>
                                    <p className="text-sm  font-mono">
                                        {properties.route_id}
                                    </p>
                                </div>
                            </div>

                            <div className="ml-4 flex-shrink-0">
                                <p className="text-sm font-medium text-gray-700">
                                    {properties.distance} mi
                                </p>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default observer(PublicTransportation)
