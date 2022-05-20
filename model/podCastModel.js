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
    likes:{
        type:Number,
        required:true,
        default:0
    },
    shares:{
        type:Number,
        required:true,
        default:0
    }
   

})

const UserModel=mongoose.model('podcast',podcast);

module.exports=UserModel;