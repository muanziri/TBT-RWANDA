const mongoose = require('mongoose');
const Schema = mongoose.Schema

const podcast = new Schema({
   
    UserId: {
        type: String,
        required: true
    },
     playName: {
        type: String,
        required: true
    },
    referenceId: {
        type: String,
        required: true,
        default:'The Id'
    },
    likes:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type: String,
        required: true,
        default:'invoted'
    },
    shares:{
        type:Number,
        required:true,
        default:0
    }
   

})

const podcasts=mongoose.model('podcast',podcast);

module.exports= podcasts;