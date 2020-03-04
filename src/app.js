const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const dotenv = require('dotenv').config('.env');

const app = express()
// port says to start up on whatever port is available, whether that
// is in heroku it will use process.env or running locoally using 3000
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Routes
app.get('', (req, res) => {
    // rendering available page and creating variables to be used in template
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Stein'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Stein',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'We have come to help you, please ring the bell!',
        title: 'Help',
        name: 'Andrew Stein',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    // the {} in geocode args includes shorthand object deconstruction to set variables 
    // from object properties that are available to us.    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

// for 404s
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Stein',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Stein',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log(`Server is up on ${port}`)
});