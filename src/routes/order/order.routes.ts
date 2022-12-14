import express from "express";
import * as orderFunction from "../../controllers/order.controller";

const router = express.Router();

//Todas las órdenes
router.get("/orders", orderFunction.getAllOrders);
//Todas las órdenes de un usuario
router.get("/user/:userId/orders", orderFunction.getUserOrders);
//Productos de un usuario
router.get("/user/:userId/orders/purchased", orderFunction.productsPurchased);
//Todas las órdenes de un producto
router.get("/:productId/orders", orderFunction.getOrdersProduct);
//Traer una orden en particular
router.get("/order/:orderId", orderFunction.getOrder);
//Modificar una orden en particular
router.put("/order/:orderId", orderFunction.modifyOrder);

export default router;
