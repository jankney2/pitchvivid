module.exports = {
  getAll: async (req, res) => {
    let admin_id = req.session.admin.id
    const db = req.app.get('db')

    let annoyUsersArr = await db.annoyCtrl.getAll({admin_id})

    try {
      res.status(201).send(annoyUsersArr)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  }
}