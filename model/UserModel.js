const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    currentPlay: {
        type: String,
        required: true,
        default:'play'
        
    },
    Email: {
        type: String,
        required: true
    },
    ProfilePhotoUrl: {
        type: String,
        required: true
    },
    AuthId: {
        type: String,
        required: true
    },
    TotalNumberOfRecordings: {
        type: Number,
        required: true,
        default:0
    },
    TotalNumberOfLikes: {
        type: Number,
        required: true,
        default:0
    },
    TotalNumberOfShares: {
        type: Number,
        required: true,
        default:0
    },
    Date:{
        type: Date,
        required: true,
        default:Date.now

    }

})

const UserModel=mongoose.model('users',UserSchema);

module.exports=UserModel;