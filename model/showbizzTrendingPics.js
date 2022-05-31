const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newsSchema = new Schema({

    thePhotoGraper:{
        type: String,
        required: true,
    },
    heading:{
        type: String,
        required: true,
    },
    Date:{
        type: Date,
        required: true,
        default:Date.now

    }

})

const UserModel=mongoose.model('showbizzTrendingPics',newsSchema);

module.exports=UserModel;