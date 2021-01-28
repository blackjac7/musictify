const router = require('express').Router()
const MusicController = require('../controllers/musicController')

router.get('/', MusicController.readMusic)

router.get('/add', MusicController.addMusic)

router.post('/add', MusicController.addMusicPost)

router.get('/edit/:id', MusicController.editMusic)


router.get('/edit/:id', MusicController.editMusicPost)

router.get('/delete/:id', MusicController.destroyMusic)

//upload gambar 
router.get('/upload/:id', MusicController.uploadImg)

router.post('/upload/:id', MusicController.uploadImgPost)


module.exports = router