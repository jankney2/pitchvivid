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
                <h2 className='landingSubtitle'>Hiring made painless.</h2>
                <Slider/>
                <div className='landingContent'>
                    <h2>Post. Watch. Hire.</h2>
                    <div className='flexRow'>
                        <h4 className='landingParagraph'>
                            We get it. Recruiting stinks. We're here to save you time and frustration. 
                            With PitchVivid, watch as job candidates give their elevator pitch on why they'd be a good fit for the job. 
                            Avoid awkward interviews by finding personable, qualified applicants <i>before</i> you call them. Hire today. 
                        </h4>
                        <div className='flexColumn'>
                            <Link to='/admin-login'>
                                <button type='button' className='btn btn-lg landingBtn'>Get Started</button>
                            </Link>
                        </div>
                    </div>
                    <div className='flexRow'>
                        <h3><i>Looking for a job?</i></h3>
                        <div className='flexColumn'>
                            <Link to='/user-login'>
                                <button type='button' className='btn landingBtn landingUserBtn'>See Jobs</button>
                            </Link>
                        </div>
                    </div>
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