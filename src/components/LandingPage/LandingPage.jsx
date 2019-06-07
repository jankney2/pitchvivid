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
                <Slider/>
                <div className='landingContent'>
                    <h1>PitchVivid</h1>
                    <h3>Find the right applicant.</h3>
                    <Link to='/user-login'>User Login</Link>
                    <Link to='/admin-login'>Administrator Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            </div>
        </div>
    )
}