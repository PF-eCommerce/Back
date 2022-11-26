import * as helper from "../Helper/pasarela/paypal";
import * as productFormat from "../Helper/pasarela/productsFormat";
import { Request, Response } from 'express';
import { OrderModel } from "../model/OrderModel";
// import { Iorder } from "../types";
const stripe = require('stripe')('sk_test_51M58hjKKgTZYfNTV2iUQp6AW7lTzYX9XDcelXIsGEUUOHtbhQ7UtwjuXd5HZozY41ApPyaWIsmtZXzpbWOLUfYJQ006rbClXSc')


export const createOrderPaypal = async (req: Request, res: Response) => {

  try {
    const totalPrice = req.body.data.reduce((sum:number, p:any) => {
      return sum + (p.price*p.units)
    }, 0)
    const response = await helper.createOrder(totalPrice)
    const order = new OrderModel(productFormat.orderFormat(req.body));
    await order.save();
    res.json(response.links[1].href);

  } catch (error) {
    res.json(error);
  }

}

export const captureOrderPaypal = async (req: Request, res: Response) => {

  try {
    const { token } = req.query;
    const id = req.params.id

    const data = await helper.captureOrder(token);

    if (data.status === 'COMPLETED') {
      await OrderModel.updateOne({ _id: id },
        {
          $set: {
            status: "Success",
          }
        }
      )

      res.redirect("http://localhost:3000/success")
    }//TODO: Insertar redireccion

  } catch (error) {
    console.log("/controller/pasarela/captureOrder", error);
    res.redirect("http://localhost:3000/failed")
  }
}

export const cancelOrderPaypal = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await OrderModel.updateOne({ _id: id },
      {
        exist: false,
      })
    res.redirect("http://localhost:3000/failed")//TODO: insertar redireccion
  } catch (error) {
    console.log("/controller/pasarela/captureOrder")
  }
}

export const createSessionStripe = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const dataOutput:any = await productFormat.stripeFormat(data.data);

    const order = new OrderModel(productFormat.orderFormat(req.body));

    const session = await stripe.checkout.sessions.create({
      line_items: dataOutput,
      mode: 'payment',
      success_url: `http://localhost:3001/capture-order-stripe/${order._id.valueOf()}`,
      cancel_url: `http://localhost:3001/cancel-order-stripe/${order._id.valueOf()}`,
    });

    await order.save();

    res.json(session.url);
  } catch (error: any) {
    console.log("controllers/pasarela/createSessionStripe", error)
    res.status(400).json(error)
  }
}

export const cancelOrderStripe = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await OrderModel.updateOne({ _id: id },
      {
        exist: false,
      })
    res.redirect("http://localhost:3000/cart")
  } catch (error) {
    console.log("controllers/pasarela/cancelSessionStripe", error)
  }
}

export const captureOrderStripe = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await OrderModel.updateOne({ _id: id },
      {
        $set: {
          status: "Success",
        }
      })
    res.redirect("http://localhost:3000/home")
  } catch (error) {
    res.redirect("http://localhost:3000/failed")
  }
}




