const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const hashPass = (password) => bcrypt.hashSync(password, salt)

const comparePass = (password, hash) => bcrypt.compareSync(password, hash)

module.exports = { hashPass, comparePass }