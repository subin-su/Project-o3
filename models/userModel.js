const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
email:{
type:String,
required:true,
unique:true,
match: [/.+@.+\..+/,'enter a valid Email']
},
password:{
    type:String,
    required:true,
    minLength:8,
},
firstName:{
    type:String,
    required:true,
    default: "",
},
lastName:{
    type:String,
    required:true,
    default: "",
}


})

module.exports = User =mongoose.model('user',userSchema)