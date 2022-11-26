import express from 'express'

import * as userFunction from '../../controllers/user.controller'

const router = express.Router()

// router.delete("/user/:id", userFunction.deleteAccount);
router.get('/account/:id/profile' , userFunction.profile)
router.put('/account/:id/profile' ,  userFunction.updateInfo)

export default router