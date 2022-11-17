import * as helper from "../Helper/pasarela/paypal";
import { Request, Response } from 'express';
const stripe = require('stripe')('sk_test_51M58hjKKgTZYfNTV2iUQp6AW7lTzYX9XDcelXIsGEUUOHtbhQ7UtwjuXd5HZozY41ApPyaWIsmtZXzpbWOLUfYJQ006rbClXSc')


export const createOrderPaypal = async (_req: Request, res: Response) => {

  try{
    const response = await helper.createOrder()
    res.json(response);

  } catch (error) {
    res.json(error);
  }

}

export const captureOrderPaypal = async (req: Request, res: Response) => {

  try {
    const { token } = req.query;

    const data = await helper.captureOrder(token);

    console.log(data)

    res.redirect("http://localhost:3000/wenas")//TODO: Insertar redireccion

  } catch (error) {
    console.log("/controles/pasarela/captureOrder", error);
  }
}

export const cancelOrderPaypal = (_req: Request, res: Response) => {
  res.redirect("http://localhost:3000/wenas")//TODO: insertar redireccion
}

export const createSessionStripe = async (_req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1M59glKKgTZYfNTVhddbjRTb',
          quantity: 2,
        },
        {
          price: 'price_1M594oKKgTZYfNTVgP5VpTEo',
          quantity: 3,
        }
      ],
      mode: 'payment',
      success_url: `${process.env["HOST"]}/capture-order-stripe`,
      cancel_url: `http://localhost:3001/home?canceled=true`,
    });
    res.redirect(303, session.url);
  } catch (error) {
    console.log("controllers/pasarela/createSessionStripe", error)
  }
}

export const captureOrderStripe = async (_req: Request, res: Response) => {
  res.redirect("http://localhost:3000/wenas")
}




