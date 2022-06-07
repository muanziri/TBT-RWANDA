require('dotenv').config()
const express=require('express');

const multer=require('multer')
const mongoose=require('mongoose');
const passport=require('passport')
const latestShowBizz=require('./model/latestShowbizz')
const NewUrlTobeShared=require('./model/urlForMoney')
const UserRecording=require('./model/ibitekerezo')
const gossipAndNews=require('./model/gossipAndNews')
//var MemoryFileSystem = require("memory-fs")
const showbizzTrendings=require('./model/showbizzTrendingPics')
const genesis=require('./model/genesisPodcast')
const cookieSession=require('cookie-session')
const flash=require('express-flash')
const { google } = require('googleapis');
const key= require('./fetch-350015-b4ada057355d.json')
var drive = google.drive("v3");
const fs=require('fs')
const path=require('path')
const {uploadToTheDrivePodCast,uploadToTheDriveImage,uploadToTheDrivePodCastGenesis} =require('./googleDrive.js')
const upload=multer();
const app=express();
require('./athentications/authfacebook')
require('./athentications/authGoogle')
const DB="mongodb+srv://TheMediaGroup:5x0dxqz5z9ENizFi@cluster0.mdy6t.mongodb.net/TheUnitedMediaGroup1?retryWrites=true&w=majority";
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
  latestShowBizz.find().then((results)=>{
    gossipAndNews.find().then((results2)=>{
      showbizzTrendings.find().then((results3)=>{
        
    res.render('news',{latestShowbizzs:results,GosssipNews:results2,trendingPics:results3})
  })
})
})
})

app.post('/gossipAndNews',(req,res)=>{
  //console.log(req.body)
  new gossipAndNews({
    Heading:req.body.Heading,
    Image1ID:req.body.Image1ID,
    Image2ID:req.body.Image2ID,
    Image3ID:req.body.Image3ID,
    Image4ID:req.body.Image4ID,
    Paragraph:req.body.Paragraph,
    Paragraph2:req.body.Paragraph2,
    SelectedHead:req.body.SelectedHead,
    ImageXID:req.body.ImageXID,
    Author:req.body.firstname+"  "+req.body.lastname
  }).save().then((results)=>{
    console.log('saved to the database');
    //res.redirect('/BlogPostControl')
  }).catch((err)=>{
     if(err)throw err
  })

})
app.post('/latestShowbizz',(req,res)=>{
 // console.log(req.body)
  new latestShowBizz({
    Heading:req.body.Heading,
    Image1ID:req.body.Image1ID,
    Image2ID:req.body.Image2ID,
    Image3ID:req.body.Image3ID,
    Image4ID:req.body.Image4ID,
    Paragraph:req.body.Paragraph,
    Paragraph2:req.body.Paragraph2,
    SelectedHead:req.body.SelectedHead,
    ImageXID:req.body.ImageXID,
    Author:req.body.firstname+"  "+req.body.lastname
  }).save().then((results)=>{
    console.log('saved to the database');
    //res.redirect('/BlogPostControl')
  }).catch((err)=>{
    if(err)throw err
  })
  
})
app.post('/showbizzTrendingPics',(req,res)=>{
  console.log(req.body)
  new showbizzTrendings({
    Heading1: req.body.Heading1,
    Image1ID: req.body.Image1ID,
    Heading2: req.body.Heading2,
    Image2ID: req.body.Image2ID,
    Heading3: req.body.Heading3,
    Image3ID: req.body.Image3ID,
    Heading4: req.body.Heading4,
    Image4ID: req.body.Image4ID,
    Heading5: req.body.Heading5,
    Image5ID: req.body.Image5ID,
    Heading6: req.body.Heading6,
    Image6ID: req.body.Image6ID,
    Heading7: req.body.Heading7,
    Image7ID: req.body.Image7ID,
    Heading8: req.body.Heading8,
    Image8ID: req.body.Image8ID,
    Heading9: req.body.Heading9,
    Image9ID: req.body.Image9ID,
    Heading10: req.body.Heading10,
    Image10ID: req.body.Image10ID,
    Heading11: req.body.Heading11,
    Image11ID: req.body.Image11ID,
    Heading12: req.body.Heading12,
    Image12ID: req.body.Image12ID,
    Heading13: req.body.Heading13,
    Image13ID: req.body.Image13ID,
    ImageBy:req.body.firstname+" "+req.body.lastname
  
  }).save().then((results)=>{
    console.log('saved')
    
  }).catch((err)=>{
    if (err) throw err
  })
})
app.post('/NewUrlTobeShared',(req,res)=>{
  new NewUrlTobeShared({
   UrlTobeShared:req.body.NewUrlTobeSharedred
  }).save().then((results)=>{
    console.log('the url is kept')
  }).catch((error)=>{
    if(error) throw error
  })
 })
app.get('/dashboard',(req,res)=>{
    if(!req.user){
        res.redirect('/login')
    }else{
      genesis.find().then((results)=>{
        let folderIde=results[0].FolderId
       
        UserRecording.find({FolderId:folderIde}).then((results2)=>{
          // console.log(results2)
        res.render('UserDashbord',{user:req.user,genes:results[0],recordings:results2});
      })
      })
    
    }
})
app.get('/talkToUs',(req,res)=>{
    res.render('talkToUs')
})

app.get('/BlogPostControl',(req,res)=>{
    res.render('BlogPostControl')
})
app.get('/PodcastControl',(req,res)=>{
    res.render('PodcastControl')
})
app.post('/PodcastControl',(req,res)=>{
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
        } 
      });

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
            req.flash('message','Now Record the first espode');
            req.flash('Id',fileId);
            req.flash('playName',req.body.PlayName);
            let name=req.body.PlayName;
            let Season=req.body.Season;
            let discrition=req.body.SeasonDiscription
           new genesis({
             PlayNames:name,
             seasonNumber:Season,
             PlayDiscription:discrition,
             FolderId:fileId
           }).save().then((results)=>{
           }).catch((err)=>{
               if (err) throw err;
           })
            res.redirect('/PodcastControl')
            
            
          }
        });
        }
    


 var folderId = "1WFFcWOU-EvMGWhp7_SSlsaXdp-e5dSEs";
 var folderName=req.body.PlayName+" S "+req.body.Season   
 var fileMetadata = {
        'name': folderName,
        'mimeType': 'application/vnd.google-apps.folder',
        parents: [folderId]
       };
       function funct(fileId){
        console.log(fileId)
       }
       module.exports=funct;

 
 uploadToTheDriveMakeFOlder(fileMetadata) 
})
app.post('/PodcastControlInnitiate',upload.any(),(req,res)=>{

    let files = req.files;
    let filepath="audioUploads/";
    let originalname=files[0].originalname+'.aac'
    let stringedFilePath=filepath+originalname;
    fs.writeFileSync(stringedFilePath,  files[0].buffer);

})
app.post('/DirectPodcastControlInnitiate',upload.any(),(req,res)=>{

  let files = req.files;
  let filepath="audioUploads/";
  let originalname=files[0].originalname
  let stringedFilePath=filepath+originalname;
  fs.writeFileSync(stringedFilePath,  files[0].buffer);

})
app.post('/PodcastControlUpload',upload.any(),(req,res)=>{
    let files=req.files
    let filepath="./audioUploads/";
    let originalname=files[0].originalname+'.aac'
    let stringedFilePath=filepath+originalname;
   var folderIds = req.body.folderId;
  var fileMetadata = {
        'name': [originalname],
        parents: [folderIds]
      };
      var media = {
            mimeType: 'audio/aac',
           body: fs.createReadStream(path.join(__dirname, stringedFilePath))
          };   
    uploadToTheDrivePodCastGenesis(fileMetadata,media,stringedFilePath,folderIds,originalname,)
   res.redirect('/Admindashbaord');
})
app.post('/innitiateGenesis',(req,res)=>{
    console.log(req.body)
})
app.post('/UploadGenesis',(req,res)=>{
    console.log(req.body)
})

app.get('/home',(req,res)=>{
    res.render('index')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/news',(req,res)=>{
    
})
// app.post('/:UserId',async (req,res)=>{

//   const User = await UserModel.findOne({ short: req.params.UserId})
//   if (User == null) return res.sendStatus(404)

//   User.Clicks++
//   User.save()

//   res.redirect(User)
// })
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
    genesis.find().then((results)=>{
      const user=req.user
    let files=req.files
    let filepath="./audioUploads/";
    let originalname=files[0].originalname+'.aac'
    let stringedFilePath=filepath+originalname;
   var folderId = results[0].FolderId;
  var fileMetadata = {
        'name': [originalname],
        parents: [folderId]
      };
      var media = {
            mimeType: 'audio/aac',
           body: fs.createReadStream(path.join(__dirname, stringedFilePath))
          };   
 uploadToTheDrivePodCast(fileMetadata,media,stringedFilePath,user,folderId)
    }).catch((err)=>{
      if (err) throw err
    })
    
})
app.post('/ToTheDrive2',upload.any(), (req,res)=>{
  genesis.find().then((results)=>{
    const user=req.user
  let files=req.files
  let filepath="./audioUploads/";
  let originalname=files[0].originalname
  let stringedFilePath=filepath+originalname;
 var folderId = results[0].FolderId;
var fileMetadata = {
      'name': [originalname],
      parents: [folderId]
    };
    var media = {
          mimeType: 'audio/mp3',
         body: fs.createReadStream(path.join(__dirname, stringedFilePath))
        };   
uploadToTheDrivePodCast(fileMetadata,media,stringedFilePath,user,folderId)
  }).then(()=>{
    res.redirect('/dashboard')
  }).catch((err)=>{
    if (err) throw err
  })
  
})
app.get('/Admindashbaord',(req,res)=>{
    res.render('Admindashbaord')
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

app.listen(4000,()=>{
    console.log('heard from 4000');
})







