import { Router } from 'express'
import AuthController from '../controllers/authController.mjs'
const router = Router()

router.get('/', AuthController.logout)
export default router
