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
            administrators: [],
            addJob: false,
            editJob: null,
            newJobTitle: '',
            newJobDescription: '',
            editJobTitle: '',
            editJobDescription: ''
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
    // event handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    handleFormChange=e=> {
        const {name, value} = e.target
        this.setState ({
            [name]: value
        })
    }
    handleAddJob=()=> {
        this.setState ({
            addJob: !this.state.addJob
        })
    }
    handleEditJob=(id, title, details)=> {
        this.setState ({
            editJob: id,
            editJobTitle: title,
            editJobDescription: details
        })
    }
    handleCancel=()=> {
        this.setState ({
            editJob: null,
            addJob: false
        })
    }

    // admin functionality ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
        // note that listings can't be grabbed until session endpoint is created
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
        const {newJobTitle:job_title, newJobDescription:job_details} = this.state
        await axios.post('/api/postings/new', {job_title, job_details})
        this.props.owner ? 
        this.getAllListings() :
        this.getListings()
    }
    updateJob=async (id)=> {
        const {editJobTitle: job_title, editJobDescription: job_details} = this.state
        await axios.put(`/api/postings/${id}`, {job_title, job_details})
        this.props.owner ? 
        this.getAllListings() :
        this.getListings()
    }
    deleteJob=async (id)=> {
        await axios.delete(`/api/postings/${id}`)
        this.props.owner ? 
        this.getAllListings() :
        this.getListings()
    }
    // function to view application for job listing
        // nothing yet
    // function to contact applicant for follow-up interview
        // nothing yet

    // owner functionality ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   
        // note that listings can't be grabbed until session endpoint is created
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
        await axios.delete(`/api/admins/${id}`)
        this.getAdmins();
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    render() {
        let jobDisplay = this.state.jobListings.map(job => {
            return (
                <div className='jobCard' key={job.id}>
                    {
                        this.state.editJob === job.id? 
                        <span>
                            <input onChange={e=>{this.handleFormChange(e)}} type='text' name='editJobTitle' placeholder={job.job_title} value={this.state.editJobTitle}/>
                            <input onChange={e=>{this.handleFormChange(e)}} type='text' name='editJobDescription' placeholder={job.details} value={this.state.editJobDescription}/>
                            <button onClick={()=>this.updateJob(job.id)}>Submit Edits</button>
                            <button onClick={this.handleCancel}>Cancel</button>
                        </span> :
                        <span>
                            <p>{job.job_title}</p>
                            <p>{job.details}</p>
                            <p>Position Filled: {job.filled}</p>
                            <button onClick={()=>this.handleEditJob(job.id, job.job_title, job.details)}>Edit Posting</button>
                            <button onClick={()=> this.deleteJob(job.id)}>Delete Posting</button>
                        </span>
                    }
                </div>
            )
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
                <h1>Your Dashboard</h1>
                <div className='adminDashJobPanel'>
                    <h3>Company Jobs: </h3>
                    {
                        this.state.jobListings.length > 0 ?
                        jobDisplay :
                        <p>... There are no job listings yet. Make one!</p>
                    }
                </div>

                <div className='adminDashAddJob'>
                    {
                        this.state.addJob ? 
                        <div className='adminDashAddJobForm'>
                            <input onChange={e=>{this.handleFormChange(e)}} type='text' name='newJobTitle' placeholder='Job Title' />
                            <input onChange={e=>{this.handleFormChange(e)}} type='text' name='newJobDescription' placeholder='Job Description' />
                            <button onClick={this.addJob}>Post New Job</button>
                            <button onClick={this.handleCancel}>Cancel</button>
                        </div> : 
                        <button onClick={this.handleAddJob}>Add New Job</button>
                    }
                </div>

                <div className='adminDashOwnerPanel'>
                    <h3>Account Administrators: </h3>
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