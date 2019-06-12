import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../../redux/reducer'
import {connect} from 'react-redux'
import Popup from 'reactjs-popup'
import JobPostSlider from './JobPostSlider'

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
            applicantPDFResume: null,
            note: '',
            newNote: '',
            companyName: '',
            job_id: null,
            jobTitle: '',
            jobDescription: '',
            applicantContacted: false
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
        const companyData = await axios.get(`/api/company-name/${this.props.companyId}`)
        console.log(companyData)
        this.setState ({
            videoResumes: videos.data,
            jobTitle: jobData.data[0].job_title,
            jobDescription: jobData.data[0].details,
            companyName: companyData.data[0].name
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
    handleSelect =async (resume, index)=> {
        await this.setState({
            selectedVideo: index,
            applicantName: `${this.state.videoResumes[index].firstname} ${this.state.videoResumes[index].lastname}`,
            applicantLiked: resume.liked,
            applicantDisliked: resume.disliked,
            applicantResume: resume.resume,
            applicantId: resume.userid,
            applicantEmail: resume.email,
            applicantPDFResume: resume.resume,
            note: resume.notes
        })
        this.setSelected()
    }

    // Button Handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    updateUser=async()=> {
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
        await axios.post(`/api/annoy`, {user_id})
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
        this.setState({
            note: this.state.newNote
        })
        this.updateUser();
        this.getVideos();
    }
    handleContactFurther=async()=> {
        const {companyName:company_name, applicantEmail:user_email} = this.state
        const text = (`
            <div>
                <p>Dear <b>${this.state.applicantName}</b>, </p>
                <br /> <br/>
                <p>Your video resume for ${this.state.companyName} has been reviewed! The hiring managers have expressed interest in your application. You should expect contact from them in the near future. </p>
                <br/> <br/>
                <p>Thank you for using PitchVivid, and good luck in your job hunt!</p>
            </div>
        `)
        await axios.post('/send', {company_name, user_email, text})
        this.setState({
            applicantContacted: true
        })
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    render() {
        let displayVideoCarousel = this.state.videoResumes.map((resume, index)=> {
            return (
                <div key={index} className='adminJobPostResumeCard' onClick={()=>this.handleSelect(resume, index)}>
                    <p>Applicant Name: {resume.firstname} {resume.lastname} </p>
                </div>
            )
        })
        return(
            <div className='adminJobPostContainer'>
                <div className='adminJobPostSelectedView'>
                    <div className='postVidAndButtons'>
                        <video controls id='resumeViewer'></video>
                        <div className='resumeViewerButtons'>
                            {
                                this.state.applicantLiked ? 
                                <button className='likedVid'>Liked</button> :
                                <button onClick={this.handleLike} className='likeButton'>Like</button>
                            }
                            {
                                this.state.applicantDisliked ? 
                                <button className='dislikedVid'>Disliked</button> :
                                <button onClick={this.handleDislike}>Dislike</button>
                            }
                            <button onClick={this.handleBlock} className='resumeBlockButton'>Block</button>
                        </div>
                    </div>
                    <div className='resumeViewerInfo'>
                        <p><b>Applicant's Name:</b> {this.state.applicantName}</p>
                        {
                            this.state.applicantPDFResume !== null ?
                            <p>Applicant's Resume: <a target='_blank' href={this.state.applicantPDFResume}>click to view</a></p>
                            :
                            <> </>
                        }
                        <p><b>Job Title:</b> {this.state.jobTitle}</p>
                        <p><b>Job Description:</b> {this.state.jobDescription}</p>
                        <p><b>Notes: </b> {this.state.note}</p>
                        <div className='noteButtonContainer'>
                            {/* <button className='noteButton'>Add Note</button> */}
                            <Popup trigger={<button className='popupButton'>Add Note</button>} position='top center'>
                                {
                                    close=> (
                                        <div className='popupDivJp'>
                                            <input onChange={e=>this.handleNoteChange(e)} type='text' name='newNote' placeholder='New Note' />
                                            <button onClick={()=>this.handleAddNote(close)}>Post New Note</button>
                                        </div>
                                    )
                                }
                            </Popup>
                            {
                                !this.state.applicantContacted ? 
                                <button onClick={()=> {this.handleContactFurther()}}>Contact Further</button>
                                :
                                <p>We've Notified This User of Your Interest!</p>

                            }
                        </div>
                    </div>
                </div>
                <div className='carouselDisplay' >
                    <h2>Applicants</h2>
                    <JobPostSlider handleSelect = {this.handleSelect} slideshow={this.state.videoResumes}/>
                </div>
                {/* <div className='carouselDisplay'>
                    {displayVideoCarousel}  
                </div> */}
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