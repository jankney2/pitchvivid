import React, { Component } from 'react'
import Slider from 'react-slick'

export default class JobPostSlider extends Component {
    constructor() {
        super()
        this.state = {

            settings: {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                // centerMode: true,
                centerPadding: '50px',
                className: 'center'
            }
        }
    }
    render() {
        let { settings } = this.state
        console.log(this.props.slideshow)
        return (
            // this.props.element.style.width = 50%
            <Slider {...settings} className = 'slider jobslider'>{
                this.props.slideshow.map((slide, index) => {
                console.log(slide)
                return (
                        <button className = "landingBtn"  onClick = {()=>{this.props.handleSelect(slide, index)}}>{slide.firstname} {slide.lastname}</button>
                    )

            })}</Slider>
        )
    }
}