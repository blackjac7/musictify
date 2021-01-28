const express = require('express')
const session = require('express-session')
const router = require('./routes')
const multer = require('multer')
const path = require('path')

const app = express()
const port = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'public')))

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