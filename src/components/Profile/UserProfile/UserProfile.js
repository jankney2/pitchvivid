import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../../redux/reducer'
import {connect} from 'react-redux'
import Popup from 'reactjs-popup'

export default class UserProfile extends Component{

  constructor(){
    super()
    this.state={

    }
  }

  render(){
    return(
      <div>
        User Profile
      </div>
    )
  }
}