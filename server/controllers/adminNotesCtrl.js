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

    let likedVideos = await db.adminNotesCtrl.getAll({job_id})

    try {
      res.status(201).send(likedVideos)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  }
}