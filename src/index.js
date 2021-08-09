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
    res.send(req.params.city)
})


app.use('/.netlify/functions/index', router)

module.exports.handler = serverless(app)