import React from 'react'
import {Link} from 'react-router-dom'

// placeholder code for now until we have something more substantial- jt

export default function LandingPage() {
    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <h1>Landing Page here</h1>
            <Link to='/record'>Click here for the RecordVideo component</Link>
            <Link to='/about'>Click here for the About component</Link>
        </div>
    )
}