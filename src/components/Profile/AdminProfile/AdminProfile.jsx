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
      editToggle: true,
    }
  }
  toggleEdit =()=>{
    console.log('hitting toggle edit')
    axios.post('/auth/admin').then(()=>{
      this.setState({
        editToggle: !this.state.editToggle
      })
    }).catch((err)=>{})
  }

   componentDidMount(){
    console.log(this.state)
  }
  render(){
    return(
      
      

      
      
      this.state.editToggle ?
       <div>
         <p>
         {this.state.editToggle}
         </p>
          <button onClick = {()=>{this.toggleEdit()}}>Button</button>
        </div> :
        
        <div>
          {this.state.editToggle}

          <button onClick = {()=>{this.toggleEdit()}}>Button</button>
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