import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is not allowed'],
    minlength: [3, 'Email must be at least 3 characters long'],
    maxlength: [50, 'Email must be at most 50 characters long'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    // minlength: [6, 'Password must be at least 6 characters long'],
    // maxlength: [8, 'Password must be at most 8 characters long'],
    // validate: {
    //   validator: function (v) {
    //     return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    //       v
    //     )
    //   },
    //   message: (props) =>
    //     'Password must contain at least one letter, one number, and one special character',
    // },
  },
  type: {
    type: String
  },
})

// Хешування паролю перед збереженням
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})


const User = mongoose.model('User', userSchema)
export default User