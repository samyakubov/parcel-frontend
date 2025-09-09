"use client"
import {observer} from "mobx-react"
import SearchBarWithAutocomplete from "@/components/address-search-bar/search-bar-with-autocomplete"

function Search() {
	return (
		<div className="mx-auto">
			<div className="bg-card rounded-2xl shadow-2xl p-8">
				<h2 className="text-3xl font-bold text-foreground mb-8">Find your home&apos;s history</h2>

				<div className="flex flex-col gap-4">
					<label className="block text-sm font-medium text-muted-foreground">
                        Enter a property address to see its full history
					</label>

					<SearchBarWithAutocomplete/>
				</div>
			</div>
		</div>
	)
}

export default observer(Search)
