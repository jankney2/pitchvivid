import React, {Component} from 'react'
import axios from 'axios'

export default class ReturnLink extends Component {
    constructor() {
        super()
        this.state = {
            tempPass: '',
            newPass: '',
            newPass2: '',
            successMessage: false,
            errorMessage: false,
            user_id: null
        }
    }
    componentDidMount() {
        this.setState({
            user_id: this.props.match.params.id
        })
    }
    handleFormChange=e=> {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit=async ()=> {
        const {user_id, tempPass, newPass:password, newPass2} = this.state
        this.setState({
            errorMessage: false
        })
        tempPass === 'pitchit817C4' && password === newPass2 ? 
        axios.put('/auth/reset-pass', {user_id, password}).then(res => {
            this.setState({
                successMessage: true
            })
        }) 
        :
        // if they aren't, error- if they are, continue
        this.setState({
            tempPass: '',
            newPass: '',
            newPass2: '',
            errorMessage: true
        })
    }

    render() {
        return (
            <div className='resetPasswordContainer'>
                <h1>Reset Password</h1>
                <p>Enter your temporary password, followed by your new password</p>
                <input onChange={e=>{this.handleFormChange(e)}} type='password' name='tempPass' value={this.state.tempPass} placeholder='Enter your temporary password' />
                <input onChange={e=>{this.handleFormChange(e)}} type='password' name='newPass' value={this.state.newPass} placeholder='Enter your new pasword' />
                <input onChange={e=>{this.handleFormChange(e)}} type='password' name='newPass2' value={this.state.newPass2} placeholder='Re-enter your password' />
                <button onClick={()=> {this.handleSubmit()}}>Submit New Password</button>
                {
                    this.state.errorMessage ? 
                    <b>Looks like your information isn't correct. Please try again</b>
                    :
                    <> </>
                }
                {
                    this.state.successMessage ?
                    <b>Your password has been reset. Please login with your updated password!</b>
                    :
                    <> </>
                }
            </div>
        )
    }
}