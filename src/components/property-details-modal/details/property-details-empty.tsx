import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2 } from "lucide-react"

export default function PropertyDetailsEmpty() {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-destructive/10">
                        <Building2 className="h-4 w-4 text-destructive" />
                    </div>
                    <h3 className="text-lg font-semibold text-destructive">
                        Property Details
                    </h3>
                </div>
            </CardHeader>
            <CardContent>
                <Alert variant="destructive">
                    <AlertDescription>No property details available.</AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
}
