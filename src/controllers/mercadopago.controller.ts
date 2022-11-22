import axios from 'axios'
// const { emailPayment } = require('../helper/confirmEmail')
import {mercadoPagoLink} from '../Helper/mercadopago'
import {OrderModel} from '../model/OrderModel'
// const Product = require('../models/Product')
import {Idata, IorderItem, Ilocation, Ipayment} from '../types'
import {Request, Response} from 'express'
// import * as mongoose from "mongoose"

let order: any

export const postOrder = async (req: Request, res: Response) => {
    
   try {
    
    const data:Idata[] = req.body
    // console.log('PRODUCTARRAY', data[0])
    let productArray = data[0] as IorderItem[]
    // console.log('LOCATION', data[1])
    let location = data[1] as Ilocation
    // console.log('INPUT', data[2])
    let input = data[2] as Ipayment
     const id = req.params.id
    //  console.log(id)
     console.log('ENTRA A POSTORDER', productArray)
     if(productArray) {
        
       order = new OrderModel({ 
            user : id ,
            orderItems : productArray.map(el => {
                
            return {
                name: el.name,
                qty: el.count,
                image: el.image,
                price: el.price,
                product: el._id
            }
         }),  
         address: {
            street_name: location.street_name,
            street_number: location.street_number,
            zip_code: location.zip_code
            },
            
         userPaymentInfo : {
            name: input.name,
            lastname: input.surname,
            phone: input.phone
         }
         
        
        })
        console.log('ENTRA A POSTORDER')
        await order.save();
        console.log('ENTRA A POSTORDERRRR')
        const link:string = await mercadoPagoLink(productArray)
           
        //  emailPayment(link, userId, input?.email)
        
         res.send(link)
     }

    
     
    
    //  const link:string = await mercadoPagoLink(productArray)
       
    //  emailPayment(link, data[1], data[2].email)
     
    //  res.send(link)
    res.status(404)
   } catch (error) {
    console.log('ERROR',error)
   }
    
}

export const notification = async (req: Request, res: Response) => {
    const datos = req.query

 

    const idStatus = datos["data.id"]
    // console.log(idStatus)
    try {
        const dataCompra = await axios(`https://api.mercadopago.com/v1/payments/${idStatus}` , {
            headers: { 'Authorization' : 'Bearer '+process.env.ACCESS_TOKEN }
              
            })
           
          
        if(dataCompra.data.status ){
           
          
            order.status = dataCompra.data.status
            if(dataCompra.data.status === 'approved') {
                order.totalPrice = dataCompra.data.transaction_amount
                order.isPaid = true   
            }
                       
             await order.save()
          
        }
        
    } catch (error) {
        //console.log(error)
    }
    res.status(200)
}
// module.exports = {
//     postOrder,
//     notification

// }