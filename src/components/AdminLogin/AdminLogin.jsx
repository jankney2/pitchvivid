import React, {Component} from 'react'
import axios from 'axios'

export default class AdminLogin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            loginError: false
        }
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit =()=> {
        this.setState({
            loginError: false
        })
        const {email, password} = this.state
        axios.post('/auth/loginAdmin', {email, password}).then(res => {
            console.log(res.data)
        }).catch(err => {
            this.setState({
                loginError: true
            })
        })
    }
    render() {
        return (
            <div>
                <input placeholder = 'email' onChange={e=> this.handleChange('email', e.target.value)} />
                <input type='password' placeholder = 'password' onChange={e=> this.handleChange('password', e.target.value)} />
                <button onClick={this.handlSubmit}>Login</button>
                {
                    this.state.loginError ? 
                    <h3>Your login credentials are incorrect. Please try again</h3> :
                    <> </>
                }

            </div>
        )
    }
}