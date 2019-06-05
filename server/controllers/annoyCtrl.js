module.exports = {
  getAll: async (req, res) => {
    let admin_id = req.session.admin.id
    const db = req.app.get('db')

    try {
      let annoyUsersArr = await db.annoyCtrl.getAll({admin_id})
      res.status(201).send(annoyUsersArr)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  getAnnoyUser: async (req, res) => {
    let {id} = req.params
    let admin_id = req.session.admin.id
    const db = req.app.get('db')

    try {
      let annoyUsersArr = await db.annoyCtrl.getAnnoyUser({id, admin_id})
      let annoyUser = annoyUsersArr[0]
      res.status(201).send(annoyUser)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  newAnnoyUser: async (req, res) => {
    let admin_id = req.session.admin.id
    let {user_id} = req.body
    const db = req.app.get('db')

    try {
      let annoyUserArr = await db.annoyCtrl.newAnnoyUser({admin_id, user_id})
      let annoyUser = annoyUserArr[0]
      res.status(201).send(annoyUser)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  deleteAnnoyUser: async (req, res) => {
    let {id} = req.params
    let admin_id = req.session.admin.id
    const db = req.app.get('db')

    try {
      await db.annoyCtrl.deleteAnnoyUser({id, admin_id})
      res.sendStatus(200)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  }
}