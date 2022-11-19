import axios from 'axios'
// const { emailPayment } = require('../helper/confirmEmail')
import {mercadoPagoLink} from '../Helper/mercadopago'
import {OrderModel} from '../model/OrderModel'
// const Product = require('../models/Product')
import {IorderItem} from '../types'

let order:any

export const postOrder = async (req: Request, res: Response) => {
    
   try {
    
    const {name, qty, image, price, product}:IorderItem = req.body
    console.log('DATA', name)
    console.log('DATA', qty)
    console.log('DATA', image)
    console.log('DATA', price)
    console.log('DATA', product)
    //  const id = req.params.id
    // //  console.log(data[2])
   
    
    //   order = new OrderModel({ user : id , orderItems : data[0].map(el => {
    //     return {
    //         name: el.name,
    //         qty: el.count,
    //         image: el.image,
    //         price: el.price,
    //         product: el._id
    //     }
    //  }),  
    //  address: data[1],
    //  userPaymentInfo : data[2]
     
    
    // })
     
    // await order.save();
     
    
    //  const link:string = await mercadoPagoLink(data[0])
       
    //  emailPayment(link, data[1], data[2].email)
     
     res.send(link)
   } catch (error) {
    console.log(error)
   }
    
}

const notification = async (req: Request, res: Response) => {
    const datos = req.query

 

    const idStatus = datos["data.id"]
    console.log(idStatus)
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
module.exports = {
    postOrder,
    notification

}