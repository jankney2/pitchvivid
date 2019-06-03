module.exports={
  getAdminPostings: (req,res)=>{
    const db = req.app.get('db')
    let { adminId } = req.session.admin
    admin_id = +admin_id
    db.adminCtrl.getAdminPostings({adminId}).then((data)=>{
      res.status(200).send(data)
    }).catch(res.sendStatus(400))

  },

  getPosting:(req, res)=>{
    const db = req.app.get('db')
    let { adminId } = req.session.admin
    let { jobId } = req.params
    adminId = +adminId
    jobId = +jobId


    db.adminCtrl.getPosting({adminId, jobId}).then((data)=>{
      res.status(200).send(data)
    }).catch(res.sendStatus(400))
  },
  
  //new posting doesn't respond with an updated job list.  Front end will pull the updated list via get request.  
  newPosting:(req,res)=>{
    const db = req.app.get('db')
    let { adminId, companyId} = req.session.admin
    adminId = +adminId
    companyId = +companyId
    const { details, openingDate, closingDate } = req.body
    db.adminCtrl.newPosting({adminId, companyId, details, openingDate, closingDate}).then(res.sendStatus(200)).catch(res.sendStatus(400))

  }


}