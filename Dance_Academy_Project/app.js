const http = require('http')
const fs = require('fs')
const express = require('express')
const path = require("path")

const app = express()

const port = 8080;

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
// Start the server
app.listen(port,()=>{
    console.log(`The application started successfully at the port ${port}`)
})