import { action, makeAutoObservable} from "mobx"

class SearchStore {
	constructor() {
		makeAutoObservable(this)
	}

	public addressSearchQuery = ""

	public suggestions: MapboxFeature[] = []
	public isSuggestionsOpen = false
	public suggestionsError: string | null = null

	public setAddressSearchQuery = action((query: string) =>{
		this.addressSearchQuery = query
	})

	public setSuggestions = action((newSuggestions: MapboxFeature[]) =>{
		this.suggestions = newSuggestions
	})

	public setIsSuggestionsOpen = action((isSuggestionsOpen: boolean) => {
		this.isSuggestionsOpen = isSuggestionsOpen
	})

	public setSuggestionsError = action((error: string | null) => {
		this.suggestionsError = error
	})

}

export const searchStore = new SearchStore()
