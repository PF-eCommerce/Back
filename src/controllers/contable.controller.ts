import { Request, Response } from "express";
import { IContable, Iorder, IProduct } from "../types";
import Contable from "../model/Contable";
import { OrderModel } from "../model/OrderModel";
import Product from "../model/Product";

export const postInversión = async (req: Request, res: Response) => {
  const { inversionTotal }: IContable = req.body;
  try {
    let inversiónPasada = await Contable.find();
    if (inversiónPasada.length) {
      const inversionActual =
        inversionTotal + inversiónPasada[0].inversionTotal;
      inversiónPasada[0].inversionTotal = inversionActual;
      if (inversionActual) {
        await inversiónPasada[0].save();
        res.status(202).json(inversiónPasada);
      }
    } else {
      const inversión = new Contable({
        inversionTotal,
      });
      inversión.save();
      res.status(201).json(inversión);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getInversión = async (_req: Request, res: Response) => {
  try {
    const inversión = await Contable.find();
    if (inversión.length) {
      res.status(200).json(inversión);
    }
    res.status(404).send({ error: true, msg: "No hay inversión(?)" });
  } catch (error) {
    console.log(error);
  }
};
export const getTotalInvertido = async (_req: Request, res: Response) => {
  try {
    const inversión = await Contable.find();
    if (inversión.length) {
      res.status(200).json(inversión[0].inversionTotal);
    }
    res.status(404).send({ error: true, msg: "No hay inversión(?)" });
  } catch (error) {
    console.log(error);
  }
};
export const getPresupuestoTotal = async (_req: Request, res: Response) => {
  try {
    const contable = await Contable.find();
    const products: IProduct[] = await Product.find();
    if (products.length) {
      const invertido = products
        .map((p) => p.price * p.numStock)
        .reduce((a, b) => a + b, 0);
      const presupuesto = invertido * 0.75;

      contable[0].presupuestoTotal = presupuesto;
      await contable[0].save();
      res.status(200).json(presupuesto);
    }
    res.status(404).send({ error: true, msg: "No hay inversión(?)" });
  } catch (error) {
    console.log(error);
  }
};

export const getPresupuestoAnual = async (_req: Request, res: Response) => {
  const hoy = new Date().toISOString().slice(0, 10);
  const año = hoy.slice(0, 4);
  try {
    const contable = await Contable.find();
    const allProducts: IProduct[] = await Product.find();
    const products = allProducts.filter(
      (o) => o.date.toISOString().slice(0, 4) === año
    );
    if (products.length) {
      const invertido = products
        .map((p: any) => p.price * p.numStock)
        .reduce((a, b) => a + b, 0);
      const presupuesto = invertido * 0.75;
      contable[0].presupuestoAnual = presupuesto;
      await contable[0].save();
      res.status(200).json(presupuesto);
    }
    res.status(404).send({ error: true, msg: "No hay inversión(?)" });
  } catch (error) {
    console.log(error);
  }
};

export const getPresupuestoMensual = async (_req: Request, res: Response) => {
  const hoy = new Date().toISOString().slice(0, 10);
  const mes = hoy.slice(0, 7);
  try {
    const contable = await Contable.find();
    const allProducts: IProduct[] = await Product.find();
    const products = allProducts.filter(
      (o) => o.date.toISOString().slice(0, 7) === mes
    );
    if (products.length) {
      const invertido = products
        .map((p: any) => p.price * p.numStock)
        .reduce((a, b) => a + b, 0);
      const presupuesto = invertido * 0.75;
      contable[0].presupuestoMensual = presupuesto;
      await contable[0].save();
      res.status(200).json(presupuesto);
    }
    res.status(404).send({ error: true, msg: "No hay inversión(?)" });
  } catch (error) {
    console.log(error);
  }
};

export const getGanancias = async (_req: Request, res: Response) => {
  try {
    let inversiónPasada = await Contable.find();
    const orders: Array<Iorder> = await OrderModel.find({ status: "approved" });
    if (orders.length) {
      const ordersFinal = orders
        .map((p) => p.totalPrice)
        .reduce((a, b) => a + b, 0);
      inversiónPasada[0].gananciaTotal =
        ordersFinal - inversiónPasada[0].presupuestoTotal;
      await inversiónPasada[0].save();
      res.status(200).json(inversiónPasada[0].gananciaTotal);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getGananciaMensual = async (_req: Request, res: Response) => {
  const hoy = new Date().toISOString().slice(0, 10);
  const mes = hoy.slice(0, 7);
  try {
    let inversiónPasada: any = await Contable.find();
    const allOrders: Array<Iorder> = await OrderModel.find({
      status: "approved",
    });
    const orders = allOrders.filter(
      (o) => o.date.toISOString().slice(0, 7) === mes
    );
    if (orders.length) {
      const ordersFinal = orders
        .map((p) => p.totalPrice)
        .reduce((a, b) => a + b, 0);
      if (ordersFinal && ordersFinal !== 0) {
        inversiónPasada[0].gananciaMensual =
          ordersFinal - inversiónPasada[0].presupuestoMensual;
        await inversiónPasada[0].save();
        res.status(200).json(inversiónPasada[0].gananciaMensual);
      }
      res.status(300).send("Esos totalPrice estaban rancios");
    }
    res.status(404).send("WTF");
  } catch (error) {
    console.log(error);
  }
};
export const getGananciaAnual = async (_req: Request, res: Response) => {
  const hoy = new Date().toISOString().slice(0, 10);
  const año = hoy.slice(0, 4);
  try {
    let inversiónPasada: any = await Contable.find();
    const allOrders: Array<Iorder> = await OrderModel.find({
      status: "approved",
    });
    const orders = allOrders.filter(
      (o) => o.date.toISOString().slice(0, 4) === año
    );
    console.log(orders);
    if (orders.length) {
      const ordersFinal = orders
        .map((p) => p.totalPrice)
        .reduce((a, b) => a + b, 0);
      if (ordersFinal && ordersFinal !== 0) {
        inversiónPasada[0].gananciaAnual =
          ordersFinal - inversiónPasada[0].presupuestoAnual;
        await inversiónPasada[0].save();
        res.status(200).json(inversiónPasada[0].gananciaAnual);
      }
      res.status(300).send("Esos totalPrice anuales estaban rancios");
    }
    res.status(404).send("WTF anual");
  } catch (error) {
    console.log(error);
  }
};
