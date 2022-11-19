import { Router } from "express";
import { postOrder, notification } from "../../controllers/mercadopago.controller";

const router = Router()

router.post('/post-order/:id', postOrder)
router.post('/notification', notification)


export default router