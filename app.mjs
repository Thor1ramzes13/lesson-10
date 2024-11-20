import express from 'express'
import connectDB from './db/connectDB.mjs'
import errorHandler from './middleware/errorHandler.mjs'
import middleware from './middleware/index.mjs'
import routes from './routes/index.mjs'

const app = express()

// DB connect
connectDB()
// middleware
middleware(app)
// routes connect
app.use('/', routes)
// error handler
errorHandler(app)


export default app
