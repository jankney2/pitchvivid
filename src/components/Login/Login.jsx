import React, {Component}from 'react'



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
        console.log('you logged in')
    }
    render(){
        return(
            <div className='login-view'>

            <input  placeholder = 'Email' onChange={e => this.handleChange("email", e.target.value)} /> 
            
            <input type = "password" placeholder = 'Password' onChange={e => this.handleChange("password", e.target.value)} /> 
            
            <button onClick={this.handleSubmit}>Login</button>
            

             </div> 
        )
    }

}