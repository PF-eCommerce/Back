import express from 'express'
import * as userFunction from '../../controllers/login.controller'
import {body} from 'express-validator'
const router = express.Router()


router.post('/register/user',  body('password').isLength({ min: 5 }), body('email').isEmail().normalizeEmail(),
 userFunction.postUser)


export default router