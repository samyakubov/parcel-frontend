import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
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
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF
        </Button>
    )
}
