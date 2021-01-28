const router = require('express').Router()
const musicRouter = require('./music')
const userRouter = require('./user')
const UserController = require('../controllers/userController')
// const music 

router.get('/', (req, res) => {
    res.render('home')
})

router.use('/music', musicRouter)

router.use('/user', userRouter)

router.get('/register', UserController.formRegister)
router.post('/register', UserController.register)

router.get('/login', UserController.formLogin)
router.post('/login', UserController.login)


module.exports = router