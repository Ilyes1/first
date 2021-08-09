const express = require('express')
const serverless = require('serverless-http')
const request = require('request')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.send('Hello world!')
})

router.get('/:city', (req, res) => {
    request(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=923401310fb8f2a8c1dcb3796e756328`, (err, data) => {
        if (err) throw err
        res.send(data)
    })
    res.redirect('/')
})


app.use('/.netlify/functions/index', router)

module.exports.handler = serverless(app)