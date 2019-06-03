module.exports={
  getAdminPostings: (req,res)=>{
    console.log('getting admin postings')
    const db = req.app.get('db')
    let { id } = req.session.admin
    id = +id
    db.adminCtrl.getAdminPostings({id}).then((data)=>{
      res.status(200).send(data)
    }).catch(err=>{
      console.log(err)
      res.sendStatus(400)})

  },

  getPosting:(req, res)=>{
    const db = req.app.get('db')
    let { id } = req.session.admin
    let { jobId } = req.params
    adminId = +adminId
    jobId = +jobId


    db.adminCtrl.getPosting({id, jobId}).then((data)=>{
      console.log(data)
      res.status(200).send(data)
    }).catch(err=>
      console.log(err))
      res.sendStatus(400)
  },
  
  //new posting doesn't respond with an updated job list.  Front end will pull the updated list via get request.  
  newPosting:(req,res)=>{
    const db = req.app.get('db')
    console.log(req.session.admin)
    let { id, companyId} = req.session.admin
    id = +id
    companyId = +companyId
    console.log(id, companyId)
    const { details, openingDate, closingDate } = req.body
    db.adminCtrl.newPosting({id, companyId, details, openingDate, closingDate}).then(res.sendStatus(200)).catch(res.sendStatus(400))

  }


}