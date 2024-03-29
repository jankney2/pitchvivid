import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { updateUser } from '../../../redux/reducer'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'
import { v4 as randomString } from 'uuid';




class UserProfile extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      newPassword: '',
      editToggle: false,
      password: '',
      confirmPassword: false,
      resumeFile: false,
      resume: '',
      resumeEditToggle: false



    }
  }





  componentDidMount = async () => {



    console.log(this.props)
    const { email, firstName, lastName, resume } = this.props
    console.log(email, firstName, lastName, resume)
    this.setState({
      email,
      firstName,
      lastName,
      resume
    })
  }



  //S3



  getSignedRequest = (file) => {



    console.log(file)

    this.setState({ isUploading: true })

    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

    axios.get('/sign-s3', {
      params: {
        'file-name': fileName,
        'file-type': file.type
      }
    }).then(response => {
      const { signedRequest, url } = response.data
      console.log(response.data)
      console.log(file)
      const resume = url
      this.uploadFile(file, signedRequest, resume);
    }).catch(err => {
      console.log(err)
    })
  };



  uploadFile = (file, signedRequest, resume) => {
    console.log(file, signedRequest, resume)
    const options = {
      headers: {
        'Content-Type': file.type,
      },

    }



    console.log('this went through', options)
    axios.put(signedRequest, file, options)
      .then((response) => {
        this.setState({ isUploading: false, resume })
        this.updateResume(resume)
        console.log('also went through', resume)

        axios.put('/api/uploadResume', { resume }).then(res => {
          console.log(res.data)

          this.setState({
            resumeFile: false,
            resumeEditToggle: false
          })
          console.log(this.state.resumeFile)
        })

      }).catch(err => {
        this.setState({
          isUploading: false

        })

        if (err.response.status === 403) {
          alert(`Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
            err.stack
            }`
          )
        } else {
          alert(`Error: ${err.status}\n ${err.stack}`)
        }
      })
  }


  updateResume = (file) => {
    this.setState({ resumeFile: file })
    console.log(this.state.resumeFile)
    
  }












  authenticateUser = (callback) => {
    callback()
    let password = this.state.password
    axios.post('/auth/user', { password: password }).then(() => {
      console.log('firing toggleEdit')
      this.toggleEdit()
    }).catch((err) => { })
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

  handleSubmit = () => {
    const { email, firstName, lastName, newPassword } = this.state

    let password = newPassword
    if (newPassword !== this.state.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    axios.put('/auth/updateUser', { email, firstName, lastName, password }).then(res => {
      const { email, firstName, lastName } = res.data
      this.setState({
        email,
        firstName,
        lastName,
        password: '',
        confirmPassword: '',
        newPassword: '',

      })
    }
    ).catch(err => {
      console.log(err)
    })
    this.toggleEdit()

  }


  resumeUploadToggle = () => {
    this.setState({
      resumeEditToggle: !this.state.resumeEditToggle
    })
  }

  render() {
    const state = Object.entries(this.state)
    console.log(state)
    return (

      <div className='profileContainer landingBack '>
        <h1>Your Info:</h1>

        {this.state.editToggle ?

          <div className='authPlate'>
            <div className='formDiv'>
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

              <button onClick={() => { this.handleSubmit() }}>Submit Changes</button>
              <button onClick={() => { this.toggleEdit() }}>Cancel</button>

            </div>
          </div>
          :
          <div className='authPlate'>
            <div className='formDiv'>
              <div>
                <div>
                  <h2>Email:</h2>
                  <div>{this.state.email}</div>
                </div>
                <div>
                  <h2>First Name:</h2>
                  <div>{this.state.firstName}</div>
                </div>
                <div>
                  <h2>Last Name:</h2>
                  <div>{this.state.lastName}</div>
                </div>

              </div>

              {
                this.state.resume ?

                  <div id='resumeLink-button'>

                    <a href={`${this.state.resume}`} target='_blank'>
                      <h2>Resume Link</h2>
                    </a>

                    <button 
                   
                    id='resume-toggle-button' onClick={e => this.resumeUploadToggle()}>Edit Resume</button>

                  </div> :

                  <> 
                  <p style={{color: 'white'}}>Choose a File to Upload</p>
                   <input style={{color: 'white'}}
                    className='choose-file'
                    onChange={e => this.updateResume(e.target.files[0])}
                    type='file' accept="application/pdf" />
                    {
                      !this.state.resumeFile ?
                        <></> :
                        <button
                          className='resume-upload'
                          onClick={() => this.getSignedRequest(this.state.resumeFile)}> Upload Resume </button>
                    }


                       </>
              }




              {
                this.state.resumeEditToggle ?
                  <>
                    <input
                    style={{color: 'white'}}
                      className='choose-file'
                      onChange={e => this.updateResume(e.target.files[0])}
                      type='file' accept="application/pdf" />

                    {
                      !this.state.resumeFile ?
                        <></> :
                        <button
                       
                          className='resume-upload'
                          onClick={() => this.getSignedRequest(this.state.resumeFile)}> Upload Resume </button>
                    }


                    <p style={{color: 'white'}}>Choose a File to Upload</p>
                  </>
                  :
                  <>  </>

              }






             





              {
              this.state.isUploading ?
                <div className='spinner'></div> :
                <></>
            }












            {
              this.state.resumeEditToggle ?
                <> </> :


                <Popup trigger={<button>Edit Info</button>} position='right center'>
                  {
                    close => (
                      <div className='popup-box' >
                        <input style={{ 'width': '10vw' }} onChange={e => this.handleFormChange(e)} type='password' name='password' placeholder='password' value={this.state.password} />
                        <div className='button-box'>
                          <button onClick={() => {
                            this.authenticateUser(close)
                          }}>Submit</button>
                          <button onClick={() => { close() }}> Cancel </button></div>
                      </div>
                    )
                  }
                </Popup>
            }

          </div>
          </div>
          

      }

      </div>









    )
  }
}
const mapStateToProps = state => {

  const { email, firstName, lastName, resume } = state
  return {

    firstName,
    lastName,
    email,
    resume

  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile))