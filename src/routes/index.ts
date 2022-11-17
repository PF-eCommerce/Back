import { Router } from "express";
import loginRoutes from './login/login.routes'
import userRoutes from './userAdmin/user.routes'
import productsRoutes from './product/product.routes'
import auth0 from './loginAuth0/loginAuth0.routes'
const router = Router()

router.use(loginRoutes)
router.use(userRoutes)
router.use(productsRoutes)
router.use(auth0)
export default router