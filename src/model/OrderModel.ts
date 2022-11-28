import mongoose from 'mongoose';
import {Iorder} from '../types'

const orderSchema = new mongoose.Schema<Iorder>({
    // userName : {
    //     type : String, 
    //     required : true,
    //     ref: "User",
    // },
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true,
        ref: "User",
    },
    orderItems:[
        {
            name: { type: String, required: true},
            qty: { type: Number, required: true},
            image: {type: String, required: true},
            price: { type:Number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required : true,
                ref: "Product",
            },
        },
    ],
    PaymentMethod:{
        type: String,
        default: 'MercadoPago'
    },
    exist: {
        type:Boolean,
        default: true
    },
    status : {
        type:String,
        default : 'Pending'
    },

    email_address : {
        type: String
    },
    shippingPrice:{
        type: Number,
        required : true,
        default: 0.0
    },
    //impuestos¿? --- comision¿?
    totalPrice:{
        type: Number,
        required : true,
        default: 0.0
    },
    isPaid: {
        type : Boolean,
        required: true,
        default: false
    },
    paidAt:{
        type: Date
    },
    isDelivered:{
        type : Boolean,
        required: true,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    },

    address : {
        street_name:{type:String},
        street_number:{type:Number},
        zip_code:{type:Number}
    },

    userPaymentInfo : {
        name: {type: String},
        lastName: {type: String},
        phone: {type: Number},
        address_user: {type: String},
        info: {type: String},
        email:{type: String}

    }

    
})
export const OrderModel = mongoose.model('OrderModel', orderSchema )

// module.exports = OrderModel