const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
    method:{
        type:String,
    },
    id:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    username:{
        type:String,
    },
    oldValue:{
        type:Object,
    }
})

module.exports = mongoose.model('Log',LogSchema)