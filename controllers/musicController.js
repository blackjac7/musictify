const {Music, Playlist, User} = require('../models/index')
const upload = require('../helpers/upload')

class MusicController {
    static readMusic(req, res) {
        Music.findAll()
        .then((data)=> {
            //res.send(data[0].refMusic())
            res.render('music/readMusic', { data })
        })
        .catch(err=> {
            res.send(err.message)
        })
    }
    
    static addMusic(req,res) {
        let errors = req.query.errors
        res.render('music/addMusic', {errors})
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
        Music.findByPk(+req.params.id)
        .then (data => {
            res.render('music/editMusic', { data })
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
        res.render('music/uploadImg', { id })
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
        User.findAll({
            where: {
                id: +req.params.id
            },
            include: [Music]
        })
        .then( info => {
            let data = info[0].Music
            res.render('music/userPlaylist', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static othersLiked (req, res) {
        Music.findAll({
            where: {
                id: +req.params.id
            },
            include: User
        })
        .then(info=> {
            let data = info[0].Users
            //res.send(info[0].Users[0].name)
            res.render('music/othersLiked', {data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addToMyPlaylist (req, res) {
        Playlist.Create({
            
        })
        .then( data => {

        })
        .catch (err => {
            res.send(err)
        })
    }
}


module.exports = MusicController

