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
            admin: false,
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
            <div className='register-container'>
                <div className='inputContainers'>
                    <h2>Register New User</h2>
                    <input placeholder='Email' onChange={e => this.handleChange("email", e.target.value)} />
                    <input type='password' placeholder='Password' onChange={e => this.handleChange("password", e.target.value)} />
                    <input placeholder="First Name" onChange={e => this.handleChange("firstName", e.target.value)} />
                    <input placeholder='Last Name' onChange={e => this.handleChange("lastName", e.target.value)} />
                </div>


                <div className='checkbox-container'>
                    <span>
                        <p id='recruiting'>I am recruiting for a company</p>
                        <input id='recruit-box' className='checkbox' type='checkbox' onClick={() => this.checkBoxHandle('admin')} />
                    </span>
                {
                    this.state.admin ? 
                    <span className='owner-container'>
                        <input id='company-name-input' placeholder='Admin Key' onChange={e => this.handleChange("adminKey", e.target.value)} /> 
                        <span>
                            <p>I am the owner of the company</p>
                            <input className='checkbox' type='checkbox' onClick={() => this.checkBoxHandle('owner')} />
                        </span>
                    </span> : 
                    <> </>
                }
                </div>
                <button id='register-button'onClick ={this.handleSubmit}>Register</button>

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