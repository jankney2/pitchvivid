import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'
import { async } from 'q';

class AdminJobPost extends Component {
    constructor() {
        super()
        this.state = {
            videoResumes: [], 
            selectedVideo: null,
            applicantLiked: false,
            applicantDisliked: false,
            applicantResume: null,
            // applicantBlocked: false, 
            note: '',
            job_id: null,
            applicantName: '',
            jobTitle: '',
            jobDescription: ''
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
        const jobData = await axios.get(`/api/postings/${this.state.job_id}`)
        const videos= await axios.get(`/api/adminnotes/getAll/${this.state.job_id}`)
        console.log(videos)
        this.setState ({
            videoResumes: videos.data,
            jobTitle: jobData.data[0].job_title,
            jobDescription: jobData.data[0].details
        })
        // if(this.state.videoResumes.length > 0){
        //     document.getElementById('resumeViewer').src= this.state.videoResumes[this.state.selectedVideo]
        // }
    }
    setSelected=()=> {
        const video = document.getElementById('resumeViewer')
        video.src = this.state.videoResumes[this.state.selectedVideo].video_url
        video.play()
    }
    handleSelect=async (resume, index)=> {
        console.log(resume)
        await this.setState({
            selectedVideo: index,
            applicantName: `${this.state.videoResumes[index].firstname} ${this.state.videoResumes[index].lastname}`,
            applicantLiked: resume.liked,
            applicantDisliked: resume.disliked,
            applicantResume: resume.resume,
            note: resume.notes
        })
        this.setSelected()
    }

    // Button Handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    handleLike=async ()=> {
        // await axios.post(``)
        this.setState({
            applicantLiked: true,
            applicantDisliked: false
        })
    }
    handleDislike=async()=> {
        // await axios.post(``)
        this.setState({
            applicantLiked: false,
            applicantDisliked: true
        })
    }
    handleBlock=async()=> {
        // await axios.post(``)
    }
    handleAddNote=async()=> {
        // await axios.post(``)
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    render() {
        let displayVideoCarousel = this.state.videoResumes.map((resume, index)=> {
            return (
                <div key={index} className='adminJobPostResumeCard'>
                    <p>Applicant Name: {resume.firstname} {resume.lastname} </p>
                    <button onClick={()=>this.handleSelect(resume, index)}>View Resume</button>
                </div>
            )
        })
        return(
            <div className='adminJobPostContainer'>
                <div className='adminJobPostSelectedView'>
                    <video controls id='resumeViewer'></video>
                    <div className='resumeViewerInfo'>
                        <p><b>Applicant's Name:</b> {this.state.applicantName}</p>
                        <p><b>Job Title:</b> {this.state.jobTitle}</p>
                        <p><b>Job Description:</b> {this.state.jobDescription}</p>
                        <div className='resumeViewerButtons'>
                            {
                                this.state.applicantLiked ? 
                                <button className='likedVid'>Liked</button> :
                                <button onClick={this.handleLike} className='likeButton'>Like</button>
                            }
                            <button className='resumeBlockButton'>Block</button>
                            {
                                this.state.applicantDisliked ? 
                                <button className='dislikedVid'>Disliked</button> :
                                <button onClick={this.handleDislike}>Dislike</button>
                            }
                        </div>
                        <div className='noteButtonContainer'>
                            <button className='noteButton'>Add Note</button>
                        </div>
                    </div>
                </div>
                <div className='carouselDisplay'>
                    {displayVideoCarousel}  
                </div>
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