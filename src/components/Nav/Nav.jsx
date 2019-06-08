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

    }

    logOut = ()=> { 
    axios.delete('/auth/logout').then((res) => { 
        this.props.logoutUser()
    })
    this.props.history.push('/')
    }

    logIn = () => {
        this.props.history.push('/admin-login')
    }

    handleClick = (name) => { 
        this.props.history.push(`${name}`)
    }

    render() {
        return (
            <div className='nav-menu'>
                <div className='navLeft'>
                    <div onClick={e => this.handleClick('/dashboard')} className='button'>
                        <img id='icon' src='https://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Home.png&r=255&g=255&b=255' alt='home' />
                        <p className='navText'>Dashboard</p>
                    </div>

                    <div onClick={e => this.handleClick('/about')} className='button about'>
                        <img id='icon' src='https://i.ibb.co/Q9GM45G/about-icon.png' alt='about' />
                        <p className='navText'>About</p>
                    </div>
                </div>

                <img className='logo' src="https://i.ibb.co/zrfy90x/pitchvivid.png" alt=""/>
                
                <div className='navRight'>
                    <>
                        {this.props.email ?
                            <div onClick={e => this.handleClick('/profile')} className='button profileBtn'>
                                <img id='icon' src='https://flaticons.net/gd/makefg.php?i=icons/Application/User-Profile.png&r=255&g=255&b=255' alt='profile' /> 
                                <p className='navText'>Profile</p>
                            </div> :
                            <div onClick={e => this.handleClick('/register')} className='button profileBtn'>
                                <img id='icon' src='https://i1.wp.com/flcybercon.com/wp-content/uploads/2018/05/register-icon.png?fit=300%2C300&ssl=1' alt='register' /> 
                                <p className='navText'>Register</p>
                            </div> 
                        }
                    </>

                    <>
                        {this.props.id ? 
                            <div onClick={e => this.logOut()} className='button'>
                                <img id='icon' src='https://i.ibb.co/Gxgd3jR/logout-icon.png' alt='log out'/>
                                <p className='navText'>Logout</p>
                            </div> :
                            <div onClick={e => this.logIn()} className='button'>
                                <img id='icon' src='https://i.ibb.co/R9Y2Hyf/login-icon.png' alt='log in'/>
                                <p className='navText'>Login</p>
                            </div>
                        }
                    </>
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





