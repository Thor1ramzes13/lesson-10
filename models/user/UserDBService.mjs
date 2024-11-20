import User from './User.mjs'

class UserDBService {
	static async getList(filters = {}, projection = null) {
		try {
			return await User.find(filters, projection)
		} catch (error) {
			throw new Error('Error while getting users list: ' + error.message)
		}
	}
	static async create(data) {
		try {
			const user = new User(data)
			return await user.save()
		} catch (error) {
			throw new Error('Error creating user: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			return await User.findByIdAndUpdate(id, data, {
				new: true,
				runValidators: true
			})
		} catch (error) {
			throw new Error('Error while updating user: ' + error.message)
		}
	}

	static async findOne(filters = {}, projection = null) {
		try {
			const user = await User.findOne(filters, projection)
			return user
		} catch (error) {
			throw new Error('Error finding user: ' + error.message)
		}
	}
	static async getById(id) {
		try {
			return await User.findById(id)
		} catch (error) {
			throw new Error('Error finding by id:' + error.message)
		}		
	}
	static async deleteById(id) {
		try {
			return await User.findByIdAndDelete(id)
		} catch (error) {
			throw new Error('Error deleting:' + error.message)
		}
	
	}
}



export default UserDBService