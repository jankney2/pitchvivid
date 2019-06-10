import React, {Component} from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'

class AdminLogin extends Component {
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
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err => {
            this.setState({
                loginError: true
            })
        })
    }
    render() {
        return (
            <div className='authBack'>
                <div className='user-login-view'>
                    <h1 className='loginTitle'>Hiring Admin Login</h1>
                    <div className='formDiv'>
                        <p className='authSection'>Work email:</p>
                        <input placeholder = 'email' onChange={e=> this.handleChange('email', e.target.value)} />
                        <p className='authSection'>Password:</p>
                        <input type='password' placeholder = 'password' onChange={e=> this.handleChange('password', e.target.value)} />
                    </div>
                    {
                        this.state.loginError ? 
                        <h3 className='wrongCred'>Incorrect credentials. Please try again.</h3> :
                        <> </>
                    }
                    <Link to='/'>
                        <a className='forgotPW'>Forgot password?</a>
                    </Link>
                    <button type='button' className='landingBtn' onClick={this.handleSubmit}>Login</button>
                    <Link to='/register'>
                        <a className='aTag'>Register new account</a>
                    </Link>
                    <Link to='/user-login'>
                        <a className='aTag'>Job applicant login</a>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps =state=> {
    return {
        ...state 
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminLogin))