import {Request, Response} from 'express'
import { ICustomer, } from '../types'
import Customer from '../model/Customer'
import { validationResult } from 'express-validator'
import UserAuth0 from '../model/UserAuth0'

export const postCustomer = async (req : Request, res: Response) : Promise< Response<any, Record<string, any>> | void> => {
    const {name, lastName, email, country, city} : ICustomer = req.body 
    const errors = validationResult(req);
    const fullName = name + " " + lastName
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
     const nameExists =  Customer.findOne({fullName})
     const emailExists =  Customer.findOne({email})
      
      const customerPromiseAll = await Promise.all([nameExists, emailExists])
      const [nameExistsPromise, emailExistsPromise] = customerPromiseAll
     if(nameExistsPromise||emailExistsPromise) {
        
         return res.status(400).json({ error: true, msg: "Cliente ya existente" });
     } 
  
     try {
       const customer = new Customer({ name, lastName,email, country, city});
       await customer.save();
        
       res.status(201).json(customer);
     } catch (error) {
         console.log(error)
     }
  
  
  }

export const getAllCustomer = async (_req: Request, res: Response) => {
    try {
      const allCustomers = await Customer.find()

      res.status(200).json(allCustomers)
    } catch (error) {
      console.log(error)
    }
}
export const fuseWithUser = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void>  => {
    const id = req.params.id
    const {email} = req.body
try {
 const user = await UserAuth0.findOne({email})
 if(user){
     const customerId = await Customer.findByIdAndUpdate(id,{ $set: { userId: user._id }},{new:true})
return res.status(200).json(customerId)
}
return res.status(400).json({error: true, msg: "No se encontró al usuario"})
} catch (error) {
 console.log(error)
}
}
export const getCustomer = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void>  => {
    const id = req.params.id
try {

 if(id){
     const customerId = await Customer.findById(id)
return res.status(200).json(customerId)
}
return res.status(400).json({error: true, msg: "No se encontró clientela"})
} catch (error) {
 console.log(error)
}
}