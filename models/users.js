const { Schema, mongoose } = require("mongoose");

const UserChema= new Schema({
    first_name:{
        type:String,
        required:true
    },
    user_id:{
        type:Number,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true
    },
    region:{
        type:Object,
        required:true
    },
    notification:{
        type:Boolean,
        default:true,
        required:true
    }
},{timestamps:true})

const User= new mongoose.model("User",UserChema);
module.exports = User;