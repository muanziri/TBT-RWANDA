const mongoose = require('mongoose');
const Schema = mongoose.Schema

const podcast = new Schema({

    podCastUrlID: {
        type: String,
        required: true
    },
    referenceId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default:'unapproved'
    },
    added:{
        type:Boolean,
        required:true,
        default:false
    }
   

})

const UserModel=mongoose.model('podcast',podcast);

module.exports=UserModel;