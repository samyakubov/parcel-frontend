

export const handleCopy = async (e: React.MouseEvent, text:string) => {
    e.stopPropagation()
    try {
        await navigator.clipboard.writeText(text)
    } catch (err) {
        console.error("Failed to copy:", err)
    }
}
