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

    async componentDidMount() {
        console.log(this.props)
       await axios.get('/api/userVideos').then(res => { 
            this.setState({
                jobApps:res.data
            })
            console.log(res.data)
        })
    }

    
    searchChange =(value) => {
        this.setState({search:value})
    }

    render() {
        // const concatString = this.state.jobApps.concat()
        // console.log(concatString)
        const jobApps = this.state.jobApps.filter((element) => { 
            return element.job_title.toLowerCase().includes(this.state.search.toLowerCase()) || element.name.toLowerCase().includes(this.state.search.toLowerCase())
        }).map((element, index)=> { 
            return <Link to={`/jobpost/${element.id}`} key={index}>
            <span className = 'job-span'>
                <div className='job-title'>{element.job_title}</div>
                <div className='job-company'>{element.name}</div>
                <div className='job-closing'>{element.closing_date}</div>
            </span>
            </Link>22
        })

        // be able to filter through job titles and then render a div that has the title and the company name next to it with the date posted. Once you clikc ont he title, you then get routed to the post page that then has all the details with the ability to click and add a recording to the post. 

        return (
            <>
                <div className='userdash-view'>
               
               


                    <h1>{`Welcome ${this.state.firstName}, to PitchVivid!`}</h1>
                    <h1>Job Applications</h1>
                    <div className='job-listing'>
                        <div className='jobApps-container'>
                            <input className='search' placeholder='search for job posting' onChange={e => this.searchChange(e.target.value)} />

                            {jobApps}


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