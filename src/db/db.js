const mongoose = require('mongoose')

async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("The server is connected successfully!!")
    }catch(err){

        console.log("The error is :",err)

    }

}
module.exports = connectDB