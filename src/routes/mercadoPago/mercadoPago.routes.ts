import { Router } from "express";
import * as mercadopago from "../../controllers/mercadopago.controller";

const router = Router()

router.post('/post-order/:id', mercadopago.postOrder)
router.post('/notification', mercadopago.notification)


export default router