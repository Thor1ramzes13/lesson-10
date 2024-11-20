import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		trim: true,
	},
	price: {
		type: Number,
		required: [true, 'Price is required'],
		toInt: true,
	},
	quantity: {
		type: Number,
		required: [true, 'Quantity is required'],
		toInt: true,
	},
})

const Product = mongoose.model('Product', productSchema)
export default Product
