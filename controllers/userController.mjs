import { validationResult } from 'express-validator'
import UserDBService from '../models/user/UserDBService.mjs'

class UserController {
	static async usersList(req, res) {
		try {
			const users = await UserDBService.getList({}, {password: 0})
			res.render('userList', { users, user: req.user })
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
	static async registerForm(req, res) {
		try {
			const id = req.params.id
			const userData = id ? await UserDBService.getById(id) : null
			res.render('register', {
				errors: [],
				userData,
				user: req.user
			})
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
	static async registerUser(req, res, next) {
		const errors = validationResult(req)
		const userData = req.body

		if (!errors.isEmpty()) {
			if (req.params.id) userData.id = req.params.id
			return res.status(400).render('register', { errors: errors.array(), userData, user: req.user })
		}
		try {
			const userObj = req.body
			userObj.type = 'user'
			if (req.params.id) {
				await UserDBService.update(req.params.id, userObj)
			} else await UserDBService.create(userObj)
			return next()
		} catch (error) {
			res.status(500).render('register', { errors: [{ msg: error.message }], userData, user: req.user })
		}
	}
	static async deleteUser(req, res) {
		try {
			await UserDBService.deleteById(req.body.id)
			res.json({success: true})
		} catch (error) {
			res.status(500).json({ success: false, message: 'Error while deleting user' })
		}
	}
}
export default UserController
