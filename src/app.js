const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
app.use(express.static(path.join(__dirname, '../public')));
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths);

app.get('', (req,res)=>{
  res.render('index',{
    title: "Weather",
    name: "Jana"
  })
})

app.get('/about', (req,res)=>{
  res.render('about',{
    title: "About Me",
    name: "Jana"
  })
})

app.get('/help', (req,res)=>{
  res.render('help',{
    title: "Help",
    message: "Some help message",
    name: "Jana"
  })
})


app.get('/weather',(req, res)=>{
  if(!req.query.address) {
    return res.send({
      error: "You must provide an address"
    })
  }
  
  geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
    if(error){
      return res.send({error})
    } 
    forecast(latitude, longitude, (error, forecastData)=>{
      if(error) {
        return res.send({error})
      }
  
      res.send({
        forecast: forecastData,
        location ,
        address: req.query.address,
        
      })
    })
  })

 
})




app.get('/help/*', (req,res)=>{
  res.render('404', {
    message: "Help article not found",
    name: "Jana",
    title: "404"
  })
})

app.get('*', (req, res)=>{
  res.render('404', {
    message: "Page not found",
    name: "Jana",
    title: "404"
  })
})


app.listen(port, ()=> {
  console.log("Server is up on port " + port)
})