import { Router } from 'express'
import authRoutes from './authRoutes.mjs'
import logoutRoutes from './logoutRoutes.mjs'
import mainRoutes from './mainRoutes.mjs'
import productsRoutes from './productsRoutes.mjs'
import registerRoutes from './registerRoutes.mjs'

const router = Router()

router.use('/', mainRoutes)
router.use('/login', authRoutes)
router.use('/products', productsRoutes)
router.use('/register', registerRoutes)
router.use('/logout', logoutRoutes)


export default router