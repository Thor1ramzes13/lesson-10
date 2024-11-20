
import passport from 'passport'

class AuthController {
  static login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err)
      if (!user) return res.status(400).json({ message: info.message })
      req.logIn(user, (err) => {
        if (err) return next(err)
          return res.redirect('/')
        // return res.json(user)
      })
    })(req, res, next)
  }

  static logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err)
      }
      req.session.destroy((err) => { 
        if (err) {
          return res.status(500).json({ message: 'Failed to destroy session' });
        }
      })
      res.clearCookie('connect.sid')
      res.redirect('/login')
    })
  }
}

export default AuthController