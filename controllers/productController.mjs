import { validationResult } from 'express-validator'
import ProductDBService from '../models/product/ProductDbService.mjs'

class ProductController {
	static async productList(req, res) {
		try {
			const sortParams = req.session.sortParam
			const products = await ProductDBService.getList(sortParams)
			req.session.sortParam = null
			res.render('productList', { products })
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
	static async productForm(req, res) {
		try {
			const id = req.params.id
			const product = id ? await ProductDBService.getById(id) : null
			res.render('productForm', {
				errors: [],
				product,
			})
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
	static async addProduct(req, res) {
		const errors = validationResult(req)
		const product = req.body
		if (!errors.isEmpty()) {
			if (req.params.id) product.id = req.params.id
			return res.render('productForm', { errors: errors.array(), product })
		}
		try {
			const { name, price, quantity } = req.body
			if (req.params.id) {
				await ProductDBService.update(req.params.id, { name, price, quantity })
			} else await ProductDBService.create({ name, price, quantity })
			req.session.sortParam = {price: -1}
			res.redirect('/products')
		} catch (error) {
			res
				.status(500)
				.render('productForm', { errors: [{ msg: error.message }], product })
		}
	}
	static async deleteProduct(req, res) {
		try {
			await ProductDBService.deleteById(req.body.id)
			res.json({success: true})
		} catch (error) {
			res.status(500).json({ success: false, message: 'Error while deleting product' })
		}
	}
}
export default ProductController
