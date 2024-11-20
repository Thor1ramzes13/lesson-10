import Product from './Product.mjs'


class ProductDBService {
	static async getList(sortParams) {
		try {
			return await Product.find({}).sort(sortParams)
		} catch (error) {
			console.log('Error while getting list of products', error);
			return []
		}
	}
	static async create(data) {
		try {
			const product = new Product(data)
			return await product.save()
		} catch (error) {
			console.log('Error while creating product', error);
		}
	}
	static async update(id, data) {
		try {
			return await Product.findByIdAndUpdate(id, data, {
				new: true,
				runValidators: true
			})
		} catch (error) {
			console.log('Error while updating product', error);
		}
	}
	static async getById(id) {
		return await Product.findById(id)
	}
	static async deleteById(id) {
		return await Product.findByIdAndDelete(id)
	}
}
export default ProductDBService