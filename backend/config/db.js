const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log("DB Connected Successfully");
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDB