import * as helper from "../Helper/pasarela/paypal";
import * as productFormat from "../Helper/pasarela/productsFormat";
import { Request, Response } from 'express';
import { OrderModel } from "../model/OrderModel";
// import { Iorder } from "../types";
const stripe = require('stripe')('sk_test_51M58hjKKgTZYfNTV2iUQp6AW7lTzYX9XDcelXIsGEUUOHtbhQ7UtwjuXd5HZozY41ApPyaWIsmtZXzpbWOLUfYJQ006rbClXSc')


export const createOrderPaypal = async (req: Request, res: Response) => {

  try {
    // console.log("products", req.body.data.data);
    const totalPrice = req.body.data.data.reduce((sum: any, p: any) => {
      // console.log(sum, p.price, p.qty);
      return sum + p.price * p.qty;
    }, 0)
    //TODO: Arreglar esta porqueria
    const order = new OrderModel(productFormat.orderFormat(req.body));
    // console.log(order)
    const id = order._id.valueOf()
    const response = await helper.createOrder(totalPrice, id)
    await order.save();
    // console.log(response)
    res.json(response.links[1].href);

  } catch (error) {
    console.log("controllers/pasarela/createOrderPaypal", error)
    res.status(400).json(error);
  }

}

export const captureOrderPaypal = async (req: Request, res: Response) => {
  const { token, id } = req.query;
  try {

    const data = await helper.captureOrder(token);
    if(data === "orderFailed")  res.redirect(`${process.env["HOST"]}/cancel-order-paypal?id=${id}`)

    if (data.status === 'COMPLETED') {
      await OrderModel.updateOne({ _id: id },
        {
          $set: {
            status: "Success",
          }
        }
      )
      res.redirect(`${process.env["FRONT"]}/success`)
    }//TODO: Insertar redireccion

  } catch (error) {
    console.log("/controller/pasarela/captureOrder", error);
  }
}

export const cancelOrderPaypal = async (req: Request, res: Response) => {
  try {
    const {id, canceled} = req.query;
    const awa = await OrderModel.updateOne({ _id: id },
      {
        exist: false,
      })
    console.log(awa)
    if(canceled === "true") res.redirect(`${process.env["FRONT"]}/cart`)//TODO: insertar redireccion
    else res.redirect(`${process.env["FRONT"]}/failed`)
  } catch (error) {
    console.log("/controller/pasarela/cancelOrder", error)
  }
}

export const createSessionStripe = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const dataOutput: any = await productFormat.stripeFormat(data.data);

    const order = new OrderModel(productFormat.orderFormat(req.body));

    const session = await stripe.checkout.sessions.create({
      line_items: dataOutput,
      mode: 'payment',
      success_url: `${process.env["HOST"]}/capture-order-stripe/${order._id.valueOf()}`,
      cancel_url: `${process.env["HOST"]}/cancel-order-stripe/${order._id.valueOf()}`,
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
    res.redirect(`${process.env["FRONT"]}/cart`)
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
    res.redirect(`${process.env["FRONT"]}/success`)
  } catch (error) {
    res.redirect(`${process.env["FRONT"]}/failed`)
  }
}




