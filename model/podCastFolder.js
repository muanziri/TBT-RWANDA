const mongoose = require('mongoose');
const Schema = mongoose.Schema

const podcastFolder = new Schema({

    FolderId:{
        type: String,
        required: true
    },
   
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
   

})

const podcastFolderId=mongoose.model('FolderIds',podcastFolder);

module.exports=podcastFolderId;