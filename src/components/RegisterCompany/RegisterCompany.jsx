import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class RegisterCompany extends Component {
    constructor() {
        super()
        this.state = {
            companyName: '',
            adminKey: '',
        }
    }

    componentWillMount = () => {
        let randomAdminKey = Math.random().toString(36).slice(-8)
        this.setState({adminKey: randomAdminKey})
    }

    handleChange=e=> {
        const {name, value} = e.target
        this.setState ({
            [name]: value
        })
    }

    handleSubmit=()=> {
        axios.post('/api/newCompany', this.state).then(res => {
            console.log(res.data)
        })
    }

    render() {
        console.log('this.state:', this.state)
        return (
            <div className='authBack'>
                <div className='authBackImg'></div>
                <div className='user-login-view authPlate'>
                    <h1 className='loginTitle'>Company Register</h1>
                    <div className='formDiv'>
                        <p className='authSection'>Company name:</p>
                        <input type='text' onChange={e=>this.handleChange(e)}value={this.state.companyName} name='companyName' placeholder='company name' />
                        <p className='authSection'>Admin key:</p>
                        <input type='text' onChange={e=>this.handleChange(e)}value={this.state.adminKey} name='adminKey' placeholder='admin key' />
                        <Link to={`/register/${this.state.adminKey}`}>
                            <button type='button' className='landingBtn' onClick={this.handleSubmit}>Submit Request</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterCompany