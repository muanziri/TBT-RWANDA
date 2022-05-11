const express=require('express');
const mongoose=require('mongoose');
const app=express();


app.set('view engine','ejs');
app.use('/static',express.static(__dirname+'/static'))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/podcast',(req,res)=>{
    res.render('podcast')
})
app.get('/news',(req,res)=>{
    res.render('news')
})

app.listen(3000,()=>{
    console.log('heard from 3000');
})