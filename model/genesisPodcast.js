const mongoose = require('mongoose');
const Schema = mongoose.Schema

const podcast = new Schema({

 
    referenceId: {
        type: String,
        required: true,
        default:'The Id'
    },
  
    PlayName:{
        type: String,
        required: true
    },
    shares:{
        type:Number,
        required:true,
        default:0
    }
   

})

const genesis=mongoose.model('genesis',podcast);

module.exports=genesis;