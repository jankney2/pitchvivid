import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'
import Popup from 'reactjs-popup'

class AdminJobPost extends Component {
    constructor() {
        super()
        this.state = {
            videoResumes: [], 
            selectedVideo: null,
            applicantLiked: false,
            applicantDisliked: false,
            applicantResume: null,
            applicantName: '',
            applicantId: '',
            // applicantBlocked: false, 
            note: '',
            job_id: null,
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
            job_id: +this.props.match.params.id
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
        //     document.getElementById('resumeViewer').src= this.state.videoResumes[this.state.selectedVideo].video_url
        // }
    }
    setSelected=()=> {
        const video = document.getElementById('resumeViewer')
        video.src = this.state.videoResumes[this.state.selectedVideo].video_url
        // video.play()
    }
    handleSelect=async (resume, index)=> {
        console.log(resume)
        await this.setState({
            selectedVideo: index,
            applicantName: `${this.state.videoResumes[index].firstname} ${this.state.videoResumes[index].lastname}`,
            applicantLiked: resume.liked,
            applicantDisliked: resume.disliked,
            applicantResume: resume.resume,
            applicantId: resume.userid,
            note: resume.notes
        })
        this.setSelected()
    }

    // Button Handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    updateUser=async()=> {
        console.log(this.state)
        const {job_id, applicantId:user_id, applicantDisliked: disliked, applicantLiked: liked, note: notes} = this.state
        await axios.post(`/api/adminnotes`, {job_id, user_id, disliked, liked, notes})
    }
    getVideos=async()=> {
        const videos= await axios.get(`/api/adminnotes/getAll/${this.state.job_id}`)
        this.setState({
            videoResumes: videos.data
        })
    }
    handleLike=async()=> {
        await this.setState({
            applicantLiked: true,
            applicantDisliked: false
        })
        this.updateUser();
        this.getVideos();
    }
    handleDislike=async()=> {
        await this.setState({
            applicantLiked: false,
            applicantDisliked: true
        })
        this.updateUser();
        this.getVideos();
    }
    handleBlock=async()=> {
        const {applicantId:user_id} = this.state
        await axios.post(`/api/block`, {user_id})
        this.updateUser();
        this.getVideos();
    }
    handleNoteChange=e=> {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    handleAddNote=async(callback)=> {
        callback();
        this.updateUser();
        this.getVideos();
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
                        <p><b>Notes: </b> {this.state.note}</p>
                        <div className='resumeViewerButtons'>
                            {
                                this.state.applicantLiked ? 
                                <button className='likedVid'>Liked</button> :
                                <button onClick={this.handleLike} className='likeButton'>Like</button>
                            }
                            <button onClick={this.handleBlock} className='resumeBlockButton'>Block</button>
                            {
                                this.state.applicantDisliked ? 
                                <button className='dislikedVid'>Disliked</button> :
                                <button onClick={this.handleDislike}>Dislike</button>
                            }
                        </div>
                        <div className='noteButtonContainer'>
                            {/* <button className='noteButton'>Add Note</button> */}
                            <Popup trigger={<button>Add Note</button>} position='top center'>
                                {
                                    close=> (
                                        <div>
                                            <input onChange={e=>this.handleNoteChange(e)} type='text' name='note' value={this.state.note} placeholder='New Note' />
                                            <button onClick={()=>this.handleAddNote(close)}>Post New Note</button>
                                        </div>
                                    )
                                }
                            </Popup>
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