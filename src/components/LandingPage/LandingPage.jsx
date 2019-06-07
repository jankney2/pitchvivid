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
                    <h2>Find the right applicant.</h2>
                    <p className='landingParagraph'>We get it. Hiring is a painful process. We're here to save you time and frustrutation. With PitchVivid, watch videos of job candidates explain why they'd be a good fit. Avoid awkward interviews by finding personable applicants before you call them. Save time and frustation without paying a penny.</p>
                    {/* <Link to='/record'>Click here for the RecordVideo component</Link>
                    <Link to='/about'>Click here for the About component</Link>
                    <Link to='/user-login'>User Login</Link>
                    <Link to='/admin-login'>Administrator Login</Link>
                    <Link to='/register'>Register</Link> */}
                </div>
            </div>
        </div>
    )
}