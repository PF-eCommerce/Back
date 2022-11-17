import express from 'express'

import * as customerFunction from '../../controllers/customer.controller'
const router = express.Router()
router.get('/customers', customerFunction.getAllCustomer)
router.post('/customer', customerFunction.postCustomer)
router.put('/customer/:id', customerFunction.fuseWithUser)

export default router