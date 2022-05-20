const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NoteSchema = new Schema({

    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    }
    

})

const UserModel=mongoose.model('Notes',NoteSchema);

module.exports=UserModel;