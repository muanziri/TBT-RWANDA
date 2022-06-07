const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newsSchema = new Schema({

  
  AudioId: {
    type:String,
    required:true
  },
  UserName: {
    type:String,
    required:true
  },
  ProfilePic: {
    type:String,
    required:true
  },
  FolderId: {
    type:String,
    required:true
  },
  likes: {
    type:Number,
    required:true,
    default:0
  },
  Date:{
        type: Date,
        required: true,
        default:Date.now

    }  

})

const UserModel=mongoose.model('UserRecordings',newsSchema);

module.exports=UserModel;