import Product from '../model/Product'
import {postIProduct} from '../types'
import {Request, Response} from 'express'

export const postProduct = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void>  =>  {
      
    const {title , desc , img, price } : postIProduct  = req.body
     
    try {
        const existsProduct = await Product.findOne({title})
        if(existsProduct){
            return res.status(400).json({error : true, msg: 'el producto ya existeeeeeee'})
        }

        const product =  new Product({title , desc , img, price})

        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
    }
}