import { Router } from "express";
import loginRoutes from './login/login.routes'
import userRoutes from './userAdmin/user.routes'

const router = Router()

router.use(loginRoutes)
router.use(userRoutes)

export default router