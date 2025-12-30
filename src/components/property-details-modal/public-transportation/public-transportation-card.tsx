"use client"
import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {publicTransitStore} from "@/stores/public-transit-store"
import {isNil} from "lodash-es"
import {observer} from "mobx-react"


function PublicTransportationCard() {
    const routesNearBy = publicTransitStore._routesNearBy
    const features = routesNearBy?.features

    if (isNil(features)) {
        return null
    }

    return (
        <div className="space-y-0">
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
        </div>
    )
}

export default observer(PublicTransportationCard)
