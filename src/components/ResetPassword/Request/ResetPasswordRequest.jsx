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
            successMessage: false
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
        this.handlePassChange(validation.data[0].id)
        // console.log(validation.data)
        : 
        this.setState({
            errorMessage: true
        })
    }

    handlePassChange=async(id)=> {
        // may need to hit an axios request here to store the id, send that attached to the URL below
        const {email:user_email} = this.state
        const text = (`
            <div>
                <p>Dear <b>${this.state.firstname} ${this.state.lastname},</p>
                <br/> <br/>
                <p>This is your temporary password for PitchVivid: pitchit817C4 </p>
                <br/>
                <p>Enter your email and the temporary password <a href='http://localhost:4000/return-pass/${id}'> here </a> and you'll be prompted to enter a new, permanent password.</p>
                <br /> <br/>
                <p>Thank you for using PitchVivid, and good luck in your job hunt! </p>
            </div>
        `)
        await axios.post('/reset', {user_email, text})
        this.setState({
            successMessage: true
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
                {
                    this.state.successMessage ? 
                    <b>We've sent you an email with a temporary password. Follow the instructions to finish resetting your password!</b>
                    :
                    <> </>
                }
            </div>
        )
    }
}