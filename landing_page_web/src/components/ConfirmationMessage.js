import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Label, Input } from "reactstrap";
import Font from '../fonts/Gibson-Regular.ttf'
import FontWoo from '../fonts/Side-Effects.ttf'
import ActionTypes from "../store/constant/constant";
import '../style/mobileCarousel.css'

class ConfirmationMessage extends Component {

    render() {
        return (
            <div>
                <h2 style={{ marginBottom: "5%" }}>Sign Up for Early Access</h2>
                <div style={{ borderRadius: 12, backgroundColor: 'white', textAlign: 'center', padding: '12% 14%' }}>
                    <h4 className = "woo_hading" style={stylesFont}>Woo-hoo!</h4>
                    <h4>You're all set to be</h4>
                    <h4>an Early Access Member.</h4>
                    <h6 className = "woo_hading" style={{ marginTop: '6%', marginBottom: '6%', fontFamily : FontWoo }}>You Selected:</h6>
                    <span style={spanStyle}>
                    <div>
                        <Label style={{ marginBottom: '0px' }}>
                            <Input
                                defaultChecked={true}
                                type="radio"
                                name="type"
                                value="Seller"
                                />
                            {/* Seller */}
                            {(this.props.type === 'Buyer + Seller')?("Buyer + Seller"):(this.props.type)}
                        </Label>
                                </div>
                    </span>
                    <h4>Keep an eye on your inbox</h4>
                    <h5>We'll be in touch soon :3</h5>

                    <a href="mailto:support@nombox.app?Subject=Hello%20Nombox" target="_top">Contact Nombox</a>
                </div>
            </div>
        );
    }
}
function mapStateToProp(state) {
    return {
        formSuccess: state.root.formSuccess,
        type: state.root.type,
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
)(ConfirmationMessage);

const spanStyle = { margin: '0 auto', marginBottom: '6%', backgroundColor: 'white', width: '60%', display: 'flex', justifyContent: 'center', borderRadius: 18, height: '45px', alignItems: 'center', border: '0.5px black solid' };
const stylesFont={fontFamily: FontWoo}