import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios';

class RecordVideo extends Component {
    constructor() {
        super()
        this.state = {
            video: [],
            mediaRecorder: null,
            recording: false,
            recordingMessage: 'Now LIVE!',
            blob: []
        }
    }

    componentDidMount() {
        // this is an object of default settings for our video recorer
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
                let blob = new Blob(this.state.video, { 'type': 'video/mp4' })
                this.setState({
                    video: [],
                    blob
                })
                let videoUrl = window.URL.createObjectURL(blob)
                document.getElementById('playback').src = videoUrl
            }
        }
    }

    submitRecording =async()=> {
        // console.log(this.state.blob)
        // console.log(window.URL.createObjectURL(this.state.blob))
        const video_url = window.URL.createObjectURL(this.state.blob);
        // const video_url = this.state.blob
        const {job_id} = this.props.match.params
        await axios.post('/api/userVideos', {video_url, job_id});
        this.props.history.push('/dashboard');
        // console.log(this.props.match.params)
    }

    render() {
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
                    <br />
                    <button onClick={this.submitRecording}>Submit Video Resume</button>
                </div>
            </>
        )
    }
}

export default withRouter(RecordVideo)