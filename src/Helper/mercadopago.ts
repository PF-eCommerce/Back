import mercadopago from 'mercadopago'
import {IorderItem} from '../types'

// const mercadoPago = require('mercadopago');

export const mercadoPagoLink = async (products) => {
    //INTERFAZ CON LOS TIPADOS DEL ARRAY y devuelve un string
    try {
        mercadopago.configure({
            access_token : process.env.ACCESS_TOKEN
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
    

            // notification_url : 'https://cell-store-api.onrender.com/notification'

          };
          
         const response = await mercadopago.preferences.create(preference)

         return response.body.init_point
    } catch (error) {
        console.log(error)
    }
}

