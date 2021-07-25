import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

// import * as fb from 'firebase';
import firebase from 'react-native-firebase';

import Loading from '../Component/Loader';
import ErrorMessage from '../Component/errorMessage';





import {
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";


import {
    Container, Header, Content, Tab, Tabs, Button, Input,
    Item, View,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class SocialRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };


    }
    logout = () => {
        firebase.auth().signOut()
    }


    socialSignup = () => {
        console.log(firebase.auth().currentUser, 'USER')
        let email = firebase.auth().currentUser.email
        if (email !== null) {
            firebase.auth().currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(email, this.state.password))
                .then((userCred) => {
                    console.log(userCred, "userCred")
                    alert("User created successfully")
                    Actions.RoleScreen()
                }).catch((error) => {
                    console.log(error, "ERROR")
                    alert(error)
                    Actions.signUp()
                })
        }
        else {
            firebase.auth().currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(this.state.email, this.state.password))
                .then((userCred) => {
                    console.log(userCred, "userCred")
                    Actions.RoleScreen()
                }).catch((error) => {
                    console.log(error, "ERROR")
                    alert(error)
                    Actions.signUp()
                })
        }
        // let credential;
        // if (this.props.credentials.email !== null) {
        //     // let email = this.props.credentials.email
        //     // console.log()

        //     firebase.auth().currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(googleUser.email, this.state.password))
        //         .then((userCred) => {

        //             console.log(userCred, "userCred")
        //         }).catch((error) => {
        //             console.log(error, "ERROR")
        //             alert(error)
        //         })

        //     // credential = firebase.auth.EmailAuthProvider.credential(email, this.state.password)
        // }
        // else {

        //     credential = firebase.auth.EmailAuthProvider.credential(this.state.email, this.state.password)
        // }
        // console.log(credential, "credentialEmail")
        // // this.setState({ message: 'Code Confirmed!' });
        // firebase.auth().currentUser.linkWithCredential(credential).then((userCred) => {
        //     console.log(userCred, "userCred")
        //     let userData = {
        //         uid: userCred.user.uid,
        //         userEmail: userCred.user.email,
        //         phoneNumber: userCred.user.phoneNumber,
        //         date: Date.now()
        //     }
        //     console.log(userData, "userData")
        //     firebase.database().ref('users/' + userData.uid + '/').set(userData)
        //     // let authFirebase = firebase.auth().currentUser
        //     Actions.RoleScreen({ uid: userData.uid })
        // }).catch((error) => {
        //     console.log(error, "ERROR")
        //     alert(error)
        // })

    }

    render() {
        // console.log(this.props.googleCredential, "googleCredentialsocialRegistrtation")
        // console.log(this.props.credentials, "credentialsSOCIAl")
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#2A2E43",
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: '3%'
                // backgroundColor: "red",

            }}>
                <TouchableOpacity onPress={this.logout}>
                    <Text style={{ fontSize: 30, color: 'red', marginBottom: '4%' }}>Logout</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, color: 'white' }}>
                    Social Auth
                </Text>
                {
                    (firebase.auth().currentUser.email !== null) ?
                        (
                            <Item style={styles.input}>
                                <Input
                                    placeholder={"Email"}
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    disabled
                                    style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                                    value={firebase.auth().currentUser.email}
                                    defaultValue={firebase.auth().currentUser.email}
                                />
                                <Icon name='email' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                            </Item>
                        ) : (
                            <Item style={styles.input}>
                                <Input
                                    placeholder={"Email"}
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    keyboardType={'email-address'}
                                    style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                                    onChangeText={(e) => { this.setState({ email: e }) }}
                                    value={this.state.email}
                                />
                                <Icon name='email' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                            </Item>

                        )
                }
                <Item style={styles.input}>
                    <Input
                        secureTextEntry
                        placeholder={"Password"}
                        placeholderStyle={{ fontSize: 10 }}
                        placeholderTextColor="#b3b3b3"
                        style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                        onChangeText={(e) => { this.setState({ password: e }) }}
                        value={this.state.password}
                    />
                    <Icon name='cellphone-lock' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                </Item>
                <Button
                    block
                    onPress={this.socialSignup}
                    style={{ width: "100%", backgroundColor: '#7155FE', height: 49, justifyContent: "center", borderRadius: 18 }}
                >
                    <Text style={{ color: "white" }}>Signup</Text>
                </Button>



            </View>
        );
    }
}
let mapStateToProps = state => {
    return {
        socialCredentials: state.root.socialCredentials

    };
};
function mapDispatchToProps(dispatch) {
    return ({

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SocialRegistration);
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