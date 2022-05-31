
const fs=require('fs');
const { google } = require('googleapis');
const genesisPodcast=require('./model/genesisPodcast')
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

const uploadToTheDrivePodCastGenesis= (fileMetadata,media,stringedFilePath,folderIds,originalname)=>{
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
    
   let filedata=file.data.id;
   let stringedFile=filedata
  
      genesisPodcast.updateOne({FolderId:folderIds},{genesisEspode:stringedFile},(err,ress)=>{
        if (err)throw err
        console.log('update done')
 })
    
 
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
  const uploadToTheDriveMakeFOlder= (fileMetadata)=>{
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
        
        
        
        
      }
    });
    }

module.exports= {uploadToTheDrivePodCast,uploadToTheDriveImage,uploadToTheDriveMakeFOlder,uploadToTheDrivePodCastGenesis};
 //}
 //creaAndUploadFile();