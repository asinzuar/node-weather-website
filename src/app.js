const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const staticPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates/views')
const partialsPath = path.join(__dirname, '..', 'templates/partials')

// Express config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))

//routes

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rahul Chhiber'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rahul Chhiber'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.status(400).send({
            error: 'You must provide an address!'
        })
    }

    address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.status(500).send({
                error: 'Got an error fetching geo data - ' + error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.status(500).send({
                    error: 'Got an error fetching weather data - ' + error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address
            })
        })
    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return
    }
    
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Rahul Chhiber',
        message: 'Some helpful text'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        name: 'Rahul Chhiber',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        name: 'Rahul Chhiber',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up')
})