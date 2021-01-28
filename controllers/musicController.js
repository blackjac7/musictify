const { Music } = require('../models/index')

class MusicController {
    static readMusic(req, res) {
        Music.findAll()
        .then((data)=> {
            //res.send(data)
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
        Music.create({
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            released_year: req.body.released_year
        })
        .then((data) => {
            //res.send(data)
            res.redirect('/music')
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
            //plus gambar
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
        res.render('music/uploadImg', {id})
    }

    static uploadImgPost(req, res) {
    
        // upload(req,res. (err) => {
        //     if (err) {
        //         res.send(err)
        //     } else {
        //         console.log(req.file);
        //         res.send('berhasil upload gambar')
        //     }
        // })
    }
}

module.exports = MusicController