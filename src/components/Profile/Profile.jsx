import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'
import AdminProfile from './AdminProfile/AdminProfile'
import UserProfile from './UserProfile/UserProfile'
import Nav from '../Nav/Nav'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: false,
            admin: false
        }
    }

    async componentDidMount() {
        // Dashboard component will need to grab session first
        console.log('hitting profile')
        const session = await axios.get('/api/session') 
        try {
            session.data.admin ? 
            await this.props.updateUser(session.data.admin) :
            await this.props.updateUser(session.data.user)
            
        } catch {
            this.props.history.push('/')
        }

        if(this.props.companyId) {
           console.log('is admin')
            this.setState({
               admin: true
           }) 
        } else {
            console.log('is user')
            this.setState ({
                user: true
            })
        } 
        
        // at this point, we would grab the job postings, applicants for
        // those job postings, and various bits of company info
    }

    render() {

        return (
            <div className='profile-Container'>
                {/* <Nav /> */}
                {   
                    this.state.admin ? 
                     <AdminProfile />  :
                    this.state.user ?
                   <UserProfile /> :
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))