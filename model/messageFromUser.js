const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newsSchema = new Schema({

  
    Name: {
    type:String,
    required:true
  },
  Email: {
    type:String,
    required:true
  },
  Phone: {
    type:String,
    required:true
  },
  message: {
    type:String,
    required:true
  },
  Date:{
        type: Date,
        required: true,
        default:Date.now

    }  

})

const UserModel=mongoose.model('messageFromUser',newsSchema);

module.exports=UserModel;