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
            allJobs: [],
            appliedJobSearch: '',
            allJobSearch: '',
            
        }

    }

    async componentDidMount() {
        console.log(this.props)
        await axios.get('/api/userVideos').then(res => {
            this.setState({
                jobApps: res.data
            })
            console.log(res.data)
        })

        await axios.get('api/openpostings').then(res => {
            console.log(res.data)
            this.setState({
                allJobs: res.data
            })
        })
    }


    searchChange = (name, value) => {
        this.setState({ [name]: value })
    }

    render() {
        //search and render for the applied jobs

        const appliedJobApps = this.state.jobApps.filter((element) => {
            return element.job_title.toLowerCase().includes(this.state.appliedJobSearch.toLowerCase()) || element.name.toLowerCase().includes(this.state.appliedJobSearch.toLowerCase())
        }).map((element, index) => {
            return <Link to={`/jobpost/${element.id}`} key={index}>
                <span className='job-span'>
                    <div className='job-title'>{element.job_title}</div>
                    <div className='job-company'>{element.name}</div>
                    <div className='job-opening'>{element.opening_date}</div>
                </span>
            </Link>
        })




        const allJobs = this.state.allJobs.filter((ele) => {
            return ele.job_title.toLowerCase().includes(this.state.allJobSearch.toLowerCase()) || ele.name.toLowerCase().includes(this.state.allJobSearch.toLowerCase())
        }).map((ele, index) => {
            return <Link to={`/jobpost/${ele.id}`} key={index}>
                <span className='job-span'>
                    <div className='job-title'>{ele.job_title}</div>
                    <div className='job-company'>{ele.name}</div>
                    <div className='job-opening'>{ele.opening_date}</div>
                </span>
            </Link>
        })



        return (
            <div className='userdash-view'>
                <div className='userDashHeader'>
                    <h1>{`Welcome to PitchVivid, ${this.state.firstName} `}</h1>
                    <h1>Your Dashboard</h1>
                </div>
                <div className='userDashContent'>
                    <div className='appliedJobApps-container'>
                        <span className='userDashHeaderSpan'>
                            <h1>All Jobs</h1>
                        </span>
                        <span className='searchSpan'>
                            <input className='appliedJobSearch' placeholder='Search All Your Applications' onChange={e => this.searchChange('appliedJobSearch', e.target.value)} />
                        </span>
                        <span className='jobMapSpan'>
                            {appliedJobApps}
                        </span>
                    </div>
                    <div className='allJobs-container'>
                        <span className='userDashHeaderSpan'>
                            <h1>Your Applications</h1>
                        </span>
                        <span className='searchSpan'>
                            <input className='allJobSearch' placeholder='Search All Jobs' onChange={e => this.searchChange('allJobSearch', e.target.value)} />
                        </span>
                        <span className='allJobMapSpan'>
                            {allJobs}
                        </span>
                    </div>
                </div>
            </div>
        )
    }


}


const mapStateToProps = state => {
    return {
        ...state
    }
}


export default connect(mapStateToProps)(withRouter(UserDashboard))