import { Types } from 'mongoose'
import { Request } from 'express'
//interfaz para el req.body del controller de user

export interface registerUser {
    userName : string
    email : string
    password : string
}

export interface reviewUser {
    userId : string
    comment : string
    rating : number
}

// type req.body auth login

export type authLogin = Omit<registerUser, 'userName'>

//interfaz para el model User

export interface IUserAuth  {
 
  id : Types.ObjectId
  userName : string
  email : string
  admin : boolean
}
export interface IUser extends registerUser {
    image: string; 
    admin : boolean
    token : string
    confirmed : boolean
   
  }

  export interface postIProduct {
    title: string;
    desc: string;
    img: string[];
    price: number;
    numStock: number;
    type: string;
    size : string[];
    color : string[];
    rating : number;
    numReview : number;
  }

  export interface IProduct extends postIProduct{
   
    categories : string[];
    inStock : boolean;
    exists: boolean;
  }
  export interface IReview{
    product : Types.ObjectId;
    rating : number;
    comment: string;
    exists: boolean;
    user: Types.ObjectId;
    made: Date;
  }

  export enum Type {
    ABRIGOS = "Abrigos",
    MODA = "Accesorio",
    SHORTS = "Shorts",
    BLUSAS = "Blusas",
    CALZADO = "Zapatillas",
    CAMISAS = "Camisas",
    ENTERITOS = "Enteritos",
    EQUIPAJE = "Equipaje",
    LABORAL = "Indumentaria Laboral",
    KIMONOS = "Kimonos",
    PANTALONES = "Pantalones",
    POLERAS = "Poleras",
    REMERAS = "Remeras",
    DEPORTIVAS = "Ropa deportiva",
    INTERIORES = "Ropa interior",
    BEBÉS = "Ropa y calzado para bebés",
    TRAJES = "Trajes",
    BAÑO = "Trajes de baño",
    VESTIDOS = "Vestidos"
  }


  
  export interface IchangePassword {
    inputPass : string
    updatedPassword : string
  }
  

  export interface IAuthid extends Request {
    userId : string
  }

 export interface Iregister {
    userName : string
    email : string 
    token : string
}

export type IforgotPassword  = Omit<Iregister, 'userName'>


export interface Ipayment {
  link : string
  local : string
   email : string
}