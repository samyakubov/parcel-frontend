import { action, makeAutoObservable} from "mobx"
import {type ApiError} from "@/types/errors"

class SearchStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _addressSearchQuery = ""

	public _suggestions: MapboxFeature[] = []
	public _isSuggestionsOpen = false
	public _suggestionsError: string | null = null
	public _error: ApiError | null = null

	public setAddressSearchQuery = action((query: string) =>{
		this._addressSearchQuery = query
	})

	public setSuggestions = action((newSuggestions: MapboxFeature[]) =>{
		this._suggestions = newSuggestions
	})

	public setIsSuggestionsOpen = action((isSuggestionsOpen: boolean) => {
		this._isSuggestionsOpen = isSuggestionsOpen
	})

	public setSuggestionsError = action((error: string | null) => {
		this._suggestionsError = error
	})

}

export const searchStore = new SearchStore()
