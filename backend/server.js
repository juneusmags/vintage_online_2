import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'
import colors from 'colors'

import {notFound, errorHandler} from './middleware/errorMiddleware.js'


import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import path from 'path'
import uploadRoutes from './routes/uploadRoutes.js'

import morgan from 'morgan'

const app = express()

app.use(express.json())

if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'))
}

// app.use((req, res, next) =>{
//     console.log(req.originalURL)
//     next()
// })







dotenv.config()

connectDB()


app.get('/', (req, res) =>{
    res.send('API is running...')
})


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.use(notFound)


app.use(errorHandler)

const PORT = process.env.PORT  || 5000
app.listen(PORT, console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.yellow.bold))



