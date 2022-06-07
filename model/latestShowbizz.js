const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newsSchema = new Schema({
    Heading: {
        type: String,
        required: true
      },
      Image1ID: {
        type: String,
        required: true
      },
      Image2ID: {
        type: String,
        required: true
      },
      Image3ID: {
        type: String,
        required: true
      },
      Image4ID: {
        type: String,
        required: true
      },
      Paragraph: {
        type: String,
        required: true
      },
      Paragraph2: {
        type: String,
        required: true
      },
      SelectedHead: {
        type: String,
        required: true
      },
      ImageXID: {
        type: String,
        required: true
      },
        Author: {
            type: String,
            required: true
        },
        Date:{
            type: Date,
            required: true,
            default:Date.now
    
        }
    

})

const UserModel=mongoose.model('latestShowbizz',newsSchema);

module.exports=UserModel;