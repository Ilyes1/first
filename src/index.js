const express = require('express')
const serverless = require('serverless-http')
const request = require('request')

const app = express()
const router = express.Router()

app.use(express.static('public'))

router.get('/', (req, res) => {
    res.send('index no problem')
})

router.get('/weather', (req, res) => {
    request('http://api.openweathermap.org/data/2.5/weather?q=casablanca&appid=923401310fb8f2a8c1dcb3796e756328', (err, weather) => {
        res.send(weather)
    })
})

app.use('/.netlify/functions/index', router)

module.exports.handler = serverless(app)