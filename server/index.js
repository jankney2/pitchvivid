require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const massive = require('massive')
const adminNotesCtrl = require('./controllers/adminNotesCtrl')
const annoyCtrl = require('./controllers/annoyCtrl')
const authCtrl = require('./controllers/authCtrl')
const adminCtrl = require('./controllers/adminCtrl')
const blockCtrl = require('./controllers/blockCtrl')
const userCtrl = require('./controllers/userCtrl')
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

const aws = require('aws-sdk')


app.use(express.json())

// Initiate user session
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))



//aws 


app.get('/sign-s3', (req, res) => {
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }

  const s3 = new aws.S3()
  const filename = req.query['file-name']
  const fileType = req.query['file-type']
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: filename,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  }

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err)
      return res.end()
    }
    const returnData = {
      signedRequest: data,
      url: `https://s3-us-west-1.amazonaws.com/${S3_BUCKET}/${filename}`
    }
    return res.send(returnData)
  })
})




// Connect server to database
massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => {
    console.log('Listening on port:', SERVER_PORT)
  })
})

// auth
app.post('/auth/registerUser', authCtrl.registerUser)
app.post('/auth/registerAdmin', authCtrl.registerAdmin)
app.post('/auth/loginUser', authCtrl.loginUser)
app.post('/auth/loginAdmin', authCtrl.loginAdmin)
app.delete('/auth/logout', authCtrl.logout)
app.put('/auth/updateUser', authCtrl.updateUser)
app.put('/auth/updateAdmin', authCtrl.updateAdmin)
app.get('/api/session', authCtrl.checkForSession)

// jobs
app.get('/api/postings/company', adminCtrl.getCompanyPostings)
app.get('/api/postings/admin', adminCtrl.getAdminPostings)
app.get('/api/postings/:id', adminCtrl.getPosting)
app.post('/api/postings/new', adminCtrl.newPosting)
app.delete('/api/postings/:id', adminCtrl.deletePosting)
app.put('/api/postings/:id', adminCtrl.updatePosting)
app.put('/api/posts/all', adminCtrl.reassignPostings)

// // admins
app.get('/api/admins', adminCtrl.getAdmins)
app.delete('/api/admins/:id', adminCtrl.deleteAdmin)
app.get('/api/admins/key', adminCtrl.getAdminKey)

// videos
app.get('/api/userVideos', userCtrl.getAllVideos)
app.get('/api/userVideos/:job_id', userCtrl.getVideo)
app.delete('/api/userVideos/:job_id', userCtrl.deleteVideo)
app.put('/api/userVideos', userCtrl.updateVideo)
app.post('/api/userVideos', userCtrl.newVideo)

// admin notes
app.get('/api/adminnotes/getAll/:job_id', adminNotesCtrl.getAll)
app.get('/api/adminnotes/liked/:job_id', adminNotesCtrl.getLiked)
app.get('/api/adminnotes/:admin_notes_id', adminNotesCtrl.getNote)
app.post('/api/adminnotes', adminNotesCtrl.newUpdateNote)
app.delete('/api/adminnotes/:admin_notes_id', adminNotesCtrl.deleteNote)

// annoying users
app.get('/api/annoy', annoyCtrl.getAll)
app.get('/api/annoy/:id', annoyCtrl.getAnnoyUser)
app.post('/api/annoy', annoyCtrl.newAnnoyUser)
app.delete('/api/annoy/:id', annoyCtrl.deleteAnnoyUser)

// block users
app.post('/api/block', blockCtrl.blockUser)