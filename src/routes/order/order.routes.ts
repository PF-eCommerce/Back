import express from "express";
import * as orderFunction from "../../controllers/order.controller";

const router = express.Router();

//Todas las órdenes
router.get("/orders", orderFunction.getAllOrders);
//Todas las órdenes de un usuario
router.get("/:userId/orders", orderFunction.getUserOrders);
//Todas las órdenes de un producto
router.get("/:productId/orders", orderFunction.getOrdersProduct);
//Traer una orden en particular
router.get("/order/:orderId", orderFunction.getOrder);
//Modificar una orden en particular
router.put("/order/:orderId", orderFunction.modifyOrder);

export default router;
