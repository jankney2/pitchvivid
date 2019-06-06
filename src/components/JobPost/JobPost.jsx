import React, { Component } from 'react'
import axios from 'axios'
import RecordVideo from '../RecordVideo/RecordVideo'

class JobPost extends Component {
    constructor() {
        super()
        this.state = {
            jobPost: {}
        }
    }







  

    componentDidMount() {
        console.log(this.props)
        axios.get(`/api/postings/${this.props.match.params.job_id}`).then(res => {
            console.log(res)
            this.setState({
                jobPost: res.data[0]
            })
        })
    }
    render() {
       
        return (
            <div className='jobpost-view'>
                <section className='left-side'>
                    <div className='jobpost-company-job-info'>
                        <div className='jobpost-company-name'>
                          
                            {this.state.jobPost.company_name}
                        </div>

                        <div className='jobpost-job-title'>
                            {this.state.jobPost.job_title}
                        </div>

                        <div className='jobpost-open-close-dates'>
                            {this.state.jobPost.opening_date}-{this.state.jobPost.closing_date}
                        </div>
                    </div>
Details for the JOB
                    <div className='jobpost-job-details'>
                        {this.state.jobPost.details}
                    </div>

                </section>





                <section className='right-side'>
                    <div className='video-container'>
                        <RecordVideo  job_id={this.props.match.params} videoLink={this.state.jobPost.video_url}/>
                        
                    </div>
                </section>
            </div>
        )
    }
}

export default JobPost

