import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from './Slider'

// placeholder code for now until we have something more substantial- jt

//non logged in users will land here. 

//add info about about what the site is in general and what you can do with the site. 

export default class LandingPage extends Component {
    constructor(){
        super()
        this.state = {
            opacity: 0
        }
    }

    componentDidMount = () => {
        this.fadeInColor()
    }

    fadeInColor = () => {
        this.setState({opacity: 100})
    }

    render(){
        let {opacity} = this.state
        return (
            <div className='landingBackFade'>
                <img style={{opacity: opacity}} className='landingBackImg' src="" alt=""/>
                <div className='landing'>
                    <h1 className='landingTitle'>PitchVivid</h1>
                    <h2 className='landingSubtitle'>Hiring made painless.</h2>
                    <Slider/>
                    <div className='landingContent'>
                        <h2 className='landingSec2'>Post. Watch. Hire.</h2>
                        <div className='flexRow'>
                            <h4 className='landingParagraph'>
                                We get it. Recruiting stinks. We're here to save you time and frustration. 
                                With PitchVivid, watch as job candidates give their elevator pitch on why they'd be a good fit for the job. 
                                Avoid awkward interviews by finding personable, qualified applicants <i className='beforeItalic'>before</i> you call them. Hire today. 
                            </h4>
                            <div className='flexColumn'>
                                <Link to='/admin-login'>
                                    <button type='button' className='landingBtn'>Get Started</button>
                                </Link>
                            </div>
                        </div>
                        <div className='flexRow seeJobs'>
                            <h3><i className='beforeItalic'>Looking for a job?</i></h3>
                            <div className='flexColumn'>
                                <Link to='/user-login'>
                                    <button type='button' className='landingBtn landingUserBtn'>See Jobs</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}