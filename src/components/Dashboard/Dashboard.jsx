// after you log in and register you land here. 

// contain list of jobs/ create new job, and see applicants/ have different functions if you are admin, or applicant.

//conditional rendering that checks if you are an admin. 

import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'
import UserDashboard from './UserDashboard/UserDashboard'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import Nav from './../Nav/Nav'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            user: false,
            admin: false
        }
    }

    async componentDidMount() {
        // Dashboard component will need to grab session first

        const session = await axios.get('/api/session') 
        try {
            console.log(session)
            session.data.admin ? 
            await this.props.updateUser(session.data.admin) :
            await this.props.updateUser(session.data.user)
        } catch {
            this.props.history.push('/')
        }

        if(this.props.companyId) {
           this.setState({
               admin: true
           }) 
        } else {
            this.setState ({
                user: true
            })
        } 
        
        // at this point, we would grab the job postings, applicants for
        // those job postings, and various bits of company info
    }

    render() {
        return (
            <div className='dashboardContainer'>
                {/* <Nav /> */}
                {
                    this.state.admin ? 
                        <AdminDashboard />  :
                        this.state.user ?
                            <UserDashboard /> :
                            <> </>
                }
            </div>
    )
    }
}

// pulling everything I think I could possibly need from redux for now- 6/4 JT
const mapStateToProps=state=> {
    const {companyId, email, id, firstName, lastName} = state
    return {
        companyId, 
        firstName,
        lastName,
        email,  
        id
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard))