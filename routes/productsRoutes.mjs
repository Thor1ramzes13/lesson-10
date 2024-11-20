import { Router } from 'express'
import { checkSchema } from 'express-validator'
import ProductController from '../controllers/productController.mjs'
import { ensureAdmin, ensureAuthenticated } from '../middleware/auth.mjs'
import ProductValidator from '../validators/productValidator.mjs'

const router = Router()

router.get('/',
	ensureAuthenticated,
  ensureAdmin,
	ProductController.productList
)

router.get('/addProduct/:id?',
	ensureAuthenticated,
  ensureAdmin,
	ProductController.productForm
)
router.post('/addProduct/:id?', 
	ensureAuthenticated,
  ensureAdmin,
	checkSchema(ProductValidator.productSchema), 
	ProductController.addProduct)

router.delete('/', 
	ensureAuthenticated,
  ensureAdmin,
	ProductController.deleteProduct
)

export default router