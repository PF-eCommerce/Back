import mongoose from "mongoose";
import { IAuth0Model } from "../types";

const UserAuth0Schema = new mongoose.Schema<IAuth0Model>({
  email: {
    type: String,
  },
  email_verified: {
    type: Boolean,
  },
  name: {
    type: String,
  },

  nickname: {
    type: String,
  },

  picture: {
    type: String,
  },

  sub: {
    type: String,
  },
  updated_at: {
    type: String,
  },
 
  admin: {
    type: [String],
    required: true,
    default : ['user']
  },
});

const UserAuth0 = mongoose.model<IAuth0Model>("UserAuth0", UserAuth0Schema);

export default UserAuth0;
