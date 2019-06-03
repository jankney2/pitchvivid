import React, { Component } from 'react'

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            company: '',
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
        console.log('you registered')
        // send to database function added in
        //props.history send to landing page 
    }

    
    render() {

        

        return (
            <>
                <input placeholder='Email' onChange={e => this.handleChange("email", e.target.value)} />
                <input type='password' placeholder='Password' onChange={e => this.handleChange("password", e.target.value)} />
                <input placeholder="First Name" onChange={e => this.handleChange("firstname", e.target.value)} />
                <input placeholder='Last Name' onChange={e => this.handleChange("lastname", e.target.value)} />
                <label> If Recruiter,
            <input placeholder='Which Company You Work For' onChange={e => this.handleChange("company", e.target.value)} />
                </label>
                <label> Check if you own this company
                <input type='checkbox' onClick={() => this.checkBoxHandle('owner')} />
                </label>
                <label> Check if you are recruiting for a company
                <input type='checkbox' onClick={() => this.checkBoxHandle('admin')} />
                </label>

                <button onClick ={this.handleSubmit}>Register</button>

            </>
        )
    }
}