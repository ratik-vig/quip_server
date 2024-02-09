const bycrypt = require('bcryptjs')
const salt = bycrypt.genSaltSync(10)

const hashPassword = password => {
    return bycrypt.hashSync(password, salt)
}

const checkPassword = (hashedPassword, enteredPassword) => {
    return bycrypt.compareSync(enteredPassword, hashedPassword)
}

module.exports = { hashPassword, checkPassword }