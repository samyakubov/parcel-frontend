interface TooltipPayloadItem {
    name?: string
    value?: number
    payload?: {
        total?: number
        label?: string
        value?: number
    }
}

interface CustomTooltipProps {
    active?: boolean
    payload?: TooltipPayloadItem[]
}

export function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length > 0) {
        const data = payload[0]
        const total = data.payload?.total || 0
        const value = data.value || 0
        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0

        return (
            <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-3">
                <p className="font-semibold text-sm">{data.name}</p>
                <p className="text-sm text-muted-foreground">
                    {value.toLocaleString()} ({percentage}%)
                </p>
            </div>
        )
    }
    return null
}
