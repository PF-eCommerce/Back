import Product from '../model/Product'
import Category from '../model/Category'
import {postIProduct, noIdCategory} from '../types'
import {Request, Response} from 'express'

export const postProduct = async (req : Request , res: Response) =>  {
      
    const {title , desc , img, price, numStock } : postIProduct  = req.body
    const {type, size , color} : noIdCategory = req.body
     
    try {
        const existsProduct = await Product.findOne({title})
        if(existsProduct){
             res.status(400).json({error : true, msg: 'el producto ya existeeeeeee'})
             return
        }

        const product =  new Product({title , desc , img, price, numStock})
        
        await new Category({_id : product._id ,type, size , color}).save()
        await product.save();

        res.status(201).json(product)
    } catch (error) {
        console.log(error)
    }
}

export const getProduct = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void> => {
     
    try {

        const options = {
            limit: 10,
            page: parseInt(req.query.page as string),
        }
        const allProducts = await Product.paginate({}, options)
        

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

export const getProductById = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void> => {
    try {
        const id = req.params.id
        const product = await Product.findById(id);
        if (product){

            return res.status(200).json(product)
        }else{
            return res.status(204).json({error:true, msg: "No existe el producto"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void> => {
    try {
        const id = req.params.id
        const product = await Product.findById(id);
        if (product){
            product.exists = false;
           const update = await product.save()
            return res.status(200).json(update)
        }else{
            return res.status(204).json({error:true, msg: "No existe el producto"})
        }
    } catch (error) {
        console.log(error)
    }
}