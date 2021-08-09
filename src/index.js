const express = require('express')
const serverless = require('serverless-http')
const request = require('request')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.send('index no problem')
})

router.post('/weather', (req, res) => {
    const city = req.body.city
    request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=923401310fb8f2a8c1dcb3796e756328`, (err, weather) => {
        res.send(weather)
    })
})

app.use('/.netlify/functions/index', router)

module.exports.handler = serverless(app)