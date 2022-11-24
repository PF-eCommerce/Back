import { OrderModel as Order } from "../model/OrderModel";
import { Request, Response } from "express";
import { Iorder /*IOrderFInal*/ } from "../types";

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders: Array<Iorder> = await Order.find();
    const ordersProducts = orders.map((el) => el.orderItems).flat();
    if (ordersProducts) {
      const itemsPrices = ordersProducts
        .map((p: any) => p.price * p.qty)
        .reduce((a, b) => a + b, 0);
      const itemsQuantity = ordersProducts
        .map((p: any) => p.qty)
        .reduce((a, b) => a + b, 0);
      const ordersFinal: any /*IOrderFInal*/ = {
        orders,
        spent: itemsPrices,
        quantityItems: itemsQuantity,
      };
      return res.status(200).json(ordersFinal);
    } else {
      return res
        .status(500)
        .json({ error: true, msg: "Algo salió mal aquí en el pozo" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (order) {
    return res.status(200).json(order);
  } else {
    return res.status(404).send(`Orden no existente`);
  }
};
export const getUserOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orders: Array<Iorder> = await Order.find({ user: userId });
  if (orders) {
    const ordersProducts = orders.map((el) => el.orderItems).flat();
    const itemsPrices = ordersProducts
      .map((p: any) => p.price * p.qty)
      .reduce((a, b) => a + b, 0);
    const itemsQuantity = ordersProducts
      .map((p: any) => p.qty)
      .reduce((a, b) => a + b, 0);
    const ordersFinal: any /*IOrderFInal*/ = orders
      .map((o: any) => o)
      .concat({ spent: itemsPrices, quantityItems: itemsQuantity });

    return res.status(200).json(ordersFinal);
  } else {
    return res
      .status(404)
      .json({ error: true, msg: `Usuario sin órdenes de compra` });
  }
};

export const getOrdersProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const orders = await Order.find({ product: productId });
  if (orders) {
    return res.status(200).json(orders);
  } else {
    return res.status(404).json({
      error: true,
      msg: `El producto no aparece en órdenes de compra`,
    });
  }
};

export const modifyOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    } else {
      return res.status(404).json({ error: true, msg: "Orden no encontrada" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
const hasDuplicates = (array: Array<any>) => {
  new Set(array).size < array.length;
  return array;
};

export const productsPurchased = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orders = await Order.find({ user: userId });
  if (orders) {
    const ordersProducts = orders.map((el) => el.orderItems).flat();

    const ordersFinal = hasDuplicates(ordersProducts);
    return res.status(200).json(ordersFinal);
  } else {
    return res.status(404).send(`Aún no hay reviews`);
  }
};
