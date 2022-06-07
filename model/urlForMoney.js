const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newsSchema = new Schema({

  
  UrlTobeShared: {
    type:String,
    required:true
  },
  Date:{
        type: Date,
        required: true,
        default:Date.now

    }  

})

const UserModel=mongoose.model('UrlTobeShared',newsSchema);

module.exports=UserModel;