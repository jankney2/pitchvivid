import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import RecordVideo from './components/RecordVideo/RecordVideo'
import About from './components/About/About'
import UserLogin from './components/UserLogin/UserLogin'
import AdminLogin from './components/AdminLogin/AdminLogin'
import Register from './components/Register/Register'
import RegisterCompany from './components/RegisterCompany/RegisterCompany'
import Dashboard from './components/Dashboard/Dashboard'

export default (
    <Switch>
        <Route exact path ='/' component={LandingPage} />
        <Route path='/record' component={RecordVideo} />
        <Route path='/about' component={About} />
        <Route path='/user-login' component={UserLogin} /> 
        <Route path='/admin-login' component={AdminLogin} />
        <Route path='/register' component={Register} /> 
        <Route path='/company-register' component={RegisterCompany} />
        <Route path='/dashboard' component={Dashboard} />
    </Switch>
)

