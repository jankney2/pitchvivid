import React from "react";
import Slider from "react-slick";
 
export default class SimpleSlider extends React.Component {
  constructor(){
    super()
    this.state = {
      active: 2,
      settings: {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        variableWidth: true,
        arrows: false,
        rows: 1,
        centerMode: true,
        centerPadding: '0',
        className: 'center',
        focusOnSelect: true,
        pauseOnHover: false
      }
    }
  }



  render() {
    let {settings} = this.state
    return (
      <Slider {...settings} className='slider'>
        <div>
          <img className='landingPic' src="https://pbs.twimg.com/media/DZNheP3U0AAq6F-.jpg" alt=""/>
        </div>
        <div>
          <img className='landingPic' src="https://ak5.picdn.net/shutterstock/videos/10624415/thumb/9.jpg" alt=""/>
        </div>
        <div>
          <img className='landingPic' src="http://footage.framepool.com/shotimg/873694370-video-chat-agency-style-creativity.jpg" alt=""/>
        </div>
        <div>
          <img className='landingPic' src="https://ak9.picdn.net/shutterstock/videos/4782959/thumb/1.jpg" alt=""/>
        </div>
        <div>
          <img className='landingPic' src="https://files.slack.com/files-pri/T039C2PUY-FK01T9WCS/admin_video_resume_view.jpg" alt=""/>
        </div>
        <div>
          <img className='landingPic' src="https://files.slack.com/files-pri/T039C2PUY-FK01T9WCS/admin_video_resume_view.jpg" alt=""/>
        </div>
      </Slider>
    );
  }
}