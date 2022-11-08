import jwt from 'jsonwebtoken' 
import { Types } from 'mongoose';
export const generateJWT = (id : Types.ObjectId) =>
  jwt.sign(
    {
      id,
    },
    `${process.env.JWT_SEC}`,
    { expiresIn: "3d" }
  );