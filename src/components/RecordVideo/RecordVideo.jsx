import React, { Component } from 'react'
import { v4 as randomString } from 'uuid';
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class RecordVideo extends Component {
    constructor() {
        super()
        this.state = {
            video: [],
            mediaRecorder: null,
            recording: true,
            recordingMessage: 'Now LIVE!',
            isUploading: false,
            url: false,
            uploadFile: {},
            finalVideo: '',
            liveShow: false,
            stream: null,

        }
    }

    componentDidMount() {
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
                mediaRecorder: new MediaRecorder(mediaStreamObj),
                stream: mediaStreamObj
            })
        }).catch(err => console.log(`There appears to be an error. Here are some details: ${err}`))
    }

    componentWillUnmount() {
        // this will destroy the MediaStream/MediaRecorder connection that the browser makes upon recording a video- as soon as the component unmounts
        this.state.stream.getTracks().forEach(track => track.stop())
    }

    countTillRecord = () => {
        let timeLeft = 5;
        let video = document.getElementById('record')
        let elem = document.getElementById('countdown-timer');
        let fillerVideo = document.getElementById('filler-video')



        const countdown = () => {
            
            if (timeLeft === 0) {
                clearTimeout(timerId);
                elem.innerHTML = '';
                fillerVideo.classList.add('hide')
                video.classList.remove('hide')
                this.startRecording();
            } else {
                elem.innerHTML = 'Recording in ' + timeLeft;
                timeLeft--;
               
            }
        }
        let timerId = setInterval(countdown, 1000);
    }

    startRecording() {
        // if we're already recording, do nothing (or else it will error out)- else, begin recording (and, optionally, opt to display the video element)
        this.setState({
            recording: true,
            liveShow: true,

            })
        if (this.state.mediaRecorder.state === 'recording') {

            return
        } else {
           
            let timeLeft = 30;
            let elem = document.getElementById('record-timer');
           
            const countdown = () => {
               
                if (timeLeft == -1 || this.state.recording === false) {
                    clearTimeout(timerId);
                    this.stopRecording();
                    elem.innerHTML = '';
                } else {
                    elem.innerHTML = timeLeft + ' seconds remaining';
                    timeLeft--;
                }
            }
            let timerId = setInterval(countdown, 1000);

           

            let video = document.getElementById('record')
            let playback = document.getElementById('playback')
            playback.classList.add('hide')
            video.classList.remove('hide')
            video.play();
            this.state.mediaRecorder.start()

        }

    }

    stopRecording = e => {
        this.setState({ liveShow: false })
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
                let blobVid = new File(this.state.video, { type: 'video/mp4' })
                let videoUrl = window.URL.createObjectURL(blobVid)
                this.setState({
                    video: [],
                    blob: { blobVid, type: 'video/mp4' },
                    videoURL: videoUrl
                })
                const playback = document.getElementById('playback');
                recordVideo.classList.add('hide')
                playback.classList.remove('hide')
                playback.src = videoUrl;
                // playback.play();
                console.log(this.state.blob.blobVid)
            }
        }
    }

    //AWS STUFF
    getSignedRequest = (file) => {
        this.setState({ isUploading: true })
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
        axios.get('/sign-s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        }).then(response => {
            const { signedRequest, url } = response.data
            this.uploadFile(file, signedRequest, url);
        }).catch(err => {
            console.log(err)
        })
    };
    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type,
            },
        }
        axios.put(signedRequest, file, options)
            .then((response) => {
                this.setState({ finalVideo: url })
                this.setState({ isUploading: false, url })

                console.log(this.state)
                console.log('also went through', response)

                this.sendToDb()


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
        const { job_id } = this.props.job_id
        const video_url = this.state.url
        await axios.post('/api/userVideos', { video_url, job_id });
        console.log(job_id, video_url)
        console.log('this works')
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <>
                <div id="countdown-timer"></div>
                {
                    this.state.liveShow ? <>
                        <div id="record-timer">
                        </div>
                            <h2>Now Recording</h2>

                    </> :
                        <></>
                }

                <div className='record-play-container'>




                    <iframe id='filler-video' title='video' width="560" height="315" src="https://www.youtube.com/embed/yo9RUgEauhM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                    <video className='hide' id='record' muted></video>
                    <br />
                    <video className='hide' controls id='playback'></video>
                    <br />



                    <button onClick={this.countTillRecord}>Begin Recording</button>
                    <br />
                    <button onClick={e => this.stopRecording(e)}>Stop Recording</button>


                    {
                        this.state.isUploading ?
                            <div className="spinner"></div> :
                            <button className='picture-upload' onClick={() => this.getSignedRequest(this.state.blob.blobVid)}>
                                Upload Video
                    </button>

                    }

                </div>

            </>
        )
    }
}

export default withRouter(RecordVideo)