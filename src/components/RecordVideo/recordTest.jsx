import React, { Component } from 'react'
import { v4 as randomString } from 'uuid';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class RecordVideo extends Component {
    constructor() {
        super()
        this.state = {
            video: [],
            mediaRecorder: null,
            recording: false,
            recordingMessage: 'Now LIVE!',
            isUploading: false,
            url: false,
            uploadFile:{},
            finalVideo:''

        }


    }

    componentDidMount() {
        // this is an object of default settings for our video recorer
        // const vidLink= this.props.videoLink
        // console.log(typeof(vidLink))
        // console.log(vidLink)
        // this.setState({finalVideo: vidLink})

        let constraintObj = {
            audio: true,
            video: {
                facingMode: 'user',
                width: { min: 640, ideal: 1280, max: 1920 },
                height: { min: 480, ideal: 720, max: 1080 }
            }
        }


      

        // navigator is a global object that lets access getUserMedia (which gives me webcam access) and returns a promise
        // I take the promise and assign the webcam to the source of the video element labeled 'record'- then set it to play
        // finally, I assign the webcam on state as a new MediaRecorder object so that I can access it throughout the component
        navigator.mediaDevices.getUserMedia(constraintObj).then(mediaStreamObj => {
            let video = document.getElementById('record')
            if ('srcObject' in video) {
                video.srcObject = mediaStreamObj
            } else {
                video.src = window.URL.createObjectURL(mediaStreamObj)
            }
            video.play();
            this.setState({
             
                mediaRecorder: new MediaRecorder(mediaStreamObj)
            })
        }).catch(err => console.log(`There appears to be an error. Here are some details: ${err}`))
    }

    startRecording = () => {
        // if we're already recording, do nothing (or else it will error out)- else, begin recording (and, optionally, opt to display the video element)
        if (this.state.mediaRecorder.state === 'recording') {
            return
        } else {
            // let video = document.getElementById('record')
            // video.play();
            this.state.mediaRecorder.start()
            this.setState({
                recording: true
            })
        }
    }

    stopRecording = e => {
        // if we're not recording, do nothing (or else it will error out)- else, stop recording and pause record video element
        if (this.state.mediaRecorder.state === 'inactive') {
            return
        } else {
            this.state.mediaRecorder.stop()
            this.setState({
                recording: false
            })
            let recordVideo = document.getElementById('record')
            recordVideo.pause();
            // assign the mediaRecorder from state locally, set on state the recorded video chunks
            let recorder = this.state.mediaRecorder
            recorder.ondataavailable = e => {
                this.setState({
                    video: [e.data]
                })
            }
            // once we stop recording, save the vid as a Blob object, empty state, create a virtual URL for the blob,
            // and finally set the source of our 'playback' video element to the virtual URL we just created
            recorder.onstop = e => {
                let blobVid = new Blob(this.state.video, { type: 'video/mp4'})
                let videoUrl = window.URL.createObjectURL(blobVid)
                this.setState({
                    video: [],
                    blob: {blobVid, name: videoUrl},
                    videoURL: videoUrl
                })
                console.log(this.state.videoURL)
                console.log(this.state.blob)
                document.getElementById('playback').src = videoUrl
            }

        }
    }

    //AWS STUFF



    getSignedRequest = (file) => {


        // console.log(typeof (this.state.profile_pic))
        console.log(file)

        this.setState({ isUploading: true })

        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
        console.log(fileName)
        axios.get('/sign-s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        }).then(response => {
            const { signedRequest, url } = response.data
            console.log(response.data)
            console.log(file)
            this.uploadFile(file, signedRequest, url);
        }).catch(err => {
            console.log(err)
        })
    };

    uploadFile = (file, signedRequest, url) => {
        console.log(url) //this is the correct link at this point
        const options = {
            headers: {
                'Content-Type': file.type,
            },

        }

        console.log('this went through', options)
        axios.put(signedRequest, file, options)
            .then((response) => {
                console.log(response)
                
                this.setState({finalVideo: url})

                this.setState({ isUploading: false, url })
                console.log(this.state)
                console.log('also went through', response)
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


    sendToDb = async () => { 
        const {job_id} = this.props.job_id
        const video_url = this.state.url
       await axios.post('/api/userVideos', {video_url, job_id});
        this.props.history.push('/dashboard');
    
        
    }

    render() {

        // this.setState({finalVideo: this.props.videoLink})
        // console.log(this.state)

        return (
            <>
                {
                    this.state.recording ?
                        <h2>{this.state.recordingMessage}</h2> :
                        <></>
                }
                <div className='record-play-container'>
                    <video id='record'></video>
                    <br />
                    <video controls id='playback'></video>
                    <br />
                    <button onClick={this.startRecording}>Begin Recording</button>
                    <br />
                    <button onClick={e => this.stopRecording(e)}>Stop Recording</button>

                    <input
                        className='choose-file'
                        onChange={(e) => (this.setState({uploadFile: this.state.blob}))}
                        type='file' placeholder='photo' />
                    <button
                        className='picture-upload'
                        onClick={() => this.getSignedRequest(this.state.blob)}> Upload file</button>
                   
                    {
                        this.state.url? 
                        <video controls id ='playback' src ={`${this.state.url}`}  ></video> :
                        <video controls id ='playback' src ={`${this.props.videoLink}`}  ></video>
                    }
                    
                   
                </div>
                <button onClick={e => this.sendToDb()}>Send To DB</button>
            </>
        )
    }
}

export default withRouter(RecordVideo)