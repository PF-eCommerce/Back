import mongoose from 'mongoose'
import {IProduct} from '../types'

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: [String], required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    numStock: { type: Number},
    exists:{type: Boolean, default: true}
  }
);
const Product = mongoose.model("Product", ProductSchema);

export default Product