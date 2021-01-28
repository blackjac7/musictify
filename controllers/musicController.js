const { Music } = require('../models/index')

class MusicController {
    static readMusic(req, res) {
        Music.findAll()
        .then((data)=> {
            res.render('music/readMusic', { data })
        })
        .catch(err=> {
            res.send(err.message)
        })
    }

    static addMusic(req,res) {
        res.render('music/addMusic')
    }

    static addMusicPost (req,res) {
        Music.Create({
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            released_year: req.body.released_year
            //upload gambar 
        })
        .then(() => {
            res.redirect('/music')
        })
        .catch(err => {
            res.send(err.message)
        })
    }

    static editMusic (req, res) {
        Music.findByPk(+req.params.id)
        .then (data => {
            res.render('editMusic', { data })
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
        .ccatch(err => {
            res.send(err.message)
        })
    }

    static uploadImg(req, res) {
        res.render()
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