const path=require('path')
const fs=require('fs');
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

 // upload file in specific folder
var folderId = "1WFFcWOU-EvMGWhp7_SSlsaXdp-e5dSEs";

const uploadToTheDrive= (fileMetadata,media,stringedFilePath)=>{
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

module.exports= uploadToTheDrive;
 //}
 //creaAndUploadFile();