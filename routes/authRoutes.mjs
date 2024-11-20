import { Router } from 'express'
import AuthController from '../controllers/authController.mjs'
const router = Router()

router.get('/', (req, res) => {
	res.render('login')
})

router.post('/', AuthController.login)
export default router
