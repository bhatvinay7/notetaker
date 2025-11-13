import 'hono'
export interface userCredentials{
     username:string
     email:string
     userId:string
     picture:string
     isVerified:boolean
     token:string
}

declare module 'hono' {
  interface ContextVariableMap {
    user: userCredentials
  }
}
