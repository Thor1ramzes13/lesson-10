import { Router } from 'express'

import { checkSchema } from 'express-validator'
import ProductController from '../controllers/productController.mjs'
import ProductValidator from '../validators/productValidator.mjs'

const router = Router()

router.get('/', ProductController.productList)

router.get('/addProduct/:id?', ProductController.productForm)
router.post('/addProduct/:id?', checkSchema(ProductValidator.productSchema), ProductController.addProduct)

router.delete('/', ProductController.deleteProduct)

export default router