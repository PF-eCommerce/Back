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
export interface ICustomer {
  userId: Types.ObjectId,
  name: string,
  lastName: string,
  email: string,
  country: string, 
  city: string,
  spent: number,
  sizes: string[]
}

export interface IorderItem{
  name: string
  qty: number
  image: string
  price: number
  product: Types.ObjectId
  count: number
  _id: Types.ObjectId
  title: string
  quantity: number
  currency_id: string
  unit_price: number
}

export interface Ipayment{
  name: string
  lastName: string
  phone: number
  address_user: string
  info: string
  email: string
  surname: string
}

export interface Iorder{
  user: Types.ObjectId
  orderItems?: IorderItem
  PaymentMethod: string
  status: string
  email_address: string
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt: Date
  isDelivered: boolean
  date: Date
  address: string
  userPaymentInfo?: Ipayment
}

export interface Icontroller{
  name: string
  count: number
  price: number
}

export interface Ilocation{
  street_name: string
  street_number: number
  zip_code: string
}

export interface Idata{
  data?:IpasarelaCompras[]
}

export interface IpasarelaCompras{
  productArray?:IorderItem[]
  userId:string
  location?:Ilocation
  input?:Ipayment
}

export interface Iitem extends IorderItem{
  title: string
  quantity: number
  currency_id: string
  unit_price: number

}

export interface IAuth0User {
  email: string,
  email_verified : boolean,
  name: string,
  nickname : string,
  picture : string,
  sub : string,
  updated_at : string
}

export interface Ipreference{
  items:Iitem[]
}

export interface IAuth0Model extends IAuth0User {
  admin : boolean
}