import { Router } from "express";
// import loginRoutes from "./login/login.routes";
import userRoutes from "./userAdmin/userAdmin.routes";
import productsRoutes from "./product/product.routes";
import auth0 from "./loginAuth0/loginAuth0.routes";
import pasarelaRoutes from "./pasarela/pasarela.routes";
import customerRoutes from "./customer/customer.routes";
import plebRoutes from "./user/user.routes";
import reviewRoutes from "./review/review.routes";
import mercadoPagoRoutes from "./mercadoPago/mercadoPago.routes";
import orderRoutes from "./order/order.routes";


const router = Router();

// router.use(loginRoutes);
router.use(userRoutes);
router.use(productsRoutes);
router.use(pasarelaRoutes);
router.use(orderRoutes);
router.use(customerRoutes);
router.use(plebRoutes);
router.use(auth0);
router.use(reviewRoutes);
router.use(mercadoPagoRoutes);

export default router;
