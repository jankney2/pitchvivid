import React, { Component } from 'react'


import { updateUser } from '../../redux/reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom'


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







    render() {
        return (
            // <div className='nav-menu'>
            //     {
            //         this.state.admin ?

            //             <div className='admin-nav'>
            //                 <div className='home-button'></div>
            //                 <div className='logo'></div>

            //             </div> :
            //             this.state.user ?
            //                 <div className='user-nav'>
            //                     <div className='home-button'></div>
            //                     <div className='logo'></div>

            //                 </div>

            //                 :
            //                 <> </>

            //     }
            // </div>


            <div className ='nav-menu'>
                <div className='button'>
                    <img  id='icon' src ='https://image.flaticon.com/icons/svg/25/25694.svg' alt ='home' /> 
                    <p>Home</p>
                </div>
                {
                    this.state.admin?
                    <div className='button'>
                        <img id ='icon' src = 'https://image.flaticon.com/icons/svg/32/32339.svg' alt = 'add post' /> 
                        <p>New Post</p>
                    </div>:
                    <> </>
            
                }
                <div className='logo'></div>
                <div className='button'>
                <img  id='icon' src ='https://cdn1.iconfinder.com/data/icons/material-core/20/info-outline-256.png' alt ='about' /> 
                <p>About</p>
                </div>
                
                <div className='button'>
                <img  id='icon' src ='https://image.flaticon.com/icons/svg/118/118781.svg' alt ='profile' /> <p>Profile</p>
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
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav))





