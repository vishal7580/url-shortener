import express from 'express'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import urlRoute from '../BACKEND/src/routes/url.route.js'
import authRoute from '../BACKEND/src/routes/auth.route.js'
import connectDB from '../BACKEND/src/config/db.config.js'
import { errorHandler } from './src/middleware/errorHandler.js'

const app = express()
configDotenv()
const port = process.env.PORT || 4000
const origin = process.env.ALLOWED_ORIGIN
//middleware
app.use(cors({origin , credentials: true}  ))
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))


//routes
app.use('/api/v1/',urlRoute)
app.use('/api/v1/auth',authRoute)

//error handler
app.use(errorHandler)

app.listen(port, ()=> {
    connectDB()
    console.log('server listening',port)
})
