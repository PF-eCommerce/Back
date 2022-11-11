
import jwt from 'jsonwebtoken' 
import express from "express";



export interface IPayload{
    id : string
    iat : number,
    exp : number
   }
export const verifyToken = async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    const token = req.header('Bearer')
   
    if(!token) {
        res.status(400).json({error : true, msg: 'acceso denegado'})
        return
    }
   
    try {
        const verify =  jwt.verify(token , `${process.env.JWT_SEC}`) 
            console.log(verify)
         req.app.locals.id =  typeof verify === 'object' && verify.id
        
        
         
        
        next()
    } catch (error) {
        console.log(error)
    }
    
};