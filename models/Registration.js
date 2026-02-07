
    //============= C R E A T I N G  a  M O D E L =========

const mongoose = require('mongoose')

    const registrationSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
        },

        email:{
            type:String,
            required:true,
            unique:true,
        },

        password:{
            type:String || Number,
            required:true
        }
    });

    module.exports = mongoose.model('Registration', registrationSchema);