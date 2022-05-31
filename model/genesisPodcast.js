const mongoose = require('mongoose');
const Schema = mongoose.Schema

const podcast = new Schema({

    PlayNames:{
        type: String,
        required: true
    },
    FolderId:{
        type: String,
        required: true
    },
    genesisEspode:{
        type: String,
        required: true,
        default:'id'
    },
    seasonNumber:{
        type: Number,
        required: true,
        default:0
    },
    PlayDiscription:{
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