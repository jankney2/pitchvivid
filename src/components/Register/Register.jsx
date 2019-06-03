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
            <div className='register-container'>
                <input placeholder='Email' onChange={e => this.handleChange("email", e.target.value)} />
                <input type='password' placeholder='Password' onChange={e => this.handleChange("password", e.target.value)} />
                <input placeholder="First Name" onChange={e => this.handleChange("firstname", e.target.value)} />
                <input placeholder='Last Name' onChange={e => this.handleChange("lastname", e.target.value)} />
                
                <p>Are you recruiting for a company?</p>
                <input className='checkbox' type='checkbox' onClick={() => this.checkBoxHandle('admin')} />
                {
                    this.state.admin ? 
                    <div>
                        <p>Are you the owner of the company?</p>
                        <input className='checkbox' type='checkbox' onClick={() => this.checkBoxHandle('owner')} />
                        {
                            this.state.owner ?
                            <input placeholder='Company Name' onChange={e => this.handleChange("company", e.target.value)} /> : 
                            <></>   
                        } 
                    </div> : 
                    <> </>
                }



                <button onClick ={this.handleSubmit}>Register</button>

            </div>
        )
    }
}