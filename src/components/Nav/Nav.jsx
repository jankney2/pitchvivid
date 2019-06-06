import React, { Component } from 'react'
import { logoutUser } from '../../redux/reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios';

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            user: false,
            admin: false
        }
    }

    async componentDidMount() {

        if (this.props.companyId) {
            this.setState({
                admin: true
            })
        } else {
            this.setState({
                user: true
            })
        }

        // at this point, we would grab the job postings, applicants for
        // those job postings, and various bits of company info
    }

    logOut = ()=> { 
    axios.delete('/auth/logout').then((res) => { 
        this.props.logoutUser()
    })
    this.props.history.push('/')
    }

    handleClick = (name) => { 
        this.props.history.push(`${name}`)
    }

    render() {
        console.log('this.props:', this.props)
        return (
            <div className='nav-menu'>
                <div className='navLeft'>
                    <div onClick={e => this.handleClick('/dashboard')} className='button'>
                        <img id='icon' src='https://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Home.png&r=255&g=255&b=255' alt='home' />
                        <p>Dashboard</p>
                    </div>

                    <div onClick={e => this.handleClick('/about')} className='button about'>
                        <img id='icon' src='https://i.ibb.co/Q9GM45G/about-icon.png' alt='about' />
                        <p>About</p>
                    </div>
                </div>

                <img className='logo' src="https://i.ibb.co/F4H3t5P/pv-logo.png" alt=""/>
                
                <div className='navRight'>
                    <div onClick={e => this.handleClick('/profile')} className='button profileBtn'>
                        {this.props.companyId ?
                            <>
                                <img id='icon' src='https://flaticons.net/gd/makefg.php?i=icons/Application/User-Profile.png&r=255&g=255&b=255' alt='profile' /> 
                                <p>Profile</p>
                            </> :
                            <>
                                <img id='icon' src='https://i1.wp.com/flcybercon.com/wp-content/uploads/2018/05/register-icon.png?fit=300%2C300&ssl=1' alt='register' /> 
                                <p>Register</p>
                            </> 
                        }
                    </div>

                    <div onClick={e => this.logOut()} className='button'>
                        {this.props.id ? 
                            <>
                                <img id='icon' src='https://i.ibb.co/FgFG9kp/logout-icon.png' alt='log out'/>
                                <p>Log Out</p>
                            </> :
                            <>
                                <img id='icon' src='https://i.ibb.co/whLzdZp/login-icon.png' alt='log in'/>
                                <p>Log In</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { companyId, email, id, firstName, lastName } = state
    return {
        companyId,
        firstName,
        lastName,
        email,
        id
    }
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav))





