import User from './User.mjs'

class UserDBService {
	static async getList(filters = {}, projection = null) {
		try {
			return await User.find(filters, projection)
		} catch (error) {
			console.log('Error while getting users list', error);
			return []
		}
	}
	static async create(data) {
		try {
			const user = new User(data)
			return await user.save()
		} catch (error) {
			console.log('Error while creating user', error);
		}
	}

	static async update(id, data) {
		try {
			return await User.findByIdAndUpdate(id, data, {
				new: true,
				runValidators: true
			})
		} catch (error) {
			console.log('Error while updating user', error);
		}
	}

	static async findOne(filters = {}, projection = null) {
		try {
			const user = await User.findOne(filters, projection)
			return user
		} catch (error) {
			throw new Error('Error finding user:', error.message)
		}
	}
	static async getById(id) {
		try {
			return await User.findById(id)
		} catch (error) {
			throw new Error('Error finding by id:', error.message)
		}		
	}
	static async deleteById(id) {
		try {
			return await User.findByIdAndDelete(id)
		} catch (error) {
			throw new Error('Error deleting:', error.message)
		}
	
	}
}



export default UserDBService