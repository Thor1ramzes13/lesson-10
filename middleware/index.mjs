import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import loggerConfig from '../config/logger.mjs'


import flash from 'connect-flash'
import passport from '../config/passport.mjs'
import sessionConfig from '../config/session.mjs'



const __filename = fileURLToPath(import.meta.url)
// get the resolved path to the file
const __dirname = path.dirname(__filename)
// get the name of the directory


const middleware = (app) => {
	app.set('views', path.join(__dirname, '../views'))
	app.set('view engine', 'ejs')

	app.use(loggerConfig)
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(cookieParser())

	app.use(express.static(path.join(__dirname, '../public')))
	app.use(express.static(path.join(__dirname, '../uploads')))

	app.use(sessionConfig)
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(flash())
}

export default middleware