import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../../redux/reducer'
import {connect} from 'react-redux'
import Popup from 'reactjs-popup'

 class AdminProfile extends Component{

  constructor(){
    super()
    this.state={
      email: '',
      firstName: '',
      lastName: '',
      newPassword: '',
      editToggle: false,
    }
  }

  render(){
    return(
      <div>
        Admin Profile
      </div>
    )
  }
}
const mapStateToProps = state => {
  const { email, firstName, lastName, } = state
  return {
      
      firstName,
      lastName,
      email,  
      
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminProfile))