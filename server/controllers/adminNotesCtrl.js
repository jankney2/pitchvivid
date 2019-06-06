module.exports = {
  getLiked: async (req, res) => {
    let {job_id} = req.params
    const db = req.app.get('db')

    try {
      let likedVideos = await db.adminNotesCtrl.getLiked({job_id})
      res.status(201).send(likedVideos)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  getAll: async (req, res) => {
    let admin_id = req.session.admin.id
    let {job_id} = req.params
    const db = req.app.get('db')

    try {
      let allAdminNotes = await db.adminNotesCtrl.getAll({job_id, admin_id})
      res.status(201).send(allAdminNotes)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  getNote: async (req, res) => {
    let {admin_notes_id} = req.params
    const db = req.app.get('db')

    try {
      let noteArr = await db.adminNotesCtrl.getNote({admin_notes_id})
      let note = noteArr[0]
      res.status(201).send(note)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  newAdminNote: async (req, res) => {
    let {job_id, user_id, disliked, liked, notes} = req.body
    const db = req.app.get('db')

    try {
      let noteArr = await db.adminNotesCtrl.newAdminNote({job_id, user_id, disliked, liked, notes})
      let note = noteArr[0]
      res.status(201).send(note)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  updateNote: async (req, res) => {
    let {id, disliked, liked, notes} = req.body
    const db = req.app.get('db')

    try {
      let noteArr = await db.adminNotesCtrl.updateNote({id, disliked, liked, notes})
      let note = noteArr[0]
      res.status(201).send(note)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  deleteNote: async (req, res) => {
    let {admin_notes_id} = req.params
    const db = req.app.get('db')

    try {
      await db.adminNotesCtrl.deleteNote({admin_notes_id})
      res.sendStatus(200)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  }
}