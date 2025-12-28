import { action, makeAutoObservable } from "mobx"

class SearchStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _addressSearchQuery = ""
	public _bblSearchQuery = ""

	public _suggestions: MapboxFeature[] = []
	public _isSuggestionsOpen = false
	public _suggestionsError: string | null = null

	public setAddressSearchQuery = action((query: string) => {
		this._addressSearchQuery = query
	})

	public setBblSearchQuery = action((query: string) => {
		this._bblSearchQuery = query
	})

	public setSuggestions = action((newSuggestions: MapboxFeature[]) => {
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
