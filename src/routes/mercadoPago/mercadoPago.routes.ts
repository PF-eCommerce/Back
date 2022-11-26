import express from 'express'
import * as mercadopago from "../../controllers/mercadopago.controller"

const router = express.Router()

router.post('/post-order/:id', mercadopago.postOrder)
router.post('/notification', mercadopago.notification)


export default router