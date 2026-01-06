import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { School as SchoolIcon } from "lucide-react"

export default function SchoolsLoading() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                        <SchoolIcon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">
                        Schools
                    </h3>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <Skeleton className="h-4 w-[230px]" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
            </CardContent>
        </Card>
    )
}
