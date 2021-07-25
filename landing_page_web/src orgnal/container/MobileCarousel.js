import React, { Component } from "react";
import videoLink from '../assets/LeadGen_Onboarding-tiny.mp4';
import '../style/mobileCarousel.css'
const videoStyle = {
  // margin: '0 auto',

  width: '99%',
  height: "99%",
  // borderRadius: '25px',
  borderRadius:  window.innerWidth > 4094 ? "55px" : 
  
  
  "25px", 
  // "35px",


  // borderTopRightRadius: "10%",
  borderTopRightRadius: window.innerWidth>1599? "12%":"10%",
  // borderTopLeftRadius: "10%",
  borderTopLeftRadius: window.innerWidth>1599? "12%":"10%",
  alignItems: 'center',
  // justifyContent:"center",

  paddingTop: '11%'
};
var divStyle = {
  // width: "224px",
  // height: "509px",
  // width: "291px",
  // height: "661px",
  overFlow: 'hidden',
  borderTopLeftRadius: '25px',
  margin: '0 auto',
  marginTop: window.innerWidth > 4094 ? "8%" : "2%"
};
var divParentStyle = {
  // backgroundColor:"orange",
  paddingBottom: '0px',
  // paddingTop: '22px',
  // width: "312px",
  // height: "606px",
  borderRadius: 12,
};
export default class MobileCarousel extends Component {
  render() {
    return (

      <div
        className='mobile_background'
        style={divParentStyle}>
        <div style={{
          width: '40%', height: window.innerWidth > 4094 ? "28px" : '14px', backgroundColor: '#e2e1e1', margin: '0 auto', borderBottomLeftRadius: 26,
          borderBottomRightRadius: 26, position: 'relative', top: window.innerWidth > 4094 ? '10%':"7%"
        }}>
        </div>
        <div style={divStyle} className='vedioParent'>
          <video className='videoTag' autoPlay loop muted style={videoStyle}>
            <source src={'https://firebasestorage.googleapis.com/v0/b/nombox-1529885929392.appspot.com/o/sliderVideo%2FLeadGen_Onboarding-tiny.mp4?alt=media&token=efd9218e-5e76-4097-b2a5-c0c56c0a5e7d'} type='video/mp4' />
          </video>
        </div>
      </div>
    );
  }
}