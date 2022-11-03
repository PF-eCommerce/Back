import User from '../model/User'
import {Request, Response} from 'express'


export const getAllUser = async (_req: Request, res: Response) => {
       try {
         const allUsers = await User.find()

         res.status(200).json(allUsers)
       } catch (error) {
         console.log(error)
       }
}