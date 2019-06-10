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
      open: false,
    }
  }
  toggleEdit =()=>{
    console.log('hitting toggle edit')

    this.setState({open: !this.state.open})
    // axios.post('/auth/admin').then(()=>{
    //   this.setState({
    //     editToggle: !this.state.editToggle
    //   })
    // }).catch((err)=>{})
  }

   componentDidMount(){
    console.log(this.state)
  }
  render(){
    return(
      
     <div>

          {this.state.editToggle ? 
          
          <div style ={{'margin-top': '55px'}}>
            <button onClick={()=>{this.toggleEdit()}}>Button</button>
            <Popup 
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
          trigger = {<button>Trigger</button>}
        >
          <div style = {{'height': '100px', 'width':'100px', 'background-color': 'blue'}} className="modal">

            </div>
           
        </Popup>
          </div>
          
          : <div>
            <h1 style ={{'margin-top': '55px'}}>false</h1>
          </div>}
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