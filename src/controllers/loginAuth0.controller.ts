import { Request, Response } from "express";
import axios from "axios";
import { IAuth0User } from "../types";
import UserAuth0 from "../model/UserAuth0";

// export const registerUser = async (req : Request , res : Response) => {
//         const {email,email_verified,
//              name,nickname,picture,sub,updated_at} : IAuth0User = req.body
//     try {
//         const newUser = await UserAuth0.find({sub})

//         if(!newUser) {
//             const user = new UserAuth0({email,email_verified,
//                 name,nickname,picture,sub,updated_at})

//                 res.status(201).json(user)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

export const getUser = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const userInfo = await axios.get(
      "https://dev-2jwsrt5msmn8rjm0.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const {
      email,
      email_verified,
      name,
      nickname,
      picture,
      sub,
      updated_at,
    }: IAuth0User = userInfo.data;
    const newUser = await UserAuth0.find({ sub });
    console.log(newUser);
    if (newUser.length === 0) {
      const user = new UserAuth0({
        email,
        email_verified,
        name,
        nickname,
        picture,
        sub,
        updated_at,
      });
      await user.save();

      res.status(200).json(user);
    }
       
    if(email_verified) {
      newUser[0].email_verified = true
      await newUser[0].save()
    }
    res.status(200).json(...newUser);
  } catch (error) {
    console.log(error)
  }
};
