import React from 'react'
import {Link} from 'react-router-dom'
import Slider from './Slider'

// placeholder code for now until we have something more substantial- jt

//non logged in users will land here. 

//add info about about what the site is in general and what you can do with the site. 

export default function LandingPage() {
    return (
        <div className='landingBack'>
            <div className='landing'>
                <h1 className='landingTitle'>PitchVivid</h1>
                <Slider/>
                <div className='landingContent'>
                    <h3>Find the right applicant.</h3>
                    <Link to='/record'>Click here for the RecordVideo component</Link>
                    <Link to='/about'>Click here for the About component</Link>
                    <Link to='/user-login'>User Login</Link>
                    <Link to='/admin-login'>Administrator Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            </div>
        </div>
    )
}