import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import UserDBService from '../models/user/UserDBService.mjs'

// Налаштування локальної стратегії
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      const user = await UserDBService.findOne({ email })
     
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password' })
      }
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  })
)

// Серіалізація користувача
passport.serializeUser((user, done) => {
  done(null, user._id)
})

// Десеріалізація користувача
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserDBService.findOne({ _id: id })
    done(null, user)
  } catch (error) {
    done(error)
  }
})

export default passport
