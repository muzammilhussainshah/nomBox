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
      <div style={{ backgroundColor: "red" }}>
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
          <Col md="5"
            style={formColForMob}

            // style={{ padding: "2% 3%"}}
            onClick={this.toFocus}>
            <MobileCarousel />
          </Col>
          <Col md="5"
            style={formCol} className="form"
          >
            {
              this.props.formSuccess === false ?
                <EarlyAccessForm focus={this.state.focus} /> :
                <ConfirmationMessage />
              // null
            }
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
const formCol = {
  // left:"3%",
  // padding: "2% 3%",
  // width: '100%',
  // height:1000,
  backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 26,
  // margin:99
  // backgroundColor:"grey"
};
const formColForMob = {
  // left:"3%",
  // padding: "2% 3%", 
  width: '100%', justifyContent: "center", alignItems: "center", display: "flex"
// ,  backgroundColor:"red"
};
const rowStyle = {

  // backgroundColor: "orange",
  position: 'absolute', justifyContent: 'center', alignItems: 'center', 
  zIndex: 1000,
  //  top: '8%', 
   left: '12%', right: '13%'
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
  // backgroundColor: "green",
  left: '1%',
  zIndex: 1000
}