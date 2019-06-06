import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'

class AdminJobPost extends Component {
    constructor() {
        super()
        this.state = {
            videoResumes: [], 
            selectedVideo: null, 
            note: '',
            jobId: null
        }
    }

    async componentDidMount() {
        const session = await axios.get('/api/session') 
        try { 
            await this.props.updateUser(session.data.admin) 
        } catch {
            this.props.history.push('/')
        }
        this.setState({
            job_id: this.props.match.params.id
        })
        // issue with this endpoint is that it's for users only- there is no
        // endpoint yet for administrators to view videos
        const videoResumes= await axios.get(`/api/userVideos/${this.state.job_id}`)
        // probably need to do some mapping through videoresumes with a bit of text editing
        this.setState ({
            videoResumes
        })
        // document.getElementById('resumeViewer').src= this.state.videoResumes[0]
        document.getElementById('resumeViewer').src= 'http://localhost:3000/d58bfb6b-2b0a-45a2-8066-ab897e020d97'
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // let blob = newBlob(this.state.videoResumes[0], {'type': 'video/mp4'})
        // let videoURL = window.URL.createObjectURL(blob)
        // document.getElementById('resumeViewer').src = videoURL
    }
    render() {
        return(
            // 
            <div className='adminJobPostContainer'>
                <h3>This will be where you view the video applications</h3>
                <video controls id='resumeViewer'></video>
            </div>

        )
    }
}
const mapStateToProps = state => {
    const {companyId} = state
    return {
        companyId
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminJobPost))