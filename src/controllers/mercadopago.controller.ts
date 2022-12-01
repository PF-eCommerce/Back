
import { emailPayment } from '../Helper/mailer/msjMailer'
import {mercadoPagoLink} from '../Helper/mercadopago'
import {OrderModel} from '../model/OrderModel'
// const Product = require('../models/Product')
import {Idata, IorderItem, Ilocation, Ipayment} from '../types'
import {Request, Response} from 'express'
import mercadopago  from 'mercadopago'

// import * as mongoose from "mongoose"

let order: any

export const postOrder = async (req: Request, res: Response) => {
    
   try {
    
    const data:Idata[] = req.body
    
    let productArray = data[0] as IorderItem[]
   
    let location = data[1] as Ilocation
    
    let input = data[2] as Ipayment
    let email = data[3] as string
     const id = req.params.id
     
    
      
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
       
        await order.save();
        
        const link:string = await mercadoPagoLink(productArray)
          
          emailPayment({link , email}) 
        
         res.send(link)
     }

    
     
    

   } catch (error) {
    console.log('ERROR',error)
   }
    
}

export const notification = async (req: Request, res: Response) => {
    const {query} = req
    
    
    try {
        
         const paymentId = query.id || query["data.id"] 
        const data = await mercadopago.payment.findById(Number(paymentId))
               
           
          
        if(data) {
            
              order.status = data.body.status
              if(data.body.status === 'approved'){
                order.totalPrice = data.body.transaction_amount
                order.isPaid = true  
              }

              await order.save()
        }
       res.status(200)
        
    } catch (error) {
        console.log(error)
    }
    
}
