import React, {Component} from 'react'
import Slider from 'react-slick'

export default class SimpleSlider extends Component {
    constructor(){
        super()
        this.state = {
            active: 6, 
            settings: {
                dots: true,
                infinite: false,
                speed: 1500,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 4000,
                variableWidth: true,
                arrows: true,
                rows: 1,
                centerMode: true,
                centerPadding: '0',
                className:'center',
                focusOnSelect: true,
                pauseOnHover: false
            }
        }
    }
    render() {
        let {settings} = this.state
        return (
            <Slider {...settings} className='adminSlider'>
                {this.props.slideshow}
            </Slider>
        )
    }
}