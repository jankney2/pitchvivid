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
            note: ''
        }
    }

    async componentDidMount() {
        const session = await axios.get('/api/session') 
        try {
            session.data.admin ? 
            await this.props.updateUser(session.data.admin) :
            await this.props.updateUser(session.user)
        } catch {
            this.props.history.push('/')
        }
    }
    render() {
        return(
            <div className='adminJobPostContainer'>
                <h3>This will be where you view the video applications</h3>
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