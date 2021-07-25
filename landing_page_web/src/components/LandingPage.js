import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { sendFormDataAction } from "../store/action/action";
import { Row, Col } from "reactstrap";
import LandingBackground from "../container/landingBackground";
import MobileCarousel from "../container/MobileCarousel";
import ActionTypes from "../store/constant/constant";
import EarlyAccessForm from "./EarlyAccessForm"
import ConfirmationMessage from "./ConfirmationMessage"
import Font from '../fonts/Gibson-Regular.ttf'
import Lottie from 'react-lottie';
import '../style/landing.css'

import * as animationData from '../assets/1374-restless-gift-ii.json'
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      focus: false,
      isStopped: false, isPaused: false
    };
  }
  toFocus = () => {
    console.log("TO focus")
    this.setState({ focus: !this.state.focus })
  }
  render() {
    const buttonStyle = {
      display: 'block',
      margin: '10px auto'
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <div className='background' >
        {/* <LandingBackground /> */}
        <div style={lottieImageStyle}>
          <Lottie options={defaultOptions}
            height={75}
            width={75}
            isStopped={this.state.isStopped}
            isPaused={this.state.isPaused} />
          <h1 className='heading' style={headingStyle}>NOMBOX</h1>
        </div>
        <Row style={rowStyle} className='rowStyle'>
          <Col md="6" onClick={this.toFocus}
            style={formColtes}
            // className="row-margin-first-col"
            >
            <MobileCarousel />
          </Col>
          <Col md="6" >
            <div style={formCol} 
            // className="row-margin-second-col"
            >

              {
                this.props.formSuccess === false ?
                  <EarlyAccessForm focus={this.state.focus} /> :
                  <ConfirmationMessage />
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProp(state) {
  return {
    formSuccess: state.root.formSuccess
  };
}
function mapDispatchToProp(dispatch) {
  return {
    toggleFalse: () => {
      dispatch({ type: ActionTypes.FORMSUCCESS, payload: false });
    }
  };
}

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(LandingPage);

const formColtes = {
  //  backgroundColor: "red"
   };
const formCol = { padding: "2% 3%", width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)',
//  backgroundColor: "orange",
  borderRadius: 26 };
const rowStyle = { 
  // backgroundColor: "pink",
 position: 'absolute', 
 justifyContent: 'center', alignItems: 'center',
 zIndex: 1000, 
 top: '7%', 
//  left: '6%', 
//  right: '6%'
 };
const headingStyle = {
  fontFamily: Font,
  color: "white",
  fontWeight: "bold",
  position: "absolute",
  top: 10,
  left: '75%',
  display: 'inline',
  zIndex: 1000
}
const lottieImageStyle = {
  position: "absolute",
  top: 1,
  left: '1%',
  zIndex: 1000
}