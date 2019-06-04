import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../../redux/reducer'
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

        if(!this.props.companyId){
            this.props.history.push('/login')
        }
    
        if(this.props.owner){
            this.getAllListings()
            this.getAdmins()
        }

        if(this.props.companyId){
            this.getListings() 
        }
            
    // function to grab company info
        // nothing yet
    }

    // admin functionality ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
    getListings=async ()=> {
        try {
            const listings = await axios.get('/api/postings/admin')
            this.setState ({
                jobListings: listings.data
            })
        } catch(err) {
            console.log(`There was an error with admin listings: ${err}`)
        }
    }              
    addJob=async()=> {
        axios.post('/api/postings/new').then(res => {
            this.props.owner ? 
            this.getAllListings() :
            this.getListings()
        })
    }
    updateJob=async (id)=> {
        axios.put(`/api/postings/${id}`).then(res => {
            this.props.owner ? 
            this.getAllListings() :
            this.getListings()
        })
    }
    deleteJob=async (id)=> {
        axios.delete(`/api/postings/${id}`).then(res => {
            this.props.owner ? 
            this.getAllListings() :
            this.getListings()
        })
    }
    // function to view application for job listing
        // nothing yet
    // function to contact applicant for follow-up interview
        // nothing yet


    // owner functionality ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   
    getAllListings=async ()=> {
        try {
            const listings = await axios.get('/api/postings/company')
            this.setState ({
                jobListings: listings.data
            })

        } catch(err) {
            console.log(`There was an error getting owner listings: ${err}`)
        }
    }
    getAdmins=async ()=> {
        try {
            const admins = await axios.get(`/api/admins`)
            this.setState ({
                administrators: admins.data
            })
        } catch(err) {
            console.log(`There was an error getting owner admin list: ${err}`)
        }
    }
    deleteAdmin=async (id)=> {
        axios.delete(`/api/admins/${id}`).then(res=> {
            this.getAdmins();
        })
    }

    render() {
        let jobDisplay = this.state.jobListings.map(job => {
            return job.title
        })
        let adminDisplay = this.state.administrators.map(admin=> {
            return (
                <div className='adminCard' key={admin.id}>
                    <p>{admin.first_name} {admin.last_name}</p>
                    <button onClick={() => this.deleteAdmin(admin.id)}>Remove as Admin</button>
                </div>
            )
        })
        return (
            <div className='adminDashboardContainer'>
                <h1>This is the admin dashboard</h1>
                {
                    this.props.owner ? 
                    <h2>You see this if you're the owner</h2> :
                    <> </>
                }
                <div className='adminDashJobPanel'>
                    <h3>Jobs Here: </h3>
                    {
                        this.state.jobListings.length > 0 ?
                        jobDisplay :
                        <p>There are no job listings yet. Make one!</p>
                    }
                </div>

                <div className='adminDashOwnerPanel'>
                    <h3>Admins Here: </h3>
                    {
                        this.state.administrators.length > 0 ?
                        adminDisplay :
                        <p>There are no administrators somehow. What's up with that?</p>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    const {companyId, email, id, firstName, lastName, owner} = state
    return {
        companyId, 
        firstName,
        lastName,
        email,  
        id, 
        owner
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminDashboard))