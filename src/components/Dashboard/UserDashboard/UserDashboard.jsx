// functionality needed: 

// function to grab job listings
// route to video component to record video

//make a button that links to video component 

//did mount that loads the listings

// location to put the listings that are loaded from the didMount

// render `welcome name` of the user

// 



import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import {updateUser} from '../../../redux/reducer'
import { connect } from 'react-redux'


class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            email: props.email
        }

    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <>
                <div>
                    
                    <Link to='/record'>
                        <button>
                            Record New Video
                    </button>
                    </Link>
                </div>

            </>
        )
    }


}


const mapStateToProps = state => {
    return {
        ...state
    }
}


export default connect(mapStateToProps)(withRouter(UserDashboard))