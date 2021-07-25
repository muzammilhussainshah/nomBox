import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux'
import firebase from 'react-native-firebase'
import PhoneInput from 'react-native-phone-input';
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import { Button, View, } from 'native-base';

class PhoneVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeInput: '',
      number: '',
      countryCode: '',
      num: '',
      isLoader: false
    };


  }
  verifyPhone = () => {
    let num = this.state.num
    this.setState({ isLoader: true })
    firebase.auth().signInWithPhoneNumber(num)
      .then(
        (confirmResult) => {
          alert(JSON.stringify(confirmResult))
          Actions.CodeVerification({ confirmResult: confirmResult, phone: num })

        }
      )
      .catch((error) => {
        this.setState({ message: `Sign In With Phone Number Error: ${error.message}` })
        console.log(error, "ERROR")
        alert(JSON.stringify(error))
      });

  }

  render() {
    // alert(this.props.authType)
    console.log(this.props.authType, "YTPE")
    // console.log(this.props.authFirebase, "AUTHFIREBASE")
    // console.log(this.props.credentials, "AUTHFIREBASE")
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#2A2E43",
        justifyContent: 'center',
        paddingHorizontal: '5%'
      }}>
        <ScrollView>
          <View style={{
            flex: 1,
            paddingVertical: '12%'
          }}>
            <Text style={{ color: 'white', fontSize: 50 }}>
              Enter your phone number:
          </Text>
          </View>


          <View style={{ backgroundColor: 'grey', borderRadius: 18, paddingHorizontal: 10, paddingVertical: 15 }}>
            <PhoneInput
              textStyle={{ fontSize: 18, color: 'white' }}
              flagStyle={{ marginLeft: 5 }}
              onSelectCountry={(value, dialCode) => {
                console.log(dialCode, "DIALCODE")
                console.log(value, "value")
                console.log(value.dialCode, "dialCodeBefore")
                this.setState({
                  countryCode: value.dialCode
                })
                console.log(value.dialCode, "after")
              }}
              onChangePhoneNumber={(value) => {
                console.log(value, "num")
                this.setState({ num: value })

              }}

              ref={ref => (this.phone = ref)}
            />
          </View>

          <View style={{ flex: 1, marginTop: '6%' }}>
            {(this.state.isLoader === true) ?
              (
                <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
              ) :
              (<Button
                block
                onPress={this.verifyPhone}
                style={{ width: "100%", height: 49, justifyContent: "center", borderRadius: 18 }}
              >
                <Text style={{ color: "white" }}>NEXT STEP</Text>
              </Button>)
            }
          </View>
        </ScrollView>
      </View>

    );
  }
}
let mapStateToProps = state => {
  return {


  };
};
function mapDispatchToProps(dispatch) {
  return ({

  })
}
export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerification);

