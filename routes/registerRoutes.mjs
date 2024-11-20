import { Router } from 'express'
import { checkSchema } from 'express-validator'
import AuthController from '../controllers/authController.mjs'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../validators/userValidator.mjs'

const router = Router()

router.get('/',  UserController.registerForm)

router.post(
  '/',
  checkSchema(UserValidator.userSchema),
  UserController.registerUser,
  AuthController.login
)


export default router
