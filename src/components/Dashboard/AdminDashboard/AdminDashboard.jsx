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
            // new job state vars
            newJobTitle: '',
            newJobDescription: '',
            // edit job state vars
            editJobTitle: '',
            editJobDescription: '',
            editJobFilled: false, 
            editJobArchived: false,
            editJobOpenDate: '',
            editJobCloseDate: ''
        }
    }
            
    async componentDidMount() {
    // grab session if there is one- if not, push to login ~~~~~~~~~~

        if(!this.props.companyId){
            this.props.history.push('/')
        }
    
        if(this.props.owner){
            this.getAllListings()
            this.getAdmins()
        }

        if(this.props.companyId && !this.props.owner){
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
    handleEditJob=(id, title, details, archived, opening_date, closing_date, filled)=> {
        this.setState ({
            editJob: id,
            editJobTitle: title,
            editJobDescription: details,
            editJobArchived: archived,
            editJobOpenDate: opening_date, 
            editJobCloseDate: closing_date,
            editJobFilled: filled
        })
    }
    handleCancel=()=> {
        this.setState ({
            editJob: null,
            addJob: false
        })
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
        const {newJobTitle:jobTitle, newJobDescription:details} = this.state
        await axios.post('/api/postings/new', {jobTitle, details})
        this.handleCancel();
        this.props.owner ? 
        this.getAllListings() :
        this.getListings()
    }
    updateJob=async (id)=> {
        const {editJobTitle: jobTitle, editJobDescription: details, editJobArchived: archived, editJobOpenDate: openingDate, editJobCloseDate: closingDate, editJobFilled: filled} = this.state
        await axios.put(`/api/postings/${id}`, {jobTitle, details, filled, openingDate, closingDate, archived})
        this.handleCancel();
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
        console.log('Getting Administrators... ')
        try {
            const admins = await axios.get(`/api/admins`)
            this.setState ({
                administrators: admins.data
            })
        } catch(err) {
            console.log(`There was an error getting owner admin list: ${err}`)
        }
    }
    reassignAdminDuties=async(id)=> {
        await axios.put(`/api/posts/all`, {id})
    }
    deleteAdmin= async(id)=> {
        this.reassignAdminDuties(id);
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
                            <input onChange={e=>{this.handleFormChange(e)}} type='text' name='editJobOpenDate' value={this.state.editJobOpenDate} />
                            <input onChange={e=>{this.handleFormChange(e)}} type='text' name='editJobCloseDate' value={this.state.editJobCloseDate} />
                            <input onChange={e=>{this.handleFormChange(e)}} type='checkbox' name='editJobArchived' value={this.state.editJobArchived} checked={this.state.editJobArchived}/>
                            <input onChange={e=>{this.handleFormChange(e)}} type='checkbox' name='editJobFilled' value={this.state.editJobFilled} checked={this.state.editJobEdit}/>
                            <button onClick={()=>this.updateJob(job.id)}>Submit Edits</button>
                            <button onClick={this.handleCancel}>Cancel</button>
                        </span> :
                        <span>
                            <p>Job Title: {job.job_title}</p>
                            <p>Details: {job.details}</p>
                            <p>Opening Date: {job.opening_date}</p>
                            <p>Closing Date: {job.closing_date}</p>
                            <p>Position Filled: {job.filled}</p>
                            <button onClick={()=>this.handleEditJob(job.id, job.job_title, job.details, job.archived, job.opening_date, job.closing_date, job.filled)}>Edit Posting</button>
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