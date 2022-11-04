import User from '../model/User'
import bcrypt from 'bcrypt'
import {Request, Response} from 'express'
import { registerUser} from '../types'
import { validationResult } from 'express-validator'




export const postUser = async (req : Request, res: Response) : Promise< Response<any, Record<string, any>> | void> => {
   const {userName, email, password} : registerUser = req.body 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

    const userExists = User.findOne({ email })
    const nameExists =  User.findOne({userName})
     
     const userPromiseAll = await Promise.all([userExists, nameExists])
     const [userExistsPromise, nameExistsPromise] = userPromiseAll
    if(userExistsPromise ||nameExistsPromise) {
       
        return res.status(400).json({ error: true, msg: "usuario ya registrado" });
    } 

    try {
      const encriptPassword = await bcrypt.hash(password, 10)
      const user = new User({ userName, email, password: encriptPassword});
      await user.save();
     
      res.status(201).json(user);
    } catch (error) {
        console.log(error)
    }
 
 
}



