import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { sendFormDataAction } from "../store/action/action";
import { InputGroup, InputGroupAddon, Label, Input, Button, FormFeedback } from "reactstrap";
import userIcon from "../assets/Group 2574.png";
import emailIcon from "../assets/Group 2571.png";
import phoneIcon from "../assets/Group 2572.png";
import mapIcon from "../assets/Group 2573.png";
import ActionTypes from "../store/constant/constant";
import Font from '../fonts/Gibson-Regular.ttf'
var focusVar;
class EarlyAccessForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            email: "",
            phone: "",
            postalCode: "",
            invalidPostal: false,
            invalidField: false,
            invalidName: false,
            type: '',
            success: false,
            invalidMessage: ''
        };
    }
    onChangeType = e => {
        console.log(e.target.value, "radio");
        this.setState({ type: e.target.value, invalidType: false });
    };

    validate = email => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        console.log(
            expression.test(String(email).toLowerCase()),
            "expression.test(String(email).toLowerCase())"
        );
        return expression.test(String(email).toLowerCase());
    };

    onSubmit = () => {
        if (this.state.email === "") {
            this.setState({ invalidField: true });
        }
        if (this.state.postalCode === "" || (this.state.postalCode.length !== 6 || this.state.postalCode.length !== 5)) {
            this.setState({
                invalidPostal: true,
                invalidMessage: 'Please enter a valid Postal/Zip Code'
            });
        }
        if (this.state.fullName === "") {
            this.setState({ invalidName: true });
        }
        if (this.state.type === "") {
            console.log(this.state.type, "type------------")
            this.setState({ invalidType: true })
        }
        if (this.state.fullName !== "" && this.state.email !== "" && this.state.postalCode !== "" && (this.state.postalCode.length === 6 || this.state.postalCode.length === 5)) {
            let validEmail = this.validate(this.state.email);
            console.log(validEmail, "validEmail");
            console.log(this.state, "AllData");
            if (validEmail === false) {
                this.setState({ invalidEmail: true });
            } else {
                let formData = {
                    fullName: this.state.fullName,
                    email: this.state.email,
                    phone: this.state.phone,
                    postalCode: this.state.postalCode,
                    type: this.state.type
                };
                this.props.sendFormData(formData);
                this.setState({
                    fullName: "",
                    email: "",
                    phone: "",
                    postalCode: "",
                    invalidField: false,
                    invalidType: false,
                    invalidPostal: false,
                    invalidMessage: '',
                    type: ''
                });
            }
        }
    };
    toggle = () => {
        this.setState(() => ({
            fullName: "",
            email: "",
            phone: "",
            postalCode: "",
            invalidField: false,
            type: false
        }));
        this.props.toggleFalse();
    };

    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps.focus, "focusChekc")
        if (nextProps.focus !== !nextProps.focus) {
            this.myInp.focus()
            console.log(this.myInp, "myIno")
        }
    }
    render() {
        console.log(this.props.focus, 'Focus')
        return (
            <div 
            // style={{backgroundColor:"red"}}
            >
            <div style={{width:"95%"
            ,marginLeft:"2.5% ",
            // backgroundColor:"green"
            }}>

           

                    <p className='formHeading' style={{  paddingTop:11,paddingBottom:11,fontFamily: Font }}>Sign Up for Early Access</p>


                <InputGroup size="lg" style={input}>
                    <InputGroupAddon style={this.state.invalidName === true ? inputError : inputIcon} addonType="prepend">
                        <img alt="icon" width="30" height="30" src={userIcon} />
                    </InputGroupAddon>
                    <Input
                        // autoFocus={this.props.focus}
                        // ref={(ip) => focusVar = ip}
                        innerRef={(ip) => this.myInp = ip}
                        invalid={this.state.invalidName}
                        value={this.state.fullName}
                        placeholder="Full Name"
                        style={styleInputField}
                        onChange={e => {
                            this.setState({
                                invalidName: false,
                                fullName: e.target.value
                            });
                        }}
                    />

                </InputGroup>
                <InputGroup size="lg" style={input}>
                    <InputGroupAddon style={(this.state.invalidField === true || this.state.invalidEmail === true) ? inputError : inputIcon} addonType="prepend">
                        <img alt="icon" width="28" height="26" src={emailIcon} />
                    </InputGroupAddon>
                    <Input
                        invalid={this.state.invalidField || this.state.invalidEmail}
                        value={this.state.email}
                        placeholder="Email"
                        style={styleInputField}
                        email="true"
                        onChange={e => {
                            this.setState({
                                invalidEmail: false,
                                invalidField: false,
                                email: e.target.value
                            });
                        }}
                    />
                    {this.state.invalidEmail === true ? (
                        <FormFeedback>* Email is not valid</FormFeedback>
                    ) : null}
                </InputGroup>
                <InputGroup size="lg" style={input}>
                    <InputGroupAddon style={inputIcon} addonType="prepend">
                        <img alt="icon" width="26" height="26" src={phoneIcon} />
                    </InputGroupAddon>
                    <Input
                        type="number"
                        value={this.state.phone}
                        placeholder="Phone Number"
                        style={styleInputField}
                        onChange={e => {
                            this.setState({
                                phone: e.target.value
                            });
                        }}
                    />
                </InputGroup>
                <InputGroup size="lg" style={input}>
                    <InputGroupAddon style={this.state.invalidPostal === true ? inputError : inputIcon} addonType="prepend">
                        <img alt="icon" width="30" height="30" src={mapIcon} />
                    </InputGroupAddon>
                    <Input
                        value={this.state.postalCode}
                        invalid={this.state.invalidPostal}
                        placeholder="Postal - Code"
                        style={styleInputField}
                        onChange={e => {
                            this.setState({
                                invalidPostal: false,
                                postalCode: e.target.value
                            });
                        }}
                    />
                </InputGroup>
            </div>

                {(this.state.invalidField === true || this.state.invalidName === true || this.state.invalidPostal === true || this.state.invalidType === true) ?
                    ((this.state.invalidMessage) ? (<p style={{ textAlign: 'right', color: 'red' }}>{this.state.invalidMessage}</p>) : (<p style={{ textAlign: 'right', color: 'red' }}>* Required Fields</p>))
                    : null
                }
                <div style={{ margin: "0 auto", textAlign: "center" }}>
                    <h5 style={{ margin: "10% 0px 3% 0px" }}>
                        What do you want to be ?
              </h5>
                    <div style={this.state.invalidType === true ? invalidRadio : radioDiv}>
                        <div>
                            <span style={spanStyle}>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="type"
                                        value="Buyer"
                                        onChange={this.onChangeType}
                                    />
                                    Buyer
                  </Label>
                            </span>
                            <span style={spanStyle}>
                                <Label>
                                    <Input
                                        type="radio"
                                        name="type"
                                        value="Seller"
                                        onChange={this.onChangeType}
                                    />
                                    Seller
                  </Label>
                            </span>
                            <span style={{ margin: "0px 0px 0px 20px", fontWeight: "600" }}>
                                <Label>
                                    <Input
                                        type="radio"
                                        name="type"
                                        value=" Buyer + Seller"
                                        onChange={this.onChangeType}
                                    />
                                    Both
                  </Label>
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{ padding: "0px 25%" ,height:70}}>
                    <Button
                        onClick={this.onSubmit}
                        style={{ backgroundColor: "#416BE0" }}
                        size="md"
                        block
                    >
                        Get Early Access
              </Button>
                </div>
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
        sendFormData: data => {
            dispatch(sendFormDataAction(data));
        },
        toggleFalse: () => {
            dispatch({ type: ActionTypes.FORMSUCCESS, payload: false });
        }
    };
}

export default connect(
    mapStateToProp,
    mapDispatchToProp
)(EarlyAccessForm);

const input = { marginBottom: "2%",};
const inputIcon = {
    paddingLeft: "2%",
    paddingRight: "2%",
    width: "45px",
    alignItems: "center",
    borderTop: "1px solid #CDD2D9",
    borderLeft: "1px solid #CDD2D9",
    borderBottom: "1px solid #CDD2D9",
    borderRadius: "4px", backgroundColor: '#fff'
};
const inputError = {
    paddingLeft: "2%",
    paddingRight: "2%",
    width: "45px",
    alignItems: "center",
    borderTop: "1px solid red",
    borderLeft: "1px solid red",
    borderBottom: "1px solid red",
    borderRadius: "4px", backgroundColor: '#fff'
};
const styleInputField = { borderLeft: "0px" };
const spanStyle = { margin: "0px 20px 0px 20px", fontWeight: '600' };
const radioDiv = {
    webkitBoxShadow: "1px 3px 1px #9E9E9E",
    mozBoxShadow: "1px 3px 1px #9E9E9E",
    boxShadow: "2px 6px 12px #9E9E9E",

    margin: "0 auto", marginBottom: '5%', backgroundColor: 'rgba(245,245,245,0.6)', borderRadius: 18, paddingTop: 6, width: '60%', display: 'flex', justifyContent: 'center'
};
const invalidRadio = { margin: "0 auto", marginBottom: '5%', backgroundColor: '#fff', borderRadius: 18,
 paddingTop: 6, width: '60%', border: '1px solid red', display: 'flex', justifyContent: 'center' };
export { focusVar }