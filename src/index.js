const express = require('express')
const serverless = require('serverless-http')
const request = require('request')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')

const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.send('Hello world!')
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.single('image'), (req, res) => {
    res.send('File Uploaded.' + req.file.filename)
})

app.use('/.netlify/functions/index', router)

module.exports.handler = serverless(app)