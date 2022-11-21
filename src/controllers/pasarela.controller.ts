import * as helper from "../Helper/pasarela/paypal";
import * as productFormat from "../Helper/pasarela/productsFormat";
import { Request, Response } from 'express';
const stripe = require('stripe')('sk_test_51M58hjKKgTZYfNTV2iUQp6AW7lTzYX9XDcelXIsGEUUOHtbhQ7UtwjuXd5HZozY41ApPyaWIsmtZXzpbWOLUfYJQ006rbClXSc')


export const createOrderPaypal = async (_req: Request, res: Response) => {

  try {
    const response = await helper.createOrder()
    res.json(response.links[1].href);

  } catch (error) {
    res.json(error);
  }

}

export const captureOrderPaypal = async (req: Request, res: Response) => {

  try {
    const { token } = req.query;

    const data = await helper.captureOrder(token);

    if(data.status === 'COMPLETED') res.redirect("http://localhost:3000/wenas")//TODO: Insertar redireccion

  } catch (error) {
    console.log("/controller/pasarela/captureOrder", error);
    res.redirect("http://localhost:3000/error")
  }
}

export const cancelOrderPaypal = (_req: Request, res: Response) => {
  res.redirect("http://localhost:3000/wenas")//TODO: insertar redireccion
}

export const createSessionStripe = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const dataOutput = await productFormat.stripeFormat(data)
    const session = await stripe.checkout.sessions.create({
      line_items: dataOutput,
      mode: 'payment',
      success_url: `${process.env["HOST"]}/capture-order-stripe`,
      cancel_url: `http://localhost:3001/home?canceled=true`,
    });
    res.json(session.url);
  } catch (error: any) {
    console.log("controllers/pasarela/createSessionStripe", error)
    res.status(400).json(error)
  }
}

export const captureOrderStripe = async (_req: Request, res: Response) => {
  res.redirect("http://localhost:3000/wenas")
}




