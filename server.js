const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const cors = require('cors')
const telegramBot = require('./utils/telegramBot')
const connectMongoDB = require('./config/connectDB')

dotenv.config()
const app = express()

app.use(cors())

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Database Connect
connectMongoDB()

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Telegram Bot Connect
telegramBot()

// Routers
app.use('/api/trevel/admin', require('./routes/admin.route'))
app.use('/api/trevel/sity',  require('./routes/sity.route'))
app.use('/api/trevel/paket', require('./routes/paket.route'))
app.use('/api/trevel/order', require('./routes/buyurtma.route'))


const PORT = process.env.PORT
app.listen( PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
} )