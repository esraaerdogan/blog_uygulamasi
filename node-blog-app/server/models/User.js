const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        default:'00000'
    },
    email:{
        type:String,
        default:'aaa@ases.com'
    }
})
module.exports = mongoose.model('User',UserSchema)
