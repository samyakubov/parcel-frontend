import { action, makeAutoObservable} from "mobx"


class ChatStore {
    constructor() {
        makeAutoObservable(this)
    }
    public _messages:Message[] = []
    public _isMessageLoading: boolean = false
    public _error: string | null = null


    public pushMessage = action((message: Message)=>{
        this._messages.push(message)
    })

    public setIsLoading = action((isLoading:boolean) => {
        this._isMessageLoading = isLoading
    })

    public setError = action((error:string | null) => {
        this._error = error
    })
}

export const chatStore = new ChatStore()
