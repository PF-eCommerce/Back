import express from 'express'
import * as userFunction from '../../controllers/user.controller'

const router = express.Router()

router.get('/user/all', userFunction.getAllUser)
router.get('/user/:id', userFunction.getUser)
router.put('/user/:id', userFunction.updateInfoAsAdmin)
router.get('/perfil/:id' , userFunction.perfil)
// router.delete("/user/:id", userFunction.deleteAccount);
export default router