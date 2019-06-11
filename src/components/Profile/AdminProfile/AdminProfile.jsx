import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { updateUser } from '../../../redux/reducer'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'

class AdminProfile extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      newPassword: '',
      editToggle: false,
      password: '',
      owner: false,
      confirmPassword: false,
    }
  }
  authenticateAdmin = (callback) => {
    callback()
    let password = this.state.password
    axios.post('/auth/admin', { password: password }).then(() => {
      console.log('firing toggleEdit')
      this.toggleEdit()
    }).catch((err) => { })
  }

  componentDidMount() {
    const { email, firstName, lastName, owner } = this.props
    console.log(email, firstName, lastName, owner)
    this.setState({
      email,
      firstName,
      lastName,
      owner
    })
  }

  handleFormChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  toggleEdit = () => {
    console.log(this.state.editToggle)
    let newEdit = !this.state.editToggle
    this.setState({
      editToggle: newEdit,
      password: '',
    })
    console.log(this.state.editToggle)

  }

  handleSubmit = ()=>{
    const { email, firstName, lastName, newPassword, owner } = this.state
    let password = newPassword
    if (newPassword !== this.state.confirmPassword){
      alert('Passwords do not match')
      return
    }
    axios.put('/auth/updateAdmin', {email, firstName, lastName, password, owner}).then(res=>{
      const { email, firstName, lastName} = res.data
      this.setState ({
        email,
        firstName,
        lastName,
        password: '',
        confirmPassword: '',
        newPassword: '',
        
      })
      }
    ).catch(err=>{
      console.log(err)
    })
    this.toggleEdit()

  }
  render() {
    const state = Object.entries(this.state)
    return (

      <div style={{ 'margin-top': '55px' }} className = 'landingBack'>
        <h1>Admin Info:</h1>

        {this.state.editToggle ? 

        <div className = 'user-login-view authPlate'>
          <p>email</p>
          <input onChange={e => this.handleFormChange(e)} type='text' name='email' placeholder='email' value={this.state.email} />
          <p>First Name</p>
          <input onChange={e => this.handleFormChange(e)} type='text' name='firstName' placeholder='first name' value={this.state.firstName} />
          <p>Last Name</p>
          <input onChange={e => this.handleFormChange(e)} type='text' name='lastName' placeholder='last name' value={this.state.lastName} />

          <p>Password</p>
          <input onChange={e => this.handleFormChange(e)} type='password' name='confirmPassword' placeholder='password' value={this.state.confirmPassword} />
          <p>Confirm Password</p>
          <input onChange={e => this.handleFormChange(e)} type='password' name='newPassword' placeholder='confirm password' value={this.state.newPassword} />
          
          <button onClick = {()=>{this.handleSubmit()}}>Submit Changes</button>
          <button onClick = {()=>{this.toggleEdit()}}>Cancel</button>

        </div>
        :
        <div>
        {state.map(item => {
          if (item[0] === 'password' || item[0] === 'newPassword' || item[0] === 'editToggle' || item[0] === 'owner' || item[0]==='confirmPassword'){
            return
          }
          console.log(item)
          return <div>

            <div className='profileItem'>{item[0]}: {item[1]}</div>
            {/* <div>{item[1]}</div> */}

          </div>
        })}

        <Popup trigger={<button>Edit Info</button>} position='right center'>
          {
            close => (
              <div>
                <input onChange={e => this.handleFormChange(e)} type='password' name='password' placeholder='password' value={this.state.password} />
               
                <button onClick={() => {
                  this.authenticateAdmin(close)
                }}>Submit</button>
                <button onClick = {()=>{close()}}> Cancel </button>
              </div>
            )
          }
        </Popup>
        </div>
        
      }

      </div>









    )
  }
}
const mapStateToProps = state => {
  const { email, firstName, lastName, owner} = state
  return {

    firstName,
    lastName,
    email,
    owner

  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminProfile))