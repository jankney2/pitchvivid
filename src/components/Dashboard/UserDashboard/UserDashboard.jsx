// functionality needed: 

// function to grab job listings
// route to video component to record video

//make a button that links to video component 

//did mount that loads the listings

// location to put the listings that are loaded from the didMount

// render `welcome name` of the user

// 



import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import {updateUser} from '../../../redux/reducer'
import { connect } from 'react-redux'


class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            email: props.email,
            jobApps: [],
            search: ''
        }

    }

    componentDidMount() {
        console.log(this.props)
        //axios get to get all the jobs posts they have
    }

    
    searchChange =(value) => {
        this.setState({search:value})
    }

    render() {
        const jobApps = this.state.jobApps.filter((element) => { 
            return element.job_title.includes(this.state.search)
        }).map((element, index)=> { 
            return <span>
                <div className='job-title'>{element.job_title}</div>
                <div className='job-company'>{element.company_name}</div>
                <div className='job-closing'>{element.closing_date}</div>
                {/* <div className='job-filled'>{element.job_filled}</div> */}



            </span>
        })

        // be able to filter through job titles and then render a div that has the title and the company name next to it with the date posted. Once you clikc ont he title, you then get routed to the post page that then has all the details with the ability to click and add a recording to the post. 

        return (
            <>
                <div className='userdash-view'>
                   <div className='dash-header'></div>
                   {/* <div className='dash-left'></div> */}

                    <h1>{`Welcome ${this.state.firstName}, to PitchVivid!`}</h1>
                  <input placeholder='search for job posting' onChange={e => this.searchChange(e.target.value)} /> 
                  <h1>Job Applications</h1> 
                   <div className='job-listing'></div>

                    

                </div>

            </>
        )
    }


}


const mapStateToProps = state => {
    return {
        ...state
    }
}


export default connect(mapStateToProps)(withRouter(UserDashboard))