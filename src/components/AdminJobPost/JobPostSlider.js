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
                slidesToScroll: 3,
                arrows: true,
            }
        }
    }
    render() {
        let { settings } = this.state
        console.log(this.props.slideshow)
        return (

            <Slider {...settings} className = 'slider jobslider'>{
                this.props.slideshow.map((slide, index) => {
                console.log(slide)
                return (
                    <div key={index}>
                        <button className = "myButton"onClick = {()=>{this.props.handleSelect(slide, index)}}>{slide.firstname} {slide.lastname}</button>
                    </div>)

            })}</Slider>
        )
    }
}