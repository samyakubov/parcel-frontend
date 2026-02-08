import { action, makeAutoObservable} from "mobx"


class ChatStore {
	constructor() {
		makeAutoObservable(this)
	}
	public _messages:Message[] = []
	public _isMessageLoading: boolean = false


	public pushMessage = action((message: Message)=>{
		this._messages.push(message)
	})

	public setIsLoading = action((isLoading:boolean) => {
		this._isMessageLoading = isLoading
	})
}

export const chatStore = new ChatStore()
