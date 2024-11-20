import { Router } from 'express'
import { checkSchema } from 'express-validator'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../validators/userValidator.mjs'


const router = Router()

router.get('/', (req, res) => {
	res.render('register')
})

router.post(
  '/',
  checkSchema(UserValidator.userSchema),
  UserController.registerUser
)


export default router
