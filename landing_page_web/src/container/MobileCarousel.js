import React, { Component } from "react";
import videoLink from '../assets/LeadGen_Onboarding-tiny.mp4';
import '../style/mobileCarousel.css'
var divParentStyleSize = {
  width:( (window.innerHeight / 100 * 93) / 2.03) * 1,
  height:( window.innerHeight / 100 * 93) *1
}

var divStyleSize = {
  width: (divParentStyleSize.width / 100 * 93) / 0.83,
  height: (window.innerHeight / 100 * 93) * 0.83

}

const videoStyle = {
  width: '75%',
  height: "85%",
  borderRadius: '25px',
  borderTopRightRadius: '18% 8%',
  borderTopLeftRadius: '18% 8%',

  borderBottomRightRadius: '18% 8%',
borderBottomLeftRadius: '18% 8%',
  // borderRadius: '10%',
  // paddingTop: '11%'
  position: 'relative',
  top: divParentStyleSize.width / 100 * 7 + 'px',
  left: divParentStyleSize.width / 100 * 12.5 + 'px'
};
var divStyle = {
  backgroundColor: 'red',
  width: "224px",
  height: "509px",
  overFlow : 'hidden',
  borderTopLeftRadius : '25px',
  margin: '0 auto',
  marginTop : "2%"
};
var divParentStyle = {
  paddingBottom: '0px',
  paddingTop: '13px',
  width: divParentStyleSize.width + 'px',
  height: divParentStyleSize.height + 'px',
  borderRadius: 12,
};
export default class MobileCarousel extends Component {


  render() {
    return (
      <div className='mobile_background' style={divParentStyle}>
        <div style={{
          width: '40%', height: '16px', backgroundColor: '#e2e1e1', margin: '0 auto', borderBottomLeftRadius: 26,
          borderBottomRightRadius: 26, position: 'relative', top: '7%', zIndex: '100000'
        }}>
          <div style={{
            margin: '0 auto', backgroundColor: '#C8CFD6',height: '25%', width:'35%', zIndex: '100001',
          }}></div>
        </div>
        {/* <div style={divStyle}> */}
        <video className='videoTag' autoPlay loop muted style={videoStyle}>
          <source src={videoLink} type='video/mp4' />
          <source src={'https://firebasestorage.googleapis.com/v0/b/nombox-1529885929392.appspot.com/o/sliderVideo%2FLeadGen_Onboarding-tiny.mp4?alt=media&token=efd9218e-5e76-4097-b2a5-c0c56c0a5e7d'} type='video/mp4' />
        </video>
        {/* </div> */}
      </div >
    );
  }
}