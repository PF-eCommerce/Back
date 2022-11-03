import { Router } from "express";
import userRoutes from './login/login.routes'

const router = Router()

router.use(userRoutes)


export default router