import React from "react"
import { CardHeader } from "@/components/ui/card"
import { School } from "lucide-react"

export default function SchoolsHeader() {
    return (
        <CardHeader>
            <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                    <School className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">
                        Schools
                    </h3>
                    <p className="text-sm italic text-gray-500">
                        In the district
                    </p>
                </div>
            </div>
        </CardHeader>
    )
}
