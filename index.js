require('dotenv').config()
const express=require('express');
const multer=require('multer')
const mongoose=require('mongoose');
const passport=require('passport')
const genesis=require('./model/genesisPodcast')
const cookieSession=require('cookie-session')
const flash=require('express-flash')
const fs=require('fs')
const path=require('path')
const {uploadToTheDrivePodCast,uploadToTheDriveImage,uploadToTheDriveMakeFOlder} =require('./googleDrive.js')
const upload=multer();
const app=express();
require('./athentications/authfacebook')
require('./athentications/authGoogle')
const DB="mongodb+srv://TheMediaGroup:5x0dxqz5z9ENizFi@cluster0.mdy6t.mongodb.net/TheMediaGroup1?retryWrites=true&w=majority";
mongoose.connect(DB,{ useNewUrlParser:true,useUnifiedTopology:true})
  .then((results)=>{

    
   console.log('connected....');
  })
  .catch((err)=>{
      console.warn(err)
  })
  app.use(cookieSession({
    name: 'session',
    keys: ['MUNAMUNAMUNA'],
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
  app.use(flash())
app.set('view engine','ejs');
app.use('/static',express.static(__dirname+'/static'))
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook',
   { successRedirect: '/auth/google/success',
     failureRedirect: '/auth/google/failure' }));

app.get('/auth/google/success',(req,res)=>{
    res.redirect('/dashboard')
})
app.get('/auth/google/failure',(req,res)=>{
    res.redirect('/login')
})

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/dashboard',(req,res)=>{
    if(!req.user){
        res.redirect('/login')
    }else{
    res.render('UserDashbord',{user:req.user});
    }
})
app.get('/podcast',(req,res)=>{
    res.render('podcast')
})
app.get('/BlogPostControl',(req,res)=>{
    res.render('BlogPostControl')
})
app.get('/PodcastControl',(req,res)=>{
    res.render('PodcastControl')
})
app.post('/PodcastControl',(req,res)=>{
 var folderId = "1WFFcWOU-EvMGWhp7_SSlsaXdp-e5dSEs";   
 var fileMetadata = {
        'name': req.body.PlayName,
        'mimeType': 'application/vnd.google-apps.folder',
        parents: [folderId]
       };
       function funct(fileId){
        console.log(fileId)
       }
uploadToTheDriveMakeFOlder(fileMetadata,funct) 
  let name=req.body.PlayName;
  let Season=req.body.Season;
  let discrition=req.body.SeasonDiscription
 new genesis({
   PlayNames:name,
   seasonNumber:Season,
   PlayDiscription:discrition
 }).save().then((results)=>{
    req.flash('message','Now Record the first espode');
    req.flash('playName',results.PlayNames);
     res.redirect('/PodcastControl');
 }).catch((err)=>{
     if (err) throw err;
 })
})
app.post('/PodcastControlInnitiate',(req,res)=>{
    let files = req.files;
    let filepath="audioUploads/";
    let originalname=files[0].originalname+'.aac'
    let stringedFilePath=filepath+originalname;
    fs.writeFileSync(stringedFilePath,  files[0].buffer);

})
app.post('/PodcastControlUpload',upload.any(),(req,res)=>{
    let files=req.files
    let filepath="./audioUploads/";
    let originalname=files[0].originalname+'.aac'
    let stringedFilePath=filepath+originalname;
   var folderId = req.body.folderId;
  var fileMetadata = {
        'name': [originalname],
        parents: [folderId]
      };
      var media = {
            mimeType: 'audio/aac',
           body: fs.createReadStream(path.join(__dirname, stringedFilePath))
          };   
    uploadToTheDrivePodCastGenesis(fileMetadata,media,stringedFilePath,)

})
app.post('/innitiateGenesis',(req,res)=>{
    console.log(req.body)
})
app.post('/UploadGenesis',(req,res)=>{
    console.log(req.body)
})

app.get('/news',(req,res)=>{
    res.render('news')
})
app.get('/login',(req,res)=>{
    res.render('login')
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
app.get('/logout', function(req, res){
    req.logOut()
    res.redirect('/');
  });
app.post('/ToTheDrive',upload.any(), (req,res)=>{
    
    const user=req.user
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
 uploadToTheDrivePodCast(fileMetadata,media,stringedFilePath,user)
})
app.post('/updatePodcastTitle',(req,res)=>{
    
})
app.post('/ToTheDriveImages',upload.any(), (req,res)=>{
   
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
  uploadToTheDriveImage(fileMetadata,media,stringedFilePath,user)
})

app.listen(3000,()=>{
    console.log('heard from 3000');
})







