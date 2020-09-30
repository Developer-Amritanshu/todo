//Require modules
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

//load express
const app = express()

//connecting mongoose
mongoose.connect('mongodb+srv://admin-amritanshu:amritanshu@cluster0.b5dqg.mongodb.net/itemDB', {useNewUrlParser: true, useUnifiedTopology: true});

//middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')

//code
let today = new Date().getDay();

//Create Schema
const itemSchema = new mongoose.Schema({
  name:String
})

//Create Model
const Item = mongoose.model('Item',itemSchema)

let item;

//Home get route
app.get('/',(req,res)=>{
  switch (today) {
    case 0:
      message = 'Today is sunday.'
      break;
    case 1:
      message = 'Today is monday.'
      break;
    case 2:
      message = 'Today is tuesday.'
      break;
    case 3:
      message = 'Today is wednesday.'
      break;
    case 4:
      message = 'Today is thruday.'
      break;
    case 5:
      message = 'Today is friday.'
      break;
    case 6:
      message = 'Today is saturday.'
      break;
  
    default:
      console.log(today);
      break;
  }
  Item.find({},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      res.render('home',{message:message,item:data});
    }
  })
  
})

app.post('/',(req,res)=>{
  item = new Item({
    name:req.body.item
  })
  item.save()
  res.redirect('/')
})

app.post('/delete',(req,res)=>{
  const checkedItem = req.body.checkbox;
  Item.deleteOne({_id:checkedItem},(err)=>{
    if(err){
      console.log(err);
    }else{
      console.log('Deleted Sucessfully');
    }
  });
  res.redirect('/');
})

//Listen to server
let port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`Server started at port ${port}`);
})