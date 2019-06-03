const bcrypt = require('bcryptjs')

module.exports = {
  registerUser: async (req, res) => {
    let {email, firstName, lastName, password} = req.body
    const db = req.app.get('db')
    let userArr = await db.authCtrl.getUser({email})
    let existingUser = userArr[0]

    if (existingUser) {
      return res.status(409).send('Email already registered')
    } 

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    let registeredUser = await db.authCtrl.registerUser({email, firstName, lastName, hash})
    let user = registeredUser[0]

    req.session.user = {
      id: user.id,
      email: user.email
    }

    res.status(201).send(user)
  }, 

  loginUser: async (req, res) => {
    let {email, password} = req.body
    const db = req.app.get('db')
    let foundUser = await db.authCtrl.getUser({email})
    let user = foundUser[0]
    
    if (!user) {
      return res.status(401).send('User not found. Please register as a new user before logging in.')
    }

    const isAuthenticated = bcrypt.compareSync(password, user.hash)
    if (!isAuthenticated){
      return res.status(403).send('Incorrect password')
    }

    req.session.user = {
      id: user.id,
      username: user.username
    }
    res.status(200).send(req.session.user)
  },

  registerAdmin: async (req, res) => {
    let {email, firstName, lastName, password, companyId, owner} = req.body
    const db = req.app.get('db')
    let adminArr = await db.authCtrl.getAdmin({email})
    let existingAdmin = adminArr[0]

    if (existingAdmin) {
      return res.status(409).send('Email already registered')
    } 

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    let registeredAdmin = await db.authCtrl.registerAdmin({email, firstName, lastName, hash, companyId, owner})
    let admin = registeredAdmin[0]

    req.session.admin = {
      id: admin.id,
      email: admin.email,
      companyId: admin.companyId
    }

    res.status(201).send(admin)
  }, 

  loginAdmin: async (req, res) => {
    let {email, password} = req.body
    const db = req.app.get('db')
    let foundAdmin = await db.authCtrl.getAdmin({email})
    let admin = foundAdmin[0]
    
    if (!admin) {
      return res.status(401).send('Admin not found. Please register as a new admin before logging in.')
    }

    const isAuthenticated = bcrypt.compareSync(password, admin.hash)
    if (!isAuthenticated){
      return res.status(403).send('Incorrect password')
    }
    
    req.session.admin = {
      id: admin.id,
      email: admin.email,
      companyId: admin.company_id
    }

    res.status(200).send(req.session.admin)
  }
}