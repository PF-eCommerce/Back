import User from '../model/User'
import UserAuth0 from '../model/UserAuth0'
import {Request, Response} from 'express'
import Customer from '../model/Customer'

export const getAllUser = async (_req: Request, res: Response) => {
  try {
    const allUsers = await UserAuth0.find();

         res.status(200).json(allUsers)
       } catch (error) {
         console.log(error)
       }
}
export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)

    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}
// export const deleteAccount = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void> => {
//   try {
//       const id = req.params.id
//       const user = await User.findById(id);
//       if (user){
//           user.exists = false;
//          const update = await user.save()
//           return res.status(200).json(update)
//       }else{
//           return res.status(204).json({error:true, msg: "No existe el usuario"})
//       }
//   } catch (error) {
//       console.log(error)
//   }
// }
export const updateInfo = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void> =>   {
  const _id = req.params.id
  const {admin, spent, confirmed, id} = req.body
  try {
    if(admin || spent || confirmed || id){
      return res.status(403).json({error:true, msg:"Ah, sos re trol.jpg"})
    }else{
      const userData = await User.findByIdAndUpdate(_id,{$set: req.body}, {new: true})
        if(userData){
         return res.status(200).json(userData)
        }
       return res.status(400).json({error: true, msg: "No se encontró al cliente/usuario"})
    }
  } catch (error) {
     console.log(error)
  }
}

export const updateInfoAsAdmin = async (req : Request , res: Response) : Promise< Response<any, Record<string, any>> | void> =>   {
  const _id = req.params.id
  const {id} = req.body
  try {
    if(id){
      return res.status(403).json({error:true, msg:"Ah, sos re trol.jpg"})
    }else{
      const userData = await User.findByIdAndUpdate(_id,{$set: req.body}, {new: true})
        if(userData){
         return res.status(200).json(userData)
        }
       return res.status(400).json({error: true, msg: "No se encontró al cliente/usuario"})
    }
  } catch (error) {
     console.log(error)
  }
}



export const profile = async (req : Request, res: Response) : Promise< Response<any, Record<string, any>> | void> => {
  try {
  
   const userData = await UserAuth0.findById(req.app.locals.id)
   
   
   if(userData == null) {
     res.status(400).json({msg : 'No existen datos del usuario'})
     return
   }else{
     const personData = await Customer.findOne({userId:userData.id})

     if(personData && userData){
       const fullUser = {
       _id: userData.id,
       image: userData.picture,
       userName : userData.nickname,
       name: personData.name + " " + personData.lastName,
       country: personData.country,
       city: personData.city,
       email: userData.email,
       sizes: personData.sizes};

       return res.status(200).json(fullUser)
     }
     if(!personData){
       const user = {
         _id: userData.id,
         image: userData.picture,
         userName : userData.nickname,
         email: userData.email,
       };
       return res.status(200).json(user)
     }
   }
  } catch (error) {
   console.log(error)
  }
}
export const perfil = async (req : Request, res: Response) : Promise< Response<any, Record<string, any>> | void> => {
  try {
  
   const userData = await User.findById(req.params.id)
   
   
   if(userData == null) {
     res.status(400).json({msg : 'No existen datos del usuario'})
     return
   }else{
     const personData = await Customer.findOne({userId:userData.id})
     if(personData && userData){
       const fullUser = {
       _id: userData.id,
       userName : userData.userName,
       image: userData.image,
       name: personData.name + " " + personData.lastName,
       country: personData.country,
       city: personData.city,
       email: userData.email,
       admin: userData.admin,
       spent: personData.spent,
       sizes: personData.sizes,
       confirmed: userData.confirmed};

       return res.status(200).json(fullUser)
     }
     if(!personData){
       const user = {
      _id: userData.id,
      image: userData.image,
      userName : userData.userName,
      email: userData.email,
      admin: userData.admin,
      confirmed: userData.confirmed
       };
       return res.status(200).json(user)
     }
   }
  } catch (error) {
   console.log(error)
  }
}

export const setAdmin = async (req: Request, res: Response):Promise<any> => {

  const userData = await UserAuth0.findById(req.params.id);
  if(userData === null){
    res.status(400).json({msg:"No se encontro el usuario"});
  }else{
    console.log(userData.admin)
    const isAdmin:boolean = userData.admin.includes("admin");
    const update = await UserAuth0.updateOne({_id:userData._id},
      {
        $set:{
          admin: isAdmin ? ["false"] : ["admin"]
        }
      }
      )
  res.json(update)
  }
}
