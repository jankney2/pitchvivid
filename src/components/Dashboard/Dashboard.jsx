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
            user: true,
            admin: false,
            owner: false
        }
    }

    async componentDidMount() {
        // Dashboard component will need to grab session first

        // const session = await axios.get('/auth/session') 
        // if(session) {
            // await this.props.updateUser(session.data)
        // } else {
            // this.props.history.push('/')
        // } 
        if(this.props.owner){
            this.setState({
                owner: true
            })
        }
        if(this.props.companyId) {
           this.setState({
               admin: true
           }) 
        }
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
                {
                    this.state.owner ? 
                    <h1>This is the owner dashboard</h1> : 
                    this.state.admin ? 
                    <h1>This is the admin dashboard</h1> :
                    <h1>This is the user dashboard</h1> 
                }
            </div>
        )
    }
}

// pulling everything I think I could possibly need from redux for now- 6/4 JT
const mapStateToProps=state=> {
    const {companyId, email, owner, id, firstName, lastName} = state
    return {
        companyId, 
        firstName,
        lastName,
        email, 
        owner, 
        id
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard))