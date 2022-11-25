import mongoose from 'mongoose'
import {IProduct, Type} from '../types'
import paginate from 'mongoose-paginate-v2'



const ProductSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true, unique: true },
    genero: {type: String, required: true },
    desc: { type: String, required: true },
    img: { type: [String], required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    numStock: { type: Number},
    exists:{type: Boolean, default: true},
    type: { type: String,
      enum : Type 

    },
    size: { type: [String]},
    color: { type: [String] },
    rating : { type: Number, default: 0},
    numReview : { type: Number, default: 0},
    comment :  { type: String, required: false},
    reviews : { type: mongoose.Schema.Types.ObjectId,
    ref: "Review" }
  }
);

ProductSchema.plugin(paginate);
const Product = mongoose.model<IProduct,  mongoose.PaginateModel<IProduct>>("Product", ProductSchema)


export default Product