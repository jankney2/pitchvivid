module.exports = {
  getLiked: async (req, res) => {
    let admin_id = req.session.admin.id
    let {job_id} = req.params
    const db = req.app.get('db')

    let likedVideos = await db.userCtrl.getLiked({admin_id})

    try {
      res.status(201).send(userJobs)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  }
}