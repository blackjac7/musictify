const {Music, Playlist, User} = require('../models/index')
const { comparePass } = require('../helpers/hashPass')

class Controller {
    static formRegister(req, res){
        let errors = []

        if (req.query.errors){
            errors = req.query.errors.split(',')
        }
        
        res.render('register', { errors })
    }

    static register(req, res){
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        
        User.create(newUser)
        .then(data => {
            res.redirect('/login')
        }).catch(err => {
            const errorMessages = []

            err.errors.forEach(el => {
                errorMessages.push(el.message)
            })

            res.redirect(`/register?errors=${errorMessages}`)
        })
    }

    static formLogin(req, res){
        res.render('login')
    }

    static login(req, res){
        const { username, password } = req.body


        User.findOne({ where: { username } })
        .then(data => {
            if (data && comparePass(password, data.password)) {
            res.redirect(`/`)
            } else {
            throw Error('Invalid Password')
            }
        }).catch(err => {
            const errorMessages = []

            err.errors.forEach(el => {
                errorMessages.push(el.message)
            })

            res.redirect(`/login?errors=${errorMessages}`)
        })
    }
}

module.exports = Controller