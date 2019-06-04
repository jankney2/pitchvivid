import React, {Component} from 'react'
import axios from 'axios'
import RecordVideo from '../RecordVideo/RecordVideo'

class JobPost extends Component { 
    constructor(){
        super()
        this.state = { 
            jobPost:[]
        }
    }

    componentDidMount(){
      
     axios.get(`/api/userVideos/${this.props.match.params.job_id}`).then(res => {
           
           this.setState({
               jobPost: [res.data]
            })
            console.log(this.state)
       })
    }


    render(){

        const jobDetails = this.state.jobPost.map((element, index) => { 
            return <div key={index}>
                {element.job_title}
            </div>
        })
        return(
            <div className='jobpost-view'> 

            this is the job post
            {jobDetails}
            {/* <RecordVideo />  */}
            </div>
        )
    }
}

export default JobPost 