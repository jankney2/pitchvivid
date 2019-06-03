require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const massive = require('massive')
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
app.get('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.put('/auth/updateUser', authCtrl.updateUser)
app.put('/auth/updateAdmin', authCtrl.updateAdmin)

// jobs
app.get('/api/postings/all', adminCtrl.getPostings)
app.get('/api/postings/:id', adminCtrl.getPosting)
app.post('/api/postings/new', adminCtrl.newPosting)
app.delete('/api/postings/:id', adminCtrl.deletePosting)
app.put('/api/postings/:id', adminCtrl.updatePosting)
app.post('/api/postings/archive', adminCtrl.archivePosting)

// admins
app.get('/api/admins/:id', adminCtrl.getAdmins)
app.post('/api/admins/new', adminCtrl.newAdmin)
app.delete('/api/admins/:id', adminCtrl.deleteAdmin)
app.put('/api/admins/:id', adminCtrl.updateAdmin)

// users
// app.get()