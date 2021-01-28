const router = require('express').Router()
const musicRouter = require('./music')
const userRouter = require('./user')
const UserController = require('../controllers/userController')
const auth = require('../middleware/auth')

// Router

router.get('/register', UserController.formRegister)
router.post('/register', UserController.register)

router.get('/login', UserController.formLogin)
router.post('/login', UserController.login)

router.get('/logout', UserController.logout)


router.use(auth) // ~~~~~~~~~~~~~ Authentication ~~~~~~~~~~

router.get('/', UserController.home)

router.use('/music', musicRouter)

router.use('/user', userRouter)


module.exports = router