module.exports = {
  getLiked: async (req, res) => {
    let {job_id} = req.params
    const db = req.app.get('db')

    let likedVideos = await db.adminNotesCtrl.getLiked({job_id})

    try {
      res.status(201).send(likedVideos)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  getAll: async (req, res) => {
    let {job_id} = req.params
    const db = req.app.get('db')

    let allAdminNotes = await db.adminNotesCtrl.getAll({job_id})

    try {
      res.status(201).send(allAdminNotes)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  getNote: async (req, res) => {
    let {job_id, user_id} = req.params
    const db = req.app.get('db')

    let noteArr = await db.adminNotesCtrl.getNote({job_id, user_id})

    try {
      res.status(201).send(noteArr)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  }
}