import mongoose from 'mongoose'
import {IProduct, Type } from '../types'
import paginate from 'mongoose-paginate-v2'



const ProductSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: [String], required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    numStock: { type: Number},
    exists:{type: Boolean, default: true},
    type: { type: String, enum : Type },
    men : { type:Boolean, default: false },
    woman : { type:Boolean, default: false },
    isShoes : { type:Boolean, default: false },
    size: { 
      extraSmall : Number, 
      small : Number,
      medium : Number,
      large : Number,
      extraLarge : Number,
      num36 : Number,
      num37 : Number,
      num38 : Number,
      num39 : Number,
      num40 : Number,
      num41 : Number,
      num42 : Number,
      num43 : Number, default : 0
    },
    color: { type: [String] },
    rating : { type: Number, default: 0},
    numReview : { type: Number, default: 0},
    comment :  { type: String, required: false},
    reviews : { type: mongoose.Schema.Types.ObjectId,
    ref: "Review" },
    dateIn : {type: Date , required : false},
    date: {type: Date, default: new Date()}
  }
);

ProductSchema.plugin(paginate);
const Product = mongoose.model<IProduct,  mongoose.PaginateModel<IProduct>>("Product", ProductSchema)


export default Product