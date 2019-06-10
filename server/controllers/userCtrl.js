module.exports = {
  getAllVideos: async (req, res) => {
    let user_id = req.session.user.id
    const db = req.app.get('db')

    let userJobs = await db.userCtrl.getAllVideos({user_id})

    try {
      res.status(201).send(userJobs)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  getVideo: async (req, res) => {
   
    
    
    let user_id = req.session.user.id
    let {job_id} = req.params
   
    
    const db = req.app.get('db')


    
    let userJobArr = await db.userCtrl.getVideo({user_id, job_id})
    let userJob = userJobArr[0]
    console.log(userJob)

    try {
      res.status(201).send(userJob)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  deleteVideo: async (req, res) => {
    let user_id = req.session.user.id
    let {job_id} = req.params
    const db = req.app.get('db')

    await db.userCtrl.deleteVideo({user_id, job_id})

    let userJobArr = await db.userCtrl.getVideo({user_id, job_id})
    let userJob = userJobArr[0]

    try {
      if(!userJob){
        res.sendStatus(200)
      } 
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },



  uploadResume: async (req, res) => { 
    console.log('this is the session', req.session)
    let user_id = req.session.user.id
    console.log('this is the user', user_id)
    const {url} = req.body
    const db = req.app.get('db')
    console.log('this is the url', url)
    let resume = await db.userCtrl.uploadResume({user_id, resume: url})
    console.log(resume)
    let resumeLink = resume[0]
    
    try {
      res.status(200).send(resumeLink)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  updateVideo: async (req, res) => {
    let user_id = req.session.user.id
    let {job_id, video_url} = req.body
    const db = req.app.get('db')

    let userJobArr = await db.userCtrl.updateVideo({user_id, job_id, video_url})
    let userJob = userJobArr[0]

    try {
      res.status(200).send(userJob)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  newVideo: async (req, res) => {
    let user_id = req.session.user.id
    let {job_id, video_url} = req.body
    const db = req.app.get('db')

    let userJobArr = await db.userCtrl.newVideo({user_id, job_id, video_url})
    let userJob = userJobArr[0]

    try {
      res.status(200).send(userJob)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  }
}