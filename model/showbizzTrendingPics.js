const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newsSchema = new Schema({

  
  ImageBy: {
    type:String,
    required:true
  },
  Heading1: {
      
          type:String,
          required:true
  },
  Image1ID: {
          type:String,
          required:true
  },
  Heading2: {
      
          type:String,
          required:true
  },
  Image2ID: {
          type:String,
          required:true
  },
  Heading3: {
      
          type:String,
          required:true
  },
  Image3ID: {
          type:String,
          required:true
  },
  Heading4: {
      
          type:String,
          required:true
  },
  Image4ID: {
          type:String,
          required:true
  },
  Heading5: {
      
          type:String,
          required:true
  },
  Image5ID: {
          type:String,
          required:true
  },
  Heading6: {
      
          type:String,
          required:true
  },
  Image6ID: {
          type:String,
          required:true
  },
  Heading7: {
      
          type:String,
          required:true
  },
  Image7ID: {
          type:String,
          required:true
  },
  Heading8: {
      
          type:String,
          required:true
  },
  Image8ID: {
          type:String,
          required:true
  },
  Heading9: {
      
          type:String,
          required:true
  },
  Image9ID: {
          type:String,
          required:true
  },
  Heading10: {
      
          type:String,
          required:true
  },
  Image10ID: {
          type:String,
          required:true
  },
  Heading11: {
      
          type:String,
          required:true
  },
  Image11ID: {
          type:String,
          required:true
  },
  Heading12: {
      
          type:String,
          required:true
  },
  Image12ID: {
          type:String,
          required:true
  },
  Heading13: {
      
          type:String,
          required:true
  },
  Image13ID: {
          type:String,
          required:true
  },
  Date:{
        type: Date,
        required: true,
        default:Date.now

    }  

})

const UserModel=mongoose.model('showbizzTrendingPics',newsSchema);

module.exports=UserModel;