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

  export  interface IProduct {
    title: string;
    desc: string;
    img: string[];
    categories : string[];
    price: number;
    inStock : boolean;
    numStock: number;
    exists: boolean;
  }

  export enum Type {
    ABRIGOS = "Abrigos",
    MODA = "Accesorio",
    SHORTS = "Shorts",
    BLUSAS = "Blusas",
    CALZADO = "Calzas",
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

  export  interface ICategory {
    product: string;
    type: string;
    size : string[];
    color : string[];
  }