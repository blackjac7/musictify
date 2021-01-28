const express = require('express')
const router = require('./routes/index')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

//set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file ,cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// init upload
const upload = multer({
    storage: storage
}).single('img')

const app = express()
const port = 4000

app.set('view engine', 'ejs')

//public foler (static) buat img
app.use(express.static('./public'))

app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})