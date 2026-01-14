import {Card, CardContent} from "@/components/ui/card"
import {useState} from "react"
import {Building2, ChevronDown, ChevronUp, MapPin, Phone, Users} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"

export default function SchoolCard({ school }: { school: School }) {
    const [expanded, setExpanded] = useState(false)

    const getTypeColor = (type: string) => {
        if (type.includes("Elementary")) return "bg-blue-100 text-blue-700 border-blue-200"
        if (type.includes("Middle")) return "bg-purple-100 text-purple-700 border-purple-200"
        if (type.includes("High")) return "bg-orange-100 text-orange-700 border-orange-200"
        return "bg-gray-100 text-gray-700 border-gray-200"
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base mb-1 line-clamp-2">
                                {school.location_name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                <span className="line-clamp-1">{school.primary_address_line_1}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 items-end flex-shrink-0">
                            <Badge className={`${getTypeColor(school.location_category_description)} text-xs px-2 py-0.5`}>
                                {school.location_type_description}
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-primary/10">
                                <Building2 className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-muted-foreground">Category</p>
                                <p className="text-sm font-medium truncate">{school.location_category_description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-green-100">
                                <Users className="h-3.5 w-3.5 text-green-700" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-muted-foreground">District</p>
                                <p className="text-sm font-medium truncate">{school.community_district}</p>
                            </div>
                        </div>
                    </div>

                    {expanded && (
                        <div className="space-y-3 pt-3 border-t animate-in slide-in-from-top-2">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Council District</p>
                                    <p className="text-sm">{school.council_district}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Police Precinct</p>
                                    <p className="text-sm">{school.police_precinct}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Geographic District</p>
                                    <p className="text-sm">{school.geographical_district_code}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Admin District</p>
                                    <p className="text-sm">{school.administrative_district_code}</p>
                                </div>
                            </div>
                            {school.fax_number && (
                                <div className="flex items-center gap-2 pt-2 border-t">
                                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-sm">Fax: {school.fax_number}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <Button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full flex items-center justify-center gap-1 bg-transparent hover:bg-transparent
                        text-xs text-muted-foreground transition-colors pt-2"
                    >
                        {expanded ? (
                            <>
                                <span>Show Less</span>
                                <ChevronUp className="h-3.5 w-3.5" />
                            </>
                        ) : (
                            <>
                                <span>Show More Details</span>
                                <ChevronDown className="h-3.5 w-3.5" />
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
