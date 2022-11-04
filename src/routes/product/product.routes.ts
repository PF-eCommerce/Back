import express from 'express'
import * as productFunction from '../../controllers/products.controller'



const router = express.Router()

router.post('/product', productFunction.postProduct)

export default router