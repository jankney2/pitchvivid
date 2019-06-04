require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const massive = require('massive')
const adminNotesCtrl = require('./controllers/adminNotesCtrl')
const authCtrl = require('./controllers/authCtrl')
const adminCtrl = require('./controllers/adminCtrl')
const userCtrl = require('./controllers/userCtrl')
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env

app.use(express.json())

// Initiate user session
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

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

// jobs
app.get('/api/postings/company', adminCtrl.getCompanyPostings)
app.get('/api/postings/admin', adminCtrl.getAdminPostings)
app.get('/api/postings/:id', adminCtrl.getPosting)
app.post('/api/postings/new', adminCtrl.newPosting)
app.delete('/api/postings/:id', adminCtrl.deletePosting)
app.put('/api/postings', adminCtrl.updatePosting)

// // admins
app.get('/api/admins', adminCtrl.getAdmins)
app.delete('/api/admins/:id', adminCtrl.deleteAdmin)

// videos
app.get('/api/userVideos', userCtrl.getAllVideos)
app.get('/api/userVideos/:job_id', userCtrl.getVideo)
app.delete('/api/userVideos/:job_id', userCtrl.deleteVideo)
app.put('/api/userVideos', userCtrl.updateVideo)
app.post('/api/userVideos', userCtrl.newVideo)

// admin notes
app.get('/api/adminnotes/liked/:job_id', adminNotesCtrl.getLiked)
app.get('/api/adminnotes/:job_id', adminNotesCtrl.getAll)
// get single video
// look up by user name
// create notes
// update notes
// delete notes
// filter out disliked


