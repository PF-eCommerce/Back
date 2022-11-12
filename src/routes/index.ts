import { Router } from "express";
import loginRoutes from "./login/login.routes";
import userRoutes from "./userAdmin/user.routes";
import productsRoutes from "./product/product.routes";
const router = Router();

router.use(loginRoutes);
router.use(userRoutes);
router.use(productsRoutes);

export default router;
