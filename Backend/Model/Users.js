const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cookieId : {
        type : String,
        default : ""
    }   
})

module.exports = mongoose.model('users', userSchema)