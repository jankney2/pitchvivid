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
            allJobs:[],
            appliedJobSearch: '',
            allJobSearch:''
        }

    }

    async componentDidMount() {
        console.log(this.props)
       await axios.get('/api/userVideos').then(res => { 
            this.setState({
                jobApps:res.data
            })
            console.log(res.data)
        })
    }

    
    searchChange =(name,value) => {
        this.setState({[name]:value})
    }

    render() {
       //search and render for the applied jobs

        const appliedJobApps = this.state.jobApps.filter((element) => { 
            return element.job_title.toLowerCase().includes(this.state.appliedJobSearch.toLowerCase()) || element.name.toLowerCase().includes(this.state.appliedJobSearch.toLowerCase())
        }).map((element, index)=> { 
            return <Link to={`/jobpost/${element.id}`} key={index}>
            <span className = 'job-span'>
                <div className='job-title'>{element.job_title}</div>
                <div className='job-company'>{element.name}</div>
                <div className='job-opening'>{element.opening_date}</div>
            </span>
            </Link>
        })




        const allJobs = this.state.allJobs.filter((element) => { 
            return element.job_title.toLowerCase().includes(this.state.allJobSearch.toLowerCase()) || element.name.toLowerCase().includes(this.state.allJobSearch.toLowerCase())
        }).map((element, index)=> { 
            return <Link to={`/jobpost/${element.id}`} key={index}>
            <span className = 'job-span'>
                <div className='job-title'>{element.job_title}</div>
                <div className='job-company'>{element.name}</div>
                <div className='job-opening'>{element.opening_date}</div>
            </span>
            </Link>
        })


        
        return (
            <>
                <div className='userdash-view'>
               
               


                    <h1>{`Welcome ${this.state.firstName}, to PitchVivid!`}</h1>
                    <h1>Job Applications</h1>
                    <div className='job-listing'>
                        <div className='appliedJobApps-container'>
                            <input className='search' placeholder='search for job posting' onChange={e => this.searchChange('appliedJobSearch',e.target.value)} />

                            {appliedJobApps}


                            {

                                <> </>
                            }
                        </div>

                        <div className='allJobs-container'>
                            <input className='search' placeholder='search for job posting' onChange={e => this.searchChange('allJobSearch',e.target.value)} />

                            {/* {allJobs} */}


                            {

                                <> </>
                            }
                        </div>
                    </div>



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