import mongoose from 'mongoose'
import {IUser} from '../types'
import { generateId } from '../Helper/generateIdToken';
  
const UserSchema = new mongoose.Schema<IUser>({
    image: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
      Unique: true,
    },
    email: {
      type: String,
      Unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    token: {
      type: String ,
      default : generateId()
    },
  
    confirmed: {
      type: Boolean,
      default: false,
    },
  });
  
  const User = mongoose.model<IUser>("User", UserSchema);

  export default User