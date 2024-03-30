const mongoose = require('mongoose')


const connectMongoDB = async ()=>{
    const connect = await mongoose.connect(process.env.MONGOBD_URI)
    console.log(`Database connect: ${connect.connection.host}`.blue)
}

module.exports = connectMongoDB