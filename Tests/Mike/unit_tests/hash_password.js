const bcrypt = require('../../../node_modules/bcryptjs')

hashPassword = (str) => {
  let password = str
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

module.exports = hashPassword