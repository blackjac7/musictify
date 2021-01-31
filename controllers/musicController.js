const {Music, Playlist, User} = require('../models/index')
const upload = require('../helpers/upload')
const { Op } = require('sequelize')

class MusicController {
    static readMusic(req, res) {
        let myPlaylist = []
        
        User.findAll({
            where: {
                username: req.session.username
            }
        })
        .then(userData => {
            myPlaylist = userData

            return Music.findAll()
        })
        .then((data)=> {
            res.render('music/readMusic', { myPlaylist, data })
        })
        .catch(err=> {
            res.send(err.message)
        })
    }
    
    static addMusic(req,res) {
        let errors = req.query.errors
        let myPlaylist = []
        
        User.findAll({
            where: {
                username: req.session.username
            }
        })
        .then(userData => {
            myPlaylist = userData

            res.render('music/addMusic', {myPlaylist, errors})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addMusicPost (req,res) {
        let user;
        let musicId;
        Music.create({
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            released_year: req.body.released_year
        })
        .then((data) => {
            musicId = data.id
            return User.findAll({ where : {
                username: req.session.username 
                }
            })
        })
        .then(usr => {
            user = usr[0].id
            return Playlist.create({
                music_id: musicId,
                user_id: user
            })
        })
        .then(data =>{
            res.redirect(`/music/seePlaylist/${user}`)

        })
        .catch(err => {
            const errorMessages = []

            err.errors.forEach(el => {
                errorMessages.push(el.message)
            })

            res.redirect(`/music/add?errors=${errorMessages}`)
        })
    }

    static editMusic (req, res) {
        let myPlaylist = []
        
        User.findAll({
            where: {
                username: req.session.username
            }
        })
        .then(userData => {
            myPlaylist = userData

            return Music.findByPk(+req.params.id)
        })
        .then (data => {
            res.render('music/editMusic', { myPlaylist, data })
        })
        .catch (err => {
            res.send(err.message)
        })
    }

    static editMusicPost (req, res) {
        Music.update({
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            released_year: req.body.released_year
        }, { 
            where: {
            id: +req.params.id
        }})
        .then( () => {
            res.redirect('/music')
        })
        .catch( err => {
            res.send(err.message)
        })
    }

    static destroyMusic(req, res) {
        Music.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(()=>{
            res.redirect('/music')
        })
        .catch(err => {
            res.send(err.message)
        })
    }

    static uploadImg(req, res) {
        let id = +req.params.id
        let myPlaylist = []
        
        User.findAll({
            where: {
                username: req.session.username
            }
        })
        .then(userData => {
            myPlaylist = userData

            res.render('music/uploadImg', { myPlaylist, id })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static uploadImgPost(req, res) {
        upload(req,res, (err) => {
            if (err) {
                res.send(err)
            } else {
                if (req.file == undefined) {
                    res.send("no file!")
                } else {
                    Music.update({
                        imgData: req.file.filename
                    }, {
                        where: {
                            id: +req.params.id
                        }
                    })
                    .then((data) => [
                        res.redirect('/music')
                    ])
                    .catch(err=>{
                        res.send(err)
                    })

                }
            }
        })
    }

    static seePlaylist (req, res) {
        let success = []
        let myPlaylist = []

        if (req.query.msg){
            success = req.query.msg.split(',')
        }

        User.findAll({ 
            where: {
                username: req.session.username
            },
            include: [Music],
        })
        .then(userData => {
            myPlaylist = userData

            if (userData[0].id === +req.params.id){
                let data = userData[0].Music

                res.render('music/myPlaylist', {myPlaylist, data, success})
            }else {
                return User.findAll({
                    where: {
                        id: +req.params.id
                    },
                    include: [Music],
                })
            }       
        })
        .then( info => {
            let data = info[0].Music
            res.render('music/userPlaylist', {myPlaylist, info, data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static othersLiked (req, res) {
        let myPlaylist = []
        
        User.findAll({
            where: {
                username: req.session.username
            }
        })
        .then(userData => {
            myPlaylist = userData

            return Music.findAll({
                where: {
                    id: +req.params.id
                },
                include: [User]
            })
        })
        .then(info=> {
            let data = info[0].Users
            res.render('music/othersLiked', {myPlaylist, data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addToMyPlaylist (req, res) {
        let user
        User.findAll({ where : {
            username: req.session.username 
            }
        })
        .then(data => {
            user = data[0].id
            return Playlist.create({
                music_id: +req.params.id,
                user_id: user
            })
        })
        .then((info ) => {
            const success = ['Music Successfully added']

            res.redirect(`/music/seePlaylist/${user}?msg=${success}`)

        })
        .catch(err =>  {
            res.send(err)
        })
    }
}


module.exports = MusicController

