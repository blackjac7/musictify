const express = require('express')
const session = require('express-session')
const router = require('./routes')
const multer = require('multer')
const path = require('path')

// //set storage engine
// const storage = multer.diskStorage({
//     destination: './public/uploads',
//     filename: function (req, file ,cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// // init upload
// const upload = multer({
//     storage: storage
// }).single('img')

const app = express()
const port = 4000

// Session
app.use(session({
    secret: 'helkiandmusictifyeveryday',
    resave: false,
    saveUninitialized: false,
  }))

// View Engine
app.set('view engine', 'ejs')

//public foler (static) buat img
app.use(express.static('./public'))

// Body Parser
app.use(express.urlencoded({ extended: false }))

// Router
app.use('/', router)

// Listener
app.listen(port, () => {
    console.log(`Musictify is listening on port ${port}`)
})