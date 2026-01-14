import { Button } from "@/components/ui/button"
import {Download} from "lucide-react"
import {exportAsPDF} from "@/utils/export-as-pdf"



interface ExportToPdfButtonProps {
    data: PropertyModal
}

export function ExportPDFButton({data}: ExportToPdfButtonProps) {

    return (
        <Button
            onClick={async ()=>{
                await exportAsPDF(data)
            }}
            variant="default"
        >
            <Download className="h-4 w-4" />
        </Button>
    )
}
