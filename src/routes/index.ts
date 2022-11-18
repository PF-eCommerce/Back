import { Router } from "express";
import loginRoutes from './login/login.routes'
import userRoutes from './userAdmin/user.routes'
import productsRoutes from './product/product.routes'
import reviewRoutes from './review/review.routes'
const router = Router()

router.use(loginRoutes)
router.use(userRoutes)
router.use(productsRoutes)
router.use(reviewRoutes)

export default router