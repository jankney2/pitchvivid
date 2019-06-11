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
    let jobId = +req.params.id
    console.log(jobId)
    console.log('getting posting')
    db.adminCtrl.getPosting({jobId}).then((data)=>{
      res.status(200).send(data)
    }).catch(err=>{
      console.log(err)
      res.status(400).send(err)
  })},
  
  //new posting doesn't respond with an updated job list.  Front end will pull the updated list via get request.  
  newPosting:(req,res)=>{
    const db = req.app.get('db')
    console.log(req.session.admin)
    let { id, companyId} = req.session.admin
    id = +id
    companyId = +companyId
    console.log(id, companyId)
    const { details, openingDate, closingDate, jobTitle } = req.body
    db.adminCtrl.newPosting({jobTitle, id, companyId, details, openingDate, closingDate}).then(result=>res.sendStatus(200)).catch(err=>res.status(400).send(err))

  },

  deletePosting: (req,res)=>{
    const db = req.app.get('db')
    let jobId = +req.params.id
    console.log(jobId)

    db.adminCtrl.deletePosting({jobId}).then(result=>res.sendStatus(200)).catch(err=>{res.status(400).send(err)})
  },


  //same idea as new posting.  This endpoint doesn't return anything.  Front end will make another query to get updated job list.  

  //UpodatePosting is really robust and can be used for archiving, for changing the assigned admin, or for changing the details of a posting
  updatePosting: (req, res)=>{
    const db = req.app.get('db')
    let{jobTitle, details, filled, openingDate, closingDate, archived, newId } =req.body
    let {id} = req.params
    id = +id
    // jobId = +jobId
    if(!newId){
      newId = +req.session.admin.id
    }
    
    console.log(id, jobTitle, details, filled, openingDate, closingDate, archived, newId)
   
    db.adminCtrl.updatePosting({id, jobTitle, details, filled, openingDate, closingDate, archived, newId}).then(result=>res.sendStatus(200)).catch(err=> res.status(400).send(err))
  },

  getAdmins: (req,res)=>{
    const db = req.app.get('db')
    let companyId = +req.session.admin.companyId
    
    db.adminCtrl.getAdmins({companyId}).then(data=>res.status(200).send(data)).catch(err=> res.status(400).send(err))
  },


  deleteAdmin: (req,res)=>{
    const db = req.app.get('db')
    let adminId = +req.params.id
    db.adminCtrl.deleteAdmin({adminId}).then(result=>res.sendStatus(200)).catch(err=>res.status(400).send(err))
  },

  getCompanyPostings: (req,res)=>{

    const db = req.app.get('db')
    let companyId = +req.session.admin.companyId
    db.adminCtrl.getCompanyPostings({companyId}).then(data=>{res.status(200).send(data)}).catch(err=>{res.status(400).send(err)})
  },

  reassignPostings: (req, res)=>{
    const db = req.app.get('db')
    let newId = +req.session.admin.id
    let oldId = +req.body.id

    console.log('reassigning:  old: ', oldId, '  new: ', newId)

    db.adminCtrl.reassignPostings({newId, oldId}).then(result => res.sendStatus(200)).catch(err=>res.status(400).send(err))

  },

  getAdminKey: (req, res)=>{
    const db = req.app.get('db')
    let id = +req.session.admin.companyId
    db.adminCtrl.getAdminKey({id}).then(data=>{res.status(200).send(data)}).catch(err=>{console.log(err)
    res.status(400).send(err)
    })

  },

  makeOwner: (req, res)=> {
    const db = req.app.get('db')
    const {id} = req.params
    let adminId = +req.session.admin.id
    db.adminCtrl.makeOwner([id, adminId]).then(data => {
      res.sendStatus(200)
    }).catch(err=> {
      console.log(`There was an error updating ownership: ${err}`)
      res.sendStatus(500)
    })
  },

  newCompany: async (req, res) => {
    const db = req.app.get('db')
    const {companyName, adminKey} = req.body
    let companyArr = await db.adminCtrl.newCompany({companyName, adminKey})
    if (!companyArr[0]){
      res.sendStatus(500)
    } else {
      res.sendStatus(201)
    }
  }
}