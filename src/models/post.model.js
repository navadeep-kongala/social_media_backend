const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    image:String,
    caption:String,
    discription:String
})

const PostModel = mongoose.model('PostSchema',PostSchema)

module.exports = PostModel