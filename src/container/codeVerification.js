import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from 'react-native-firebase'
import CodeInput from 'react-native-confirmation-code-input';
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import { Button, View } from 'native-base';


class CodeVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeInput: '',
            loader: false
        };
    }


    resendCode = () => {
        this.setState({ loader: false })
        firebase.auth().signInWithPhoneNumber(this.props.phone)
            .then(
                (confirmResult) => {
                    console.log(confirmResult, 'confirmResult')
                    alert('code has been sent')

                }
            )
            .catch((error) => {

                alert(JSON.stringify(error))
            });
    }


    confirmCode = () => {
        let codeInput = this.state.codeInput
        this.setState({ loader: true })
        this.props.confirmResult.confirm(codeInput)
            .then((user) => {
                console.log(user, "USER")
                alert("Number verified successfully")
            })
            .catch((error) => {
                console.log(error, "errorcodeconfirmation")
                alert(error)
            });

    };




    render() {
        console.log(this.props.confirmResult, "confirmResult")
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
                            Verification
                        </Text>
                        <Text style={{ color: 'white', fontSize: 50 }}>
                            Code:
                        </Text>
                    </View>


                    <View style={{ alignItems: 'center' }}>
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
                        <Text style={{ color: 'grey', marginTop: '4%' }}>
                            Type your 6 digit verification code here
                            </Text>
                    </View>

                    <View style={{ flex: 1, marginTop: '12%' }}>
                        <Button
                            block
                            onPress={this.resendCode}
                            style={{ width: "100%", height: 49, backgroundColor: '#3CC9E0', justifyContent: "center", borderRadius: 18 }}
                        >
                            <Text style={{ color: "white" }}>RESEND SMS</Text>
                        </Button>
                    </View>
                    <View style={{ flex: 1, marginTop: '6%' }}>
                        {
                            this.state.loader ?
                                <Button
                                    block
                                    style={{ width: "100%", backgroundColor: '#7155FE', height: 49, justifyContent: "center", borderRadius: 18 }}
                                >
                                    <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                                </Button>
                                :
                                <Button
                                    block
                                    onPress={this.confirmCode}
                                    style={{ width: "100%", backgroundColor: '#7155FE', height: 49, justifyContent: "center", borderRadius: 18 }}
                                >
                                    <Text style={{ color: "white" }}>VERIFY</Text>
                                </Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(CodeVerification);
