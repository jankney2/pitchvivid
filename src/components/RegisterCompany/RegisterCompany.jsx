import React, {Component} from 'react'
import axios from 'axios'

class RegisterCompany extends Component {
    constructor() {
        super()
        this.state = {
            companyName: '',
            contactEmail: ''
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
        return (
            <div className='registerCompanyContainer'>
                <h2>Request Our Services</h2>
                <p>
                    Would you like a demo? We can show you a no-strings attached demo just for your company. 
                    Provide us a contact email and the name of your business, and we'll have our brokers in contact 
                    with you within 3-5 business days to set up a proper demonstration of what PitchVivid can do for you!
                </p>
                <input type='text' onChange={e=>this.handleChange(e)}value={this.state.companyName} name='companyName' placeholder='Company Name' />
                <input type='text' onChange={e=>this.handleChange(e)}value={this.state.contactEmail} name='contactEmail' placeholder='Contact Email' />
                <button onClick={this.handleSubmit}>Submit Request</button>
            </div>
        )
    }
}

export default RegisterCompany