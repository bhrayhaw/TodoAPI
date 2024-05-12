const bcrypt = require("bcrypt");
const salt = 10


const hashpassword = (password) => {
    return bcrypt.hash(password, salt)
}

const verifypassword = (password, hashedpassword) => {
    return bcrypt.compare(password, hashedpassword)
}

module.exports = { hashpassword, verifypassword };
