class ProductValidator {
	static productSchema = {
		name: {
			isLength: {
				options: { min: 3, max: 50 },
				errorMessage: 'Name must be between 3 and 50 characters',
				notEmpty: { errorMessage: 'Name is required' },
			},
			trim: true,
			escape: true,
		},
		price: {
			isNumeric: {
				errorMessage: 'Price must be a number',
			},
			notEmpty: { errorMessage: 'Price is required' },
			trim: true,
			escape: true,
		},
		quantity: {
			isNumeric: {
				errorMessage: 'Quantity must be a number',
			},
			notEmpty: { errorMessage: 'Quantity is required' },
			trim: true,
			escape: true,
		},
	}
}

export default ProductValidator
