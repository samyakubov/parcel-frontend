import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { School as SchoolIcon } from "lucide-react"

export default function SchoolsEmpty() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-muted">
                        <SchoolIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-muted-foreground">
                        Schools
                    </h3>
                </div>
            </CardHeader>
            <CardContent>
                <Alert variant="default" className="bg-muted/50 border-0">
                    <AlertDescription className="text-muted-foreground flex items-center gap-2">
                        <SchoolIcon className="h-4 w-4" />
                        No school information available for this location.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
}
