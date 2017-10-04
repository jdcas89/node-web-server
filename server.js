const express = require('express')
const hbs = require('hbs')
const portName = 3000
const fs = require('fs')
let app = express()

//nodemon server.js -e js,hbs
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})
app.set('view engine', 'hbs')


app.use((req,res, next) => {
  var now = new Date().toString()
  var log =`${now}: HTTP method ${req.method} , URL: ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log')
    }
  })
  next()
})


app.use((req,res, next) => {
  res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage : 'Hello there, welcome to my website'
  })
})


app.get('/bad', (req,res) => {
  res.send({
    error: 'The data you requested was bad'
  })
})

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
})


app.listen(portName, () =>{
  console.log('Server is up on port ' + portName)
})
