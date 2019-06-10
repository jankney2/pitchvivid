import React, {Component} from 'react'
import axios from 'axios'

export default class ResetPasswordRequest extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            errorMessage: false,
        }
    }

    handleFormChange=e=> {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit= async()=> {
        this.setState({errorMessage: false})
        console.log('checking your stuff')
        const {email, firstname, lastname} = this.state
        const validation = await axios.post(`/api/validate`, {email, firstname, lastname})
        validation.data.length === 1 ? 
        console.log('this is where we need to hit the reset password endpoint')
        : 
        this.setState({
            errorMessage: true
        })
    }

    render() {
        return(
            <div className='resetPasswordContainer'>
                <p>Please enter the following information so we can make sure it's you!</p>
                <input onChange={e=>{this.handleFormChange(e)}} type='text' name='email' value={this.state.email} placeholder='Email' />
                <input onChange={e=>{this.handleFormChange(e)}} type='text' name='firstname' value={this.state.firstname} placeholder='First Name' />
                <input onChange={e=>{this.handleFormChange(e)}} type='text' name='lastname' value={this.state.lastname} placeholder='Last Name' />
                <button onClick={()=> {this.handleSubmit()}}>Submit</button>
                {
                    this.state.errorMessage ? 
                    <b>Your information isn't showing in our system. Please try again</b>
                    :
                    <> </>
                }
            </div>
        )
    }
}