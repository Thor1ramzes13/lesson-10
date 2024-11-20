import { body, validationResult } from 'express-validator'
import fs from 'fs'

class UserValidator {
  static userValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('name').not().isEmpty().withMessage('Name is required'),
  ]
  static userSchema = {
    email: {
      isEmail: {
        errorMessage: 'Invalid email address',
      },
      normalizeEmail: true,
    },
    password: {
      isLength: {
        options: { min: 3 },
        errorMessage: 'Password must be at least 3 characters long',
      },
      trim: true, 
      escape: true, 
    },
  }
  static checkFile(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      if (req.file) {
        // Видаляємо завантажений файл, якщо поля не валідні
        fs.unlinkSync(req.file.path)
      }
    }
    next()
  }
}

export default UserValidator