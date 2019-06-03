import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import RecordVideo from './components/RecordVideo/RecordVideo'
import About from './components/About/About'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

export default (
    <Switch>
        <Route exact path ='/' component={LandingPage} />
        <Route path='/record' component={RecordVideo} />
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} /> 
        <Route path='/register' component={Register} /> 
    </Switch>
)

