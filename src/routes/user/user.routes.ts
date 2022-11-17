import express from 'express'

import * as userFunction from '../../controllers/user.controller'

import { verifyToken } from '../../middleware/verifyToken'
const router = express.Router()

// router.delete("/user/:id", userFunction.deleteAccount);
router.get('/account/profile' , verifyToken , userFunction.profile)
router.put('/account/profile' , verifyToken , userFunction.updateInfo)

export default router