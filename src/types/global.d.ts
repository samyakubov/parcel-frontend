
declare global {
   interface HTTPError {
       message: string
       status_code: number
   }
}

export {}
