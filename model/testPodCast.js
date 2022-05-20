const mongoose = require('mongoose');
const Schema = mongoose.Schema

const podcast = new Schema({
    podCastEpsodeName: {
        type: String,
        required: true
    },
   

})

const UserModel=mongoose.model('podcast',podcast);

module.exports=UserModel;