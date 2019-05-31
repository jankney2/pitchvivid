import React, {Component} from 'react'

class RecordVideo extends Component {
    constructor() {
        super() 
        this.state = {
            video: []
        }
    }

    // in the process of finding a decent video recorder for react-
    // it's proving more difficult than I would like - jt

    render() {
        return (
            <div>
                <h3>Record Video component here</h3>
            </div>
        )
    }
}

export default RecordVideo