export interface registerUser {
    userName : string
    email : string
    password : string
}

export interface Error {
    msg : boolean
    message : string
}

export  interface IUser {
    image: string;
    userName: string;
    email: string;
    password : string;
    admin : boolean
    token : string
    confirmed : boolean
   
  }