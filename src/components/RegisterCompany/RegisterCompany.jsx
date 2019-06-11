import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class RegisterCompany extends Component {
    constructor() {
        super()
        this.state = {
            companyName: '',
            contactEmail: '',
            adminKey: 'fdjaskl'
        }
    }

    handleChange=e=> {
        const {name, value} = e.target
        this.setState ({
            [name]: value
        })
    }

    handleSubmit=()=> {
        // this will hit an axios request for nodemailer on the server eventually
        console.log(`Email would be sent from here`)
    }

    render() {
        let {adminKey} = this.state
        return (
            <div className='authBack'>
                <div className='authBackImg'></div>
                <div className='user-login-view authPlate'>
                    <h1 className='loginTitle'>Company Register</h1>
                    <div className='formDiv'>
                        <p className='authSection'>Company name:</p>
                        <input type='text' onChange={e=>this.handleChange(e)}value={this.state.companyName} name='companyName' placeholder='company name' />
                        <p className='authSection'>Admin key:</p>
                        <input type='text' onChange={e=>this.handleChange(e)}value={this.state.contactEmail} name='contactEmail' placeholder='admin key' />
                        <Link to={`/register/${adminKey}`}>
                            <button type='button' className='landingBtn' onClick={this.handleSubmit}>Submit Request</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterCompany