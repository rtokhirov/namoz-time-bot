const { Schema } = require("mongoose");

const timesSchema= new Schema({
    times:{
        type:Array,
        required:true
    }
},{timestamps:true})
// text_times:Array,
    // times:Array,
    // date:String,