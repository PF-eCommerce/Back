import express from 'express'
import * as pasarela from '../../controllers/pasarela.controller'

const router = express.Router()

router.post("/create-order-paypal", pasarela.createOrderPaypal);
router.get("/capture-order-paypal", pasarela.captureOrderPaypal);
router.get("/cancel-order-paypal", pasarela.cancelOrderPaypal);
router.post("/create-order-stripe", pasarela.createSessionStripe);
router.get("/capture-order-stripe/:id", pasarela.captureOrderStripe);
router.get("/cancel-order-stripe/:id", pasarela.cancelOrderStripe);


export default router