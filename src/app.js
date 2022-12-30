const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

const app = express()
//app.com
//app.com/help
//app.com/contact

//Define paths for express config
const publicDirName = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory
app.use(express.static(publicDirName))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: "TimmyHome"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me page',
        name: "LisaAbout"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'TimHelp'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        } 
        forecast(longitude,latitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})
app.get('/products', (req,res)=>{
    if(!req.query.search){
       return res.send ({
            error: 'You must provide a search'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: '404Name',
        errorMessage: 'Help Article not found'
    })
})
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: '404Name',
        errorMessage: 'Page Not Found'
    })
})

// to start the server up
//local dev env port 3000 
app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})
