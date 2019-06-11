import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            adminKey: '',
            owner: false,
            admin: true,
        }
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value })
    }


    checkBoxHandle = (name) => {
        this.setState({ [name]: !this.state[name] })
    }

    handleSubmit = () => { 
        // if the user is registering as an administrator, hit the admin endpoint
        this.state.admin ? 
        axios.post(`/auth/registerAdmin`, this.state).then(res => {
            console.log(res.data)
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err=>console.log(`There appears to be an error with registerAdmin: ${err}`))
        :
        axios.post(`/auth/registerUser`, this.state).then(res=> {
            console.log(res.data)
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err=> console.log(`There appears to be an error with registerUser: ${err}`))
    }

    
    render() {
        return (
            <div className='authBack'>
                <div className='authBackImg'></div>
                <div className='user-login-view authPlate registerPlate'>
                    <h1 className='loginTitle'>Register New {this.state.admin ? 'Admin' : 'User'}</h1>
                    <div className='formDiv'>
                        <div className='checkbox-container'>
                            <span className='checkboxes'>
                                <p className='authSection'>I'm hiring for a company</p>
                                <input id='recruit-box' className='checkbox' type='checkbox' onClick={() => this.checkBoxHandle('admin')} checked={this.state.admin == true ? true : false}/>
                            </span>
                            {
                                this.state.admin ? 
                                <span className='owner-container'>
                                    <input id='company-name-input' placeholder='Admin Key' onChange={e => this.handleChange("adminKey", e.target.value)} /> 
                                    <span className='checkboxes'>
                                        <p className='authSection'>I'm an executive in the company</p>
                                        <input className='checkbox' type='checkbox' onClick={() => this.checkBoxHandle('owner')} />
                                    </span>
                                </span> : 
                                <> </>
                            }
                        </div>
                        <p className='authSection'>{`${this.state.admin ? 'Work' : 'Personal'} email:`}</p>
                        <input placeholder='email' onChange={e => this.handleChange("email", e.target.value)} />
                        <p className='authSection'>Password:</p>
                        <input type='password' placeholder='password' onChange={e => this.handleChange("password", e.target.value)} />
                        <p className='authSection'>First name:</p>
                        <input placeholder="first name" onChange={e => this.handleChange("firstName", e.target.value)} />
                        <p className='authSection'>Last name:</p>
                        <input placeholder='last name' onChange={e => this.handleChange("lastName", e.target.value)} />
                    </div>

                    <button className='landingBtn' onClick ={this.handleSubmit}>Register</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))