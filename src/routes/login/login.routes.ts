import express from 'express'
import * as userFunction from '../../controllers/login.controller'

const router = express.Router()


router.post('/register/user', userFunction.postUser)


export default router