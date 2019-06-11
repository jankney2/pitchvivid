import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../../redux/reducer'
import {connect} from 'react-redux'
import Popup from 'reactjs-popup'

class AdminDashboard extends Component {
    constructor() {
        super()
        this.state = {
            companyAdminKey: [],
            jobListings: [],
            administrators: [],
            editJob: null,
            // new job state vars
            newJobTitle: '',
            newJobDescription: '',
            newJobOpenDate: '',
            newJobCloseDate: '',
            // edit job state vars
            editJobTitle: '',
            editJobDescription: '',
            editJobFilled: false, 
            editJobArchived: false,
            editJobOpenDate: '',
            editJobCloseDate: '',
            // blocked user state vars
            blockedUsers: []
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
            
        this.getAdminKey()
        this.getBlockedUsers()
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
    getAdminKey=async()=> {
        const adminKey = await axios.get(`/api/admins/key`)
        this.setState({
            companyAdminKey: adminKey.data[0].admin_key
        })
    }
    getBlockedUsers=async()=> {
        const blocked = await axios.get(`/api/annoy`)
        this.setState({
            blockedUsers: blocked.data
        })
    }
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
    addJob=async(callback)=> {
        callback();
        const {newJobTitle:jobTitle, newJobDescription:details, newJobOpenDate: openingDate, newJobCloseDate: closingDate} = this.state
        await axios.post('/api/postings/new', {jobTitle, details, openingDate, closingDate})
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
    viewJob=(id)=> {
        this.props.history.push(`/post/admin-view/${id}`)
    }
    unblockUser=async(id) => {
        await axios.delete(`/api/annoy/${id}`)
        this.getBlockedUsers()
    }
    // Owner Specific Actions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    reassignAdminDuties=async(id)=> {
        await axios.put(`/api/posts/all`, {id})
    }
    deleteAdmin= async(id)=> {
        this.reassignAdminDuties(id);
        await axios.delete(`/api/admins/${id}`)
        this.getAdmins();
    }
    transferOwnership=async(id)=> {
        await axios.put(`/api/transfer/${id}`)
        await axios.delete('/auth/logout')
        this.props.history.push('/admin-login')
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
                            <span className='jobButtonBlock'>
                                <button onClick={()=>this.viewJob(job.id)}>View Job</button>
                                <button onClick={()=>this.handleEditJob(job.id, job.job_title, job.details, job.archived, job.opening_date, job.closing_date, job.filled)}>Edit Posting</button>
                                <button onClick={()=> this.deleteJob(job.id)}>Delete Posting</button>
                            </span>
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
                    <button onClick={()=> this.transferOwnership(admin.id)}>Transfer Ownership</button>
                </div>
            )
        })
        let blockedUsersDisplay = this.state.blockedUsers.map(user => {
            return (
                <div className='blockedUserCard' key={user.user_id}>
                    <p>Applicant Name: {user.first_name} {user.last_name}</p>
                    <p>Applicant Email: {user.email}</p>
                    <button onClick={()=>this.unblockUser(user.user_id)}>Unblock User</button>
                </div>
            )
        })
        return (
            <div className='adminDashboardContainer'>
                <h1>Administrator Dashboard</h1>
                <div className='adminDashJobPanel'>
                    <h3>Company Administrator Key: {this.state.companyAdminKey}</h3>
                    <Popup trigger={<button>Add a New Job Listing</button>} position='right center'>
                            {
                                close=> (
                                    <div>
                                        <input onChange={e=>this.handleFormChange(e)} type='text' name='newJobTitle' placeholder='Job Title' value={this.state.newJobTitle} />
                                        <input onChange={e=>this.handleFormChange(e)} type='text' name='newJobDescription' placeholder='Job Description' value={this.state.newJobDescription}/>
                                        <input onChange={e=>this.handleFormChange(e)} type='date' name='newJobOpenDate' value={this.state.newJobOpenDate}/>
                                        <input onChange={e=>this.handleFormChange(e)} type='date' name='newJobCloseDate' value={this.state.newJobCloseDate}/>
                                        <button onClick={()=> {
                                            this.addJob(close)
                                        }}>Post New Job</button>
                                    </div>
                                )
                            }
                        </Popup>
                    <h3>Company Jobs: </h3>
                    {
                        this.state.jobListings.length > 0 ?
                        jobDisplay :
                        <p>... There are no job listings yet. Make one!</p>
                    }
                </div>

                {
                    this.props.owner ? 
                    <div className='adminDashOwnerPanel'>
                        <h3>Account Administrators: </h3>
                        {
                            this.state.administrators.length > 0 ?
                            adminDisplay :
                            <p>There are no administrators somehow. What's up with that?</p>
                        }
                    </div> : 
                    <> </>
                }

                <div className='adminDashBlockedUsers'>
                    <h3>Blocked Users: </h3>
                    {
                        this.state.blockedUsers.length > 0 ?
                        blockedUsersDisplay :
                        <> </>
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