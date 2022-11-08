import User from "../model/User";
import jwt, {JwtPayload} from 'jsonwebtoken' 
import { Request, Response, NextFunction } from "express";
import {IUserAuth} from '../types'
export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }
export const verifyToken = async (req : Request, res : Response, next : NextFunction) => {

    const token = req.header('Bearer')

    if(!token) {
        res.status(400).json({error : true, msg: 'acceso denegado'})
        return
    }
 try {
    
    const verify = jwt.verify(token , `${process.env.JWT_SEC}`)

        
       
    }

    

 } catch (error) {
    const e = new Error ('Token no valido')
     res.status(403).json({msg: e.message})
 }
    


};