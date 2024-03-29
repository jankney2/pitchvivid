import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
// import RecordVideo from './components/RecordVideo/RecordVideo'
import JobPost from './components/JobPost/JobPost'
import About from './components/About/About'
import UserLogin from './components/UserLogin/UserLogin'
import AdminLogin from './components/AdminLogin/AdminLogin'
import Register from './components/Register/Register'
import RegisterCompany from './components/RegisterCompany/RegisterCompany'
import Dashboard from './components/Dashboard/Dashboard'
import AdminJobPost from './components/AdminJobPost/AdminJobPost'
import Profile from './components/Profile/Profile'
import ResetPasswordRequest from './components/ResetPassword/Request/ResetPasswordRequest'
import ReturnLink from './components/ResetPassword/ReturnLink/ReturnLink'

export default (
    <Switch>
        <Route exact path ='/' component={LandingPage} />
        {/* <Route path='/record/:job_id' component={RecordVideo} /> */}
        <Route path='/jobpost/:job_id' component={JobPost} />
        <Route path='/about' component={About} />
        <Route path='/user-login' component={UserLogin} /> 
        <Route path='/admin-login' component={AdminLogin} />
        <Route exact path='/register' component={Register} /> 
        <Route path='/register/:adminKey' component={Register} /> 
        <Route path='/company-register' component={RegisterCompany} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/post/admin-view/:id' component={AdminJobPost} />
        <Route path ='/profile' component={Profile}/>
        <Route path='/password-reset' component={ResetPasswordRequest} />
        <Route path='/return-pass/:id' component={ReturnLink} /> 
    </Switch>
)

