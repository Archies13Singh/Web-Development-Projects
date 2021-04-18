const http = require('http')
const fs = require('fs')
const express = require('express')
const path = require("path")
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
const app = express()

const port = 8080;



// Define Mongoose Schema
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});

const contactschema = new mongoose.Schema({
    name: String,
    phone : String,
    email: String,
    address: String,
    Comment: String
  });

const Contact = mongoose.model('Contact',  contactschema);




// Adding Express directory
app.use('/static',express.static('static'))// for serving the static folder
app.use(express.urlencoded()) // for url

// Pug speccific stuff
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));
 

app.get('/',(req,res)=>{
    const params = {};
    res.render('home.pug',params)
})

app.get('/contact',(req,res)=>{
    res.render('contact.pug')
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved ")
    })
})


app.get('/contact',(req,res)=>{
    res.render('contact.pug')
})
// Start the server
app.listen(port,()=>{
    console.log(`The application started successfully at the port ${port}`)
})