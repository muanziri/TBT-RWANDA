const path=require('path');
const express=require('express')
const fs=require('fs');
const  {podcasts}=require('./model/podCastModel')
const { google } = require('googleapis');
const key= require('./fetch-350015-b4ada057355d.json')
var drive = google.drive("v3");
var jwToken = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key, ["https://www.googleapis.com/auth/drive"],
    null
  );
  jwToken.authorize((authErr) => {
    if (authErr) {
      console.log("error : " + authErr);
      return;
    } else {
      console.log("Authorization accorded");
    }
  });



const uploadToTheDrivePodCast= (fileMetadata,media,stringedFilePath,user)=>{
  console.log(user)
drive.files.create({
  auth: jwToken,
  resource: fileMetadata,
  media: media,
  fields: 'id'
}, function(err, file) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
   
    console.log('File Id: ', file.data.id);
 
    fs.unlink(stringedFilePath,()=>{
      console.log("deleted")
    })
  }
});
}

const uploadToTheDrivePodCastGenesis= (fileMetadata,media,stringedFilePath)=>{
 // console.log(user)
drive.files.create({
  auth: jwToken,
  resource: fileMetadata,
  media: media,
  fields: 'id'
}, function(err, file) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
   
    console.log('File Id: ', file.data.id);
 
    fs.unlink(stringedFilePath,()=>{
      console.log("deleted")
    })
  }
});
}

const uploadToTheDriveImage= (fileMetadata,media,stringedFilePath)=>{
  drive.files.create({
    auth: jwToken,
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, function(err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('File Id: ', file.data.id);
      fs.unlink(stringedFilePath,()=>{
        console.log("deleted")
      })
    }
  });
  }
  // use mime type  application/vnd.google-apps.folder
  const uploadToTheDriveMakeFOlder= (fileMetadata,funct)=>{
    drive.files.create({
      auth: jwToken,
      resource: fileMetadata,
      fields: 'id'
    }, function(err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        let fileId=file.data.id
        
        funct(fileId);
        
        
      }
    });
    }

module.exports= {uploadToTheDrivePodCast,uploadToTheDriveImage,uploadToTheDriveMakeFOlder};
 //}
 //creaAndUploadFile();