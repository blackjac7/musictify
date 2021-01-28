const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

//set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file ,cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// init upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file,cb)
    }
}).single('img')

function checkFileType(file, cb) {
    //allowed ext
    const filetype = /jpeg|jpg|png/;
    //cek ext name
    const extname = filetype.test(path.extname(file.originalname).toLowerCase())
    //check mime
    const mimetype = filetype.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb ('error: images only')
    }
}


module.exports = upload