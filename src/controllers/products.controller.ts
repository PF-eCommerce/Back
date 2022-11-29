import Product from "../model/Product";
import { postIProduct, IProduct } from "../types";
import { Request, Response } from "express";

export const postProduct = async (req: Request, res: Response) => {
  const { title, desc, img, price, numStock, type, size, color }: postIProduct =
    req.body;

  try {
    const existsProduct = await Product.findOne({ title });
    if (existsProduct) {
      res.status(400).json({ error: true, msg: "el producto ya existeeeeeee" });
      return;
    }

    const product = new Product({
      title,
      desc,
      img,
      price,
      numStock,
      type,
      size,
      color,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const getBySearch = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  try {
    const options = {
      limit: 10,
      page: parseInt(req.query.page as string),
    };

    const search = req.query.search as string;
    const searchCase = search.length > 0 && search[0].toUpperCase() + search.substring(1);

    let allProducts = await Product.paginate(
      {
        $or: [
          { title: { $regex: search } },
          { type: { $regex: searchCase } },
          { desc: { $regex: search } },
        ],
      },
      options
    );

    return res.status(200).json(allProducts);
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  try {
    const options = {
      limit: 10,
      page: parseInt(req.query.page as string),
    };
    const type = req.query.type as string;

    const size = req.query.size as string;

    const color = req.query.color as string;

    /* 
        no tiene $regedex por lo que el match debe ser exacto 
        IMPORTANTE  el parametro que no se use debe ser recibido como null
        */

    const allProducts = await Product.paginate(
      { $or: [{ type }, { size }, { color }] },
      options
    );

    if (allProducts.length === 0)
      return res.status(204).json({ msg: "no existe ningun product" });

    return res.status(200).json(allProducts);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res
        .status(204)
        .json({ error: true, msg: "No existe el producto" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      product.exists = false;
      const update = await product.save();
      return res.status(200).json(update);
    } else {
      return res
        .status(204)
        .json({ error: true, msg: "No existe el producto" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (product) {
      return res.status(200).json(product);
    }
    return res
      .status(400)
      .json({ error: true, msg: "No se encontró el producto" });
  } catch (error) {
    console.log(error);
  }
};


export const getAllProducts = async (_req : Request , res : Response) => {
      try {
         const products : IProduct[] = await Product.find()
         if(!products) res.status(400).json({error : true , msg : 'no existe ningun producto'})

         const product = products.map(el => {
          return {
            id : el._id,
            title : el.title,
            price : el.price,
            img : el.img[0],
            inStock : el.inStock
          }
         })
        res.status(200).json(product)
 
      } catch (error) {
        console.log(error)
      }
}