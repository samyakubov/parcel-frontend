"use client"
import { Input } from "@/components/ui/input"
import { searchStore } from "@/stores/search-store"
import { Button } from "@/components/ui/button"
import { observer } from "mobx-react"
import useSearchByBbl from "@/hooks/property-search/use-search-by-bbl"


function BblSearchBar() {
    const searchByBbl = useSearchByBbl()

    const handleSearch = () => {
        void searchByBbl()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="relative shadow-xl rounded-full">
            <div className="flex gap-2 p-1.5 bg-background/80 dark:bg-background/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full transition-all duration-300 hover:shadow-2xl hover:bg-background/90 dark:hover:bg-background/70">
                <Input
                    placeholder="Enter BBL (e.g. 1000010001)"
                    className="flex-grow bg-transparent border-none shadow-none focus-visible:ring-0 px-4 h-11 text-base placeholder:text-muted-foreground/70"
                    value={searchStore._bblSearchQuery}
                    onChange={(e) => searchStore.setBblSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button
                    className="rounded-full px-6 h-11 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>
        </div>
    )
}

export default observer(BblSearchBar)
