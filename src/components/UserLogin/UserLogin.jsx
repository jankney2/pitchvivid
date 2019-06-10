import React, {Component}from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'



class UserLogin extends Component { 
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


    handleSubmit = async () => { 
        this.setState({
            loginError: false
        })
        const {email, password} = this.state
        await axios.post('/auth/loginUser', {email, password}).then(res => {
            console.log(res.data)
            this.props.updateUser(res.data)

            this.props.history.push('/dashboard')
        }).catch(err => {
            this.setState({
                loginError: true
            })
        })
    }
    render(){
        return(
            <div className='landingBack'>
                <div className='user-login-view'>
                    <h1>Applicant Login</h1>
                    <input placeholder = ' email' onChange={e => this.handleChange("email", e.target.value)} /> 
                    <input type = "password" placeholder = ' password' onChange={e => this.handleChange("password", e.target.value)} /> 
                    <button type='button' className='landingBtn' onClick={this.handleSubmit}>Login</button>
                    {
                        this.state.loginError ? 
                        <h3>Your login credentials are incorrect. Please try again</h3>: 
                        <> </>
                    }
                    <Link to='/admin-login'>
                        <a className='aTag'>Login as a hiring administrator</a>
                    </Link>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserLogin))