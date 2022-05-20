const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newsSchema = new Schema({

    imageUri1: {
        type: String,
        required: true
    },
    imageUri2: {
        type: String,
        required: true
    },
    imageUri3: {
        type: String,
        required: true
    },
    imageUri4: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    paragraphI: {
        type: String,
        required: true
    },
    paragraphII: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Date:{
        type: Date,
        required: true,
        default:Date.now

    }

})

const UserModel=mongoose.model('news',newsSchema);

module.exports=UserModel;