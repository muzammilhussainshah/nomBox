import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux'
import ErrorMessage from '../Component/errorMessage';
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { Button, Input, Item, View, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneInput from 'react-native-phone-input';
import CodeInput from 'react-native-confirmation-code-input';
import firebase from 'react-native-firebase'


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeInput: '',
            number: '',
            countryCode: '',
            num: '',
            confirm: false,
            loader: false,
            confirmCode: {}
        };


    }

    phoneAuthenticate = () => {
        this.setState({ loader: true })
        let num = this.state.num
        firebase.auth().signInWithPhoneNumber(num)
            .then(
                (confirmResult) => {
                    this.setState({ confirm: true, loader: false, confirmCode: confirmResult })
                    console.log(confirmResult, 'confirmResult')
                }
            )
            .catch((error) => {
                this.setState({ message: `Sign In With Phone Number Error: ${error.message}` })
                console.log(error, "ERROR")
                alert(JSON.stringify(error))
            });
    }

    codeAuthenticate = () => {
        let codeInput = this.state.codeInput
        this.setState({ loader: true })
        this.state.confirmCode.confirm(codeInput)
            .then((user) => {
                console.log(user, "USER")
                // alert("Number verified successfully")
            })
            .catch((error) => {
                console.log(error, "errorcodeconfirmation")
                alert(error)
            });
    }

    render() {

        return (
            <View style={{
                flex: 1,
                backgroundColor: "#2A2E43"
            }}>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: "5%",
                        justifyContent: 'center',
                    }}
                >
                    {(this.state.confirm == true) ? (
                        <View >
                            <View style={{ alignItems: 'center', paddingBottom: '10%' }}>
                                <Text style={{ color: '#fff', fontSize: 16, marginLeft: '1%' }}>Enter 6 digits code:</Text>
                                <CodeInput
                                    ref="codeInputRef"
                                    secureTextEntry
                                    className={'border-b'}
                                    space={5}
                                    size={40}
                                    codeLength={6}
                                    inputPosition='center'
                                    onFulfill={(code) => this.setState({ codeInput: code })}
                                />
                            </View>
                            {
                                (this.state.loader == true) ? (
                                    <Button
                                        style={{ width: "100%", height: 49, justifyContent: "center", alignItems: "center", borderRadius: 18, marginTop: 20 }}
                                    >
                                        <ActivityIndicator size={20} color="white" />
                                    </Button>
                                )
                                    :
                                    (
                                        <Button
                                            style={{ width: "100%", height: 49, justifyContent: "center", alignItems: "center", borderRadius: 18, marginTop: 20 }}
                                            onPress={this.codeAuthenticate}
                                        >
                                            <Text style={{ color: "white" }}>Verify Code</Text>
                                        </Button>
                                    )
                            }

                        </View>
                    ) : (
                            <View>
                                <Text style={{ color: '#fff', fontSize: 16, marginLeft: '1%', marginBottom: '3%' }}>Enter your phone number:</Text>
                                <View style={{ backgroundColor: 'grey', borderRadius: 18, paddingHorizontal: 10, paddingVertical: 15 }}>
                                    <PhoneInput
                                        textStyle={{ fontSize: 18, color: 'white' }}
                                        flagStyle={{ marginLeft: 5 }}
                                        onSelectCountry={(value, dialCode) => {
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
                                {
                                    (this.state.loader == true) ? (
                                        <Button
                                            style={{ width: "100%", height: 49, justifyContent: "center", alignItems: "center", borderRadius: 18, marginTop: 20 }}
                                        >
                                            <ActivityIndicator size={20} color="white" />
                                        </Button>
                                    )
                                        :
                                        (<Button
                                            style={{ width: "100%", height: 49, justifyContent: "center", alignItems: "center", borderRadius: 18, marginTop: 20 }}
                                            onPress={this.phoneAuthenticate}
                                        >
                                            <Text style={{ color: "white" }}>Verify Number</Text>
                                        </Button>)
                                }
                            </View>
                        )}









                    <View style={{ marginTop: 20, alignSelf: 'center' }}>
                        <Text
                            onPress={() =>
                                Actions.signIn()
                            }
                            style={{ color: "#959DAD", textDecorationLine: "underline" }}>Back to signin</Text>
                    </View>

                </View>
            </View>
        );
    }
}
let mapStateToProps = state => {
    return {
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,

    };
};
function mapDispatchToProps(dispatch) {
    return ({

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        backgroundColor: '#454F63',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#454F63',

        width: '100%',
        borderRadius: 18
    },


});