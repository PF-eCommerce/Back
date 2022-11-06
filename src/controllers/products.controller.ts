import Product from '../model/Product'
import Category from '../model/Category'
import {postIProduct, noIdCategory} from '../types'
import {Request, Response} from 'express'

export const postProduct = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void>  =>  {
      
    const {title , desc , img, price, numStock } : postIProduct  = req.body
    const {type, size , color} : noIdCategory = req.body
     
    try {
        const existsProduct = await Product.findOne({title})
        if(existsProduct){
            return res.status(400).json({error : true, msg: 'el producto ya existeeeeeee'})
        }

        const product =  new Product({title , desc , img, price, numStock})
        
        await new Category({_id : product._id ,type, size , color}).save()
        await product.save();

        return res.status(201).json(product)
    } catch (error) {
        console.log(error)
    }
}

export const getProduct = async (_req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void> => {
    try {
        const allProducts = await Product.find()

        if(allProducts.length === 0) return res.status(204).json({msg : "no existe ningun product"})

        return res.status(200).json(allProducts)
    } catch (error) {
        console.log(error)
    }
}

export const getCategory = async (_req : Request , res: Response) : Promise<Response<any, Record<string, any>>|void> => {
    try {
        const allCategory = await Category.find()

        if(allCategory.length === 0) return res.status(204).json({msg : "no existe ninguna categoria"})

        return res.status(200).json(allCategory)

    } catch (error) {
        
    }
}