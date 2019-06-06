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

        const videos= await axios.get(`/api/adminnotes/getAll/${this.state.job_id}`)
        // const videoResumes= await axios.get(`/api/userVideos/${this.state.job_id}`)
        // probably need to do some mapping through videoresumes with a bit of text editing
        
        
        this.setState ({
            videoResumes: videos.data
        })
        if(this.state.videoResumes.length > 0){
            console.log(this.state.videoResumes)
            let videoSource = this.state.videoResumes[4].video_url.slice(5, -1)
            console.log(videoSource)
            document.getElementById('resumeViewer').src= videoSource
        }
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