const {Music, Playlist, User} = require('../models/index')
const { comparePass } = require('../helpers/hashPass')

class Controller {
    static home(req, res) {
        User.findAll()
        .then(data=>{
            res.render('home', {data})
        })
        .catch(err=>{
            res.send(err)
        })
    }
    
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
            //res.send(err)
        })
    }

    static formLogin(req, res){
        let errors = []

        if (req.query.errors){
            errors = req.query.errors.split(',')
        }
        
        res.render('login', { errors })
    }

    static login(req, res){
        const { username, password } = req.body
        
        if (!username || !password){
            const errorMessages = ['username and password required']

            res.redirect(`/login?errors=${errorMessages}`)
        }else {
            User.findOne({ where: { username } })
            .then(data => {
                if (data && comparePass(password, data.password)) {
                    req.session.username = username
                    res.redirect(`/`)// userlist
                }else {
                    const wrongPass = ['Invalid Password']
                    res.redirect(`/login?errors=${wrongPass}`)
                }
            }).catch(err => {
                res.send(err)
            })
        }
    }

    static logout(req, res){

        delete req.session.username
        res.redirect('/login')
    }   

}

module.exports = Controller