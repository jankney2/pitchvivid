import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
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
<<<<<<< HEAD
            <div className='adminLoginContainer'>
=======
            <div>
                <h1>Admin Login</h1>
>>>>>>> master
                <input placeholder = 'email' onChange={e=> this.handleChange('email', e.target.value)} />
                <input type='password' placeholder = 'password' onChange={e=> this.handleChange('password', e.target.value)} />
                <button onClick={this.handleSubmit}>Login</button>
                {
                    this.state.loginError ? 
                    <h3>Your login credentials are incorrect. Please try again</h3> :
                    <> </>
                }
<<<<<<< HEAD
                <div className='altLoginMessage'>
                    <p>Looking for User login? Try <a href='/user-login'>here</a></p>
                </div>
=======
                <button className='loginSwitch' onClick={() => this.props.history.push('/user-login')}>Login as an applicant</button>
>>>>>>> master
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