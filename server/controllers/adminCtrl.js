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
    let { jobId } = req.params
    jobId = +jobId


    db.adminCtrl.getPosting({jobId}).then((data)=>{
      res.status(200).send(data)
    }).catch(err=>
      res.status(400).send(err)
    )},
  
  //new posting doesn't respond with an updated job list.  Front end will pull the updated list via get request.  
  newPosting:(req,res)=>{
    const db = req.app.get('db')
    console.log(req.session.admin)
    let { id, companyId} = req.session.admin
    id = +id
    companyId = +companyId
    console.log(id, companyId)
    const { details, openingDate, closingDate } = req.body
    db.adminCtrl.newPosting({id, companyId, details, openingDate, closingDate}).then(res=>res.sendStatus(200)).catch(res.sendStatus(400))

  },

  deletePosting: (req,res)=>{
    const db = req.app.get('db')
    let { jobId } = req.params
    jobId = +jobId

    db.adminCtrl.deletePosting({jobId}).then(res=>res.sendStatus(200)).catch(err=>{res.status(400).send(err)})
  },


  //same idea as new posting.  This endpoint doesn't return anything.  Front end will make another query to get updated job list.  

  //UpodatePosting is really robust and can be used for archiving, for changing the assigned admin, or for changing the details of a posting
  updatePosting: (req, res)=>{
    const db = req.app.get('db')
    let{ jobId, details, filled, openingDate, closingDate, archived, newId } =req.body
    jobId = +jobId
    if(!newId){
      newId = +req.session.admin.id
    }
    
    console.log(jobId, details, filled, openingDate, closingDate, archived, newId)
   
    db.adminCtrl.updatePosting({jobId, details, filled, openingDate, closingDate, archived, newId}).then(res=>res.sendStatus(200)).catch(err=>res.status(400).send(err))
  },

  getAdmins: (req,res)=>{
    const db = req.app.get('db')
    let companyId = +req.session.admin.companyId
    
    db.adminCtrl.getAdmins({companyId}).then(data=>res.status(200).send(data)).catch(err=> res.status(400).send(err))
  },


  deleteAdmin: (req,res)=>{
    const db = req.app.get('db')
    let adminId = +req.params.id
    db.adminCtrl.deleteAdmin({adminId}).then(res=>res.status(200)).catch(err=>res.status(400).send(err))
  }

}