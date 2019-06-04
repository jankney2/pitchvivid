import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'

class AdminDashboard extends Component {
    constructor() {
        super()
        this.state = {
            companyInfoPlaceholder: [],
            jobListings: [],
            administrators: []
        }
    }
            
    async componentDidMount() {
    // grab session if there is one- if not, push to login ~~~~~~~~~~
        // const session = await axios.get('/auth/session') 
        // if(session) {
            // await this.props.updateUser(session.data)
            // } else {
                // this.props.history.push('/')
            // }

    // if(!this.props.companyId)
        // this.props.history.push('/login)
      
    // else if(this.props.companyId): ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     
        // this.getListings() gets the admin's job listings
    
    // else if(this.props.owner): ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         // this.getAllListings() gets the company's job listings 
         // this.getAdmins() gets the company's admins
            
    // function to grab company info
        // nothing yet
    }

    // admin functionality ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
    getListings=async ()=> {
        const listings = await axios.get('/api/postings/admin')
        this.setState ({
            jobListings: listings.data
        })
    }              
    addJob=()=> {
        axios.post('/api/postings/new').then(res => {
            this.props.owner ? 
            await this.getAllListings() :
            await this.getListings()
        })
    }
    updateJob=async (id)=> {
        axios.put(`/api/postings/${id}`).then(res => {
            this.props.owner ? 
            await this.getAllListings() :
            await this.getListings()
        })
    }
    deleteJob=async (id)=> {
        axios.delete(`/api/postings/${id}`).then(res => {
            this.props.owner ? 
            await this.getAllListings() :
            await this.getListings()
        })
    }
    // function to view application for job listing
        // nothing yet
    // function to contact applicant for follow-up interview
        // nothing yet


    // owner functionality ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   
    getAllListings=async ()=> {
        const listings = await axios.get('/api/postings/company')
        this.setState ({
            jobListings: listings.data
        })
    }
    getAdmins=async ()=> {
        const admins = await axios.get(`/api/admins/${companyId}`)
        this.setState ({
            administrators: admins.data
        })
    }
    deleteAdmin=async (id)=> {
        axios.delete(`/api/admins/${id}`).then(res=> {
            await this.getAdmins();
        })
    }

    render() {
        return (
            <div className='adminDashboardContainer'>
                <h1>This is the admin dashboard</h1>
                {
                    this.props.owner ? 
                    <h2>You see this if you're the owner</h2> :
                    <> </>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminDashboard))