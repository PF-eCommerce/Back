import mongoose, { Schema } from 'mongoose'
import {ICustomer} from '../types'
  
const CustomerSchema = new mongoose.Schema<ICustomer>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User", required: false
    },
    name:{
        type: String,
        required: true,
    },
    lastName:{
      type: String,
      required: true  
    },
    country:{
        type: String,
        required: true  
      },
      city:{
        type: String,
        required: true  
      },
     spent:{
        type: Number,
        required:false  
      },
      sizes:{ type: [String], required: false }
  });
  
  const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);

  export default Customer