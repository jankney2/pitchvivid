import React, {Component}from 'react'
import axios from 'axios'


export default class Login extends Component { 
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            loginError: false
        }
        
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }


    handleSubmit = () => { 
        this.setState({
            loginError: false
        })
        axios.get('/auth/login').then(res => {
            console.log(res.data)
        }).catch(err => {
            this.setState({
                loginError: true
            })
        })
    }
    render(){
        return(
            <div className='login-view'>

            <input  placeholder = 'Email' onChange={e => this.handleChange("email", e.target.value)} /> 
            
            <input type = "password" placeholder = 'Password' onChange={e => this.handleChange("password", e.target.value)} /> 
            
            <button onClick={this.handleSubmit}>Login</button>
            
            {
                this.state.loginError ? 
                <h3>Your login credentials are incorrect. Please try again</h3>: 
                <> </>
            }
             </div> 
        )
    }

}