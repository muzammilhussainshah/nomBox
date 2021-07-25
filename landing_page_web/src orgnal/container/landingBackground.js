import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../style/landingBackground.css'
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../assets/bg.jpg'
// import bg2 from '../assets/bg2.jpg'
// import bg3 from '../assets/bg3.jpg'
// import bg4 from '../assets/bg4.jpg'
// import bg5 from '../assets/bg5.jpg'
export default class LandingBackground extends Component {
    render() {
        return (
            <Carousel
                autoPlay={false}
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                swipeable={false}
                infiniteLoop={false}
            >
                <div>
                    <img alt="" src={bg1} />
                </div>
            </Carousel>
        );
    }
}