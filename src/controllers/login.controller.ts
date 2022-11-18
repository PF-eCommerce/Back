import User from "../model/User";
import { Request, Response } from "express";
import { registerUser, IchangePassword, authLogin } from "../types";
import { validationResult } from "express-validator";
import { generateJWT } from "../Helper/generateJWT";
import { generateId } from "../Helper/generateIdToken";
import bcrypt from "bcrypt";
import _ from "mongoose-paginate-v2";
import {
  emailRegister,
  forgotPasswordSendEmail,
} from "../Helper/mailer/msjMailer";

export const postUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  const { userName, email, password }: registerUser = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

<<<<<<< HEAD
  const userExists = User.findOne({ email });
  const nameExists = User.findOne({ userName });

  const userPromiseAll = await Promise.all([userExists, nameExists]);
  const [userExistsPromise, nameExistsPromise] = userPromiseAll;
  if (userExistsPromise || nameExistsPromise) {
    return res.status(400).json({ error: true, msg: "usuario ya registrado" });
  }

  try {
    const encriptPassword = await bcrypt.hash(password, 10);
    const user = new User({ userName, email, password: encriptPassword });
    await user.save();

    emailRegister({ userName, email, token: user.token });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const perfil = async (req: Request, res: Response) => {
  try {
    const userData = await User.findById(req.app.locals.id);

    if (userData == null) {
      res.status(400).json({ msg: "dato del usuario no existen" });
      return;
    }

    const user = {
      _id: userData._id,
      userName: userData.userName,
      email: userData.email,
      admin: userData.admin,
      confirmed: userData.confirmed,
    };
    res.status(200).json(user);
  } catch (error) {}
};
export const confirmUser = async (req: Request, res: Response) => {
=======
   const userExists = User.findOne({ email })
   const nameExists =  User.findOne({userName})
    
    const userPromiseAll = await Promise.all([userExists, nameExists])
    const [userExistsPromise, nameExistsPromise] = userPromiseAll
   if(userExistsPromise ||nameExistsPromise) {
      
       return res.status(400).json({ error: true, msg: "usuario ya registrado" });
   } 

   try {
     const encriptPassword = await bcrypt.hash(password, 10)
     const user = new User({ userName, email, password: encriptPassword});
     await user.save();
      
     emailRegister({userName, email, token : user.token})
     res.status(201).json(user);
   } catch (error) {
       console.log(error)
   }


}


export const confirmUser = async (req : Request, res : Response) => {
>>>>>>> f7e2cde12e2613cebee090db71300066b31353f0
  const { token } = req.params;

  try {
    const confirmedUser = await User.findOne({ token });
    if (!confirmedUser) {
      res.status(400).json({ msg: "token no valido" });
      return;
    } else {
      confirmedUser.token = "";
      confirmedUser.confirmed = true;
      await confirmedUser.save();

      res.json({ msg: "usuario registrado correctamente" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const authenticate = async (req: Request, res: Response) => {
  const { email, password }: authLogin = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).send({ msg: "¡Usuario no existe!" });
      return;
    }

    if (user.confirmed === false) {
      res.status(401).send({ msg: "¡Usuario no confirmado!" });
      return;
    } else {
      const passwordValidate = await bcrypt.compare(password, user.password);

      if (!passwordValidate)
        res.status(401).json({ msg: "¡Password inválido!" });
      else {
        res.status(200).json({
          token: generateJWT(user._id),
          error: false,
          msg: "Usuario habilitado para loguearse",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { inputPass, updatedPassword }: IchangePassword = req.body;
  const user = await User.findOne({ id });
  if (!user) {
    res.status(403).json({ error: true, msg: "El usuario no existe" });
    return;
  }
  try {
    const passwordValidate = await bcrypt.compare(inputPass, user.password);

    if (passwordValidate) {
      const encriptPassword = await bcrypt.hash(updatedPassword, 10);
      user.password = encriptPassword;
      user.save();
      res.status(200).json({ msg: "Contraseña actualizada" });
      return;
    } else {
      res.status(500).json({ error: true, msg: "Contraseña incorrecta" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(401).json({ error: true, msg: "el email no existe" });
      return;
    }

    userExists.token = generateId();

    await userExists.save();

    forgotPasswordSendEmail({ email, token: userExists.token });
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

export const checkToken = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    const validateToken = await User.findOne({ token });
    if (validateToken) {
      res.json({ error: false, msg: "Token aprobado" });
      return;
    } else {
      res.status(400).json({ error: true, msg: "Token inválido" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export const newPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ token });
    if (!user) {
      res.json({ error: true, msg: "Hubo un error con el usuario" });
      return;
    }

    const encriptPassword = await bcrypt.hash(password, 10);
    user.token = "";
    user.password = encriptPassword;
    await user.save();

    res.json({ error: false, msg: "Password modificado con éxito" });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Error al guardar" });
  }
};
