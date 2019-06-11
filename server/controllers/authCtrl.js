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
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name
    }

    res.status(201).send(req.session.user)
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
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      resume: user.resume
    }
    res.status(200).send(req.session.user)
  },

  registerAdmin: async (req, res) => {
    let {email, firstName, lastName, password, adminKey, owner} = req.body
    const db = req.app.get('db')

    let companyIdArr = await db.authCtrl.getCompanyId({adminKey})
    if (!companyIdArr[0]) {
      return res.status(409).send('Incorrect admin key')
    } 

    let companyId = companyIdArr[0].id
    console.log(companyId)

    let adminArr = await db.authCtrl.getAdmin({email})
    let existingAdmin = adminArr[0]

    if (existingAdmin) {
      return res.status(409).send('Email already registered')
    } 

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    let registeredAdmin = await db.authCtrl.registerAdmin({email, firstName, lastName, hash, companyId, owner})
    let admin = registeredAdmin[0]
    console.log(admin)
    req.session.admin = {
      id: admin.id,
      email: admin.email,
      companyId: admin.company_id,
      firstName: admin.first_name,
      lastName: admin.last_name,
      owner: admin.owner
    }

    res.status(201).send(req.session.admin)
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
      companyId: admin.company_id,
      firstName: admin.first_name,
      lastName: admin.last_name,
      owner: admin.owner
    }

    res.status(200).send(req.session.admin)
  },

  logout: async (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  checkForSession: async (req, res) => {
    res.status(200).send(req.session)
  },

  updateUser: async (req, res) => {
    let {email, firstName, lastName, password, resume, picture} = req.body
    let {id} = req.session.user
    const db = req.app.get('db')

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    
    let updatedUser = await db.authCtrl.updateUser({email, firstName, lastName, hash, id, resume, picture})
    let user = updatedUser[0]
    
    try {
      req.session.user = {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
      res.status(201).send(req.session.user)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  updateAdmin: async (req, res) => {
    let {email, firstName, lastName, password, owner} = req.body
    
    let {id} = req.session.admin
    const db = req.app.get('db')
   
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    
    let updatedAdmin = await db.authCtrl.updateAdmin({email, firstName, lastName, hash, owner, id})
    let admin = updatedAdmin[0]

    try {
      req.session.admin = {
        id: admin.id,
        email: admin.email,
        companyId: admin.company_id,
        firstName: admin.first_name,
        lastName: admin.last_name,
        owner: admin.owner
      }
      res.status(201).send(req.session.admin)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },
  authenticateAdmin: async (req,res)=>{
    let { password} = req.body
    console.log(password)
    const db = req.app.get('db')
    let email = req.session.admin.email
    let foundAdmin = await db.authCtrl.getAdmin({email})
    let admin = foundAdmin[0]
    console.log(admin)
    
    if (!admin) {
      return res.status(401).send('User not found. Please register as a new user before logging in.')
    }

    const isAuthenticated = bcrypt.compareSync(password, admin.hash)
    if (!isAuthenticated){
      return res.status(403).send('Incorrect password')
    }
    console.log('authenticated')
    res.sendStatus(200)
  },
  authenticateUser: async (req,res)=>{
    let { password} = req.body
    const db = req.app.get('db')
    let email = req.session.user.email
    let foundUser = await db.authCtrl.getUser({email})
    let user = foundUser[0]
    
    if (!user) {
      return res.status(401).send('User not found. Please register as a new user before logging in.')
    }

    const isAuthenticated = bcrypt.compareSync(password, user.hash)
    if (!isAuthenticated){
      return res.status(403).send('Incorrect password')
    }
    res.sendStatus(200)
  },
  resetPass: (req, res) => {
    const db = req.app.get('db')
    const {password} = req.body
    let user_id = +req.body.user_id
    // hash and salt the new pass
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    // db resets password to some generic thing here
    db.authCtrl.reset_pass({user_id, hash}).then(result => {
      res.sendStatus(200)
    }).catch(err => res.status(500).send(err))
  }
}