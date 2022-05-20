require('dotenv').config()
const express=require('express');
const multer=require('multer')
const mongoose=require('mongoose');
const podcastModel=require('./model/testPodCast')
const fs=require('fs')
const path=require('path')
const uploadToTheDrive =require('./googleDrive.js')
const upload=multer();
const app=express();


app.use(express.urlencoded({extended: true}));
const DB="mongodb+srv://TheMediaGroup:5x0dxqz5z9ENizFi@cluster0.mdy6t.mongodb.net/TheMediaGroup1?retryWrites=true&w=majority";
mongoose.connect(DB,{ useNewUrlParser:true,useUnifiedTopology:true})
  .then((results)=>{

    
   console.log('connected....');
  })
  .catch((err)=>{
      console.warn(err)
  })


app.set('view engine','ejs');
app.use('/static',express.static(__dirname+'/static'))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/dashboard',(req,res)=>{
    res.render('UserDashbord')
})
app.get('/podcast',(req,res)=>{
    res.render('podcast')
})

app.get('/news',(req,res)=>{
    res.render('news')
})
app.post('/news',(req,res)=>{
    
})
app.post('/innitiate',upload.any(),async (req,res)=>{
    let files = req.files;
    let filepath="audioUploads/";
    let originalname=files[0].originalname+'.aac'
    let stringedFilePath=filepath+originalname;
    fs.writeFileSync(stringedFilePath,  files[0].buffer);
})
app.post('/ToTheDrive',upload.any(), (req,res)=>{
    let files=req.files
    let filepath="./audioUploads/";
    let originalname=files[0].originalname+'.aac'
    let stringedFilePath=filepath+originalname;
   var folderId = "1WFFcWOU-EvMGWhp7_SSlsaXdp-e5dSEs";
  var fileMetadata = {
        'name': [originalname],
        parents: [folderId]
      };
      var media = {
            mimeType: 'audio/aac',
           body: fs.createReadStream(path.join(__dirname, stringedFilePath))
          };   
  uploadToTheDrive(fileMetadata,media,stringedFilePath)
})

app.listen(3000,()=>{
    console.log('heard from 3000');
})







