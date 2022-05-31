const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newsSchema = new Schema({

    imageUri1: {
        type: String,
            },
    imageUri2: {
        type: String,
        
    },
    imageUri3: {
        type: String,
        
    },
    imageUri4: {
        type: String,
        
    },
    imageUriX: {
        type: String,
        
    },
    imageUriY: {
        type: String,
        
    },
    imageUriZ: {
        type: String,
        
    },
    imageUriI: {
        type: String,
        
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

const UserModel=mongoose.model('latestShowbizz',newsSchema);

module.exports=UserModel;