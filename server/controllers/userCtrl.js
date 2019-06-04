module.exports = {
  getUserJobs: async (req, res) => {
    let user_id = req.session.user.id
    const db = req.app.get('db')

    let userJobs = await db.userCtrl.getUserJobs({user_id})

    try {
      res.status(201).send(userJobs)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  getUserJob: async (req, res) => {
    let user_id = req.session.user.id
    let job_id = req.params.id
    const db = req.app.get('db')
    
    let userJobArr = await db.userCtrl.getUserJob({user_id, job_id})
    let userJob = userJobArr[0]

    try {
      res.status(201).send(userJob)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  deleteUserJob: async (req, res) => {
    let user_id = req.session.user.id
    let job_id = req.params.id
    const db = req.app.get('db')

    await db.userCtrl.deleteUserJob({user_id, job_id})

    let userJobArr = await db.userCtrl.getUserJob({user_id, job_id})
    let userJob = userJobArr[0]

    try {
      if(!userJob){
        res.sendStatus(200)
      } 
    }
    catch {
      res.status(500).send('Internal server error')
    }
  }
}