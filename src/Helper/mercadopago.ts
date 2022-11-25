import mercadopago from 'mercadopago'
import { Iitem } from '../types'
// import {CreatePreferencePayload} from '@types/mercadopago'
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model'

// const mercadoPago = require('mercadopago');

export const mercadoPagoLink = async (products:Iitem[]) => {
    
    //INTERFAZ CON LOS TIPADOS DEL ARRAY y devuelve un string
    try {
        
        mercadopago.configure({
            access_token : `${process.env.ACCESS_TOKEN}` // con el template se le indica que se un string o una variable
        })
        
        const preference = {
            items: products.map(p => {
                //map as (interfaz)
                return {
                    title: p.name,
                    quantity: p.count,
                    currency_id: 'ARS',
                    unit_price: p.price
                }
            }),
    
            // notification_url :'http://localhost:3001/notification'
            notification_url : 'https://back-production-2a09.up.railway.app/notification'
            // notification_url : 'https://a798-2800-810-513-807a-c1ea-d51f-80ee-1f5c.sa.ngrok.io/notification'

          };
          
         const response = await mercadopago.preferences.create(preference as CreatePreferencePayload)
         console.log('MERCADOPAGLINK3', response)
         return response.body.init_point
    } catch (error) {
        console.log(error)
    }
}

