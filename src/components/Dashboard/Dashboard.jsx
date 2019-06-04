// after you log in and register you land here. 

// contain list of jobs/ create new job, and see applicants/ have different functions if you are admin, or applicant.

//conditional rendering that checks if you are an admin. 

import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            placeholder: ''
        }
    }

    async componentDidMount() {
        // Dashboard component will need to grab session first

        // const session = axios.get('/auth/session') 
        // if(session) {
            // await this.props.updateUser(session.data)
        // } else {
            // route to login screen
        // } 
        // if(!this.props.companyid) {
            // route to login
        // }
        // at this point, we would grab the job postings, applicants for
        // those job postings, and various bits of company info
    }

    // function to grab applicants
    // function to grab company info
    
    // function to grab job listings
    // function to add job listing
    // function to edit job listing
    // function to delete job listing

    // function to view application for job listing
    // function to contact applicant for follow-up interview

    render() {
        return (
            <div className='dashboardContainer'>
                <h1>This is the dashboard component</h1>
                <h3>It's connected to redux, and fires off a ton of different axios requests</h3>
                <h6>This will likely be the heaviest component in the app</h6>
            </div>
        )
    }
}

// pulling everything I think I could possibly need from redux for now- 6/4 JT
const mapStateToProps=state=> {
    const {companyid, email, owner, id} = state
    return {
        companyid, 
        email, 
        owner, 
        id
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard))