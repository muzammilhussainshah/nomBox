import React, { Component } from "react";
import { connect } from "react-redux";
import { signinAction } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'
import ErrorMessage from '../Component/errorMessage';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { Button, Input, Item, View, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// var config = {
//     apiKey: "AIzaSyCkWo2gOBHS00Uft4ZtLyeA_bAJUGxDy_k",
//     authDomain: "nombox-1529885929392.firebaseapp.com",
//     databaseURL: "https://nombox-1529885929392.firebaseio.com",
//     projectId: "nombox-1529885929392",
//     storageBucket: "nombox-1529885929392.appspot.com",
//     messagingSenderId: "120528953275"
// };
// firebase.initializeApp(config);


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoader: false
        };


    }


    facebookLogin = async () => {
        LoginManager.logOut()
        try {
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                // throw new Error('User cancelled request'); // Handle this however fits the flow of your app
                console.log('User cancelled request')
            } else {
                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

            }


            // get the access token
            const data = await AccessToken.getCurrentAccessToken();
            console.log(data, "DATAFB")

            if (!data) {
                // throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
                console.log('Something went wrong obtaining the user')
            }

            // create a new firebase credential with the token
            else {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

                console.log(credential, "credentaila")

                // login with credential
                const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

                console.info(JSON.stringify(currentUser.user.toJSON()))
            }
        } catch (e) {
            console.error(e);
        }
    }


    _signInGoogle = async () => {
        try {
            // Add any configuration settings here:
            await GoogleSignin.configure();

            const data = await GoogleSignin.signIn();
            console.log(data.idToken, "token")
            console.log(data.accessToken, "accessToken")
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            // login with credential
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

            console.info(JSON.stringify(currentUser.user.toJSON()));
        } catch (e) {
            console.error(e);
        }
    }

    // _signInGoogle = () => {
    //     GoogleSignin.hasPlayServices().then(() => {
    //         console.log("HAS SERVICES")
    //     }).catch((err) => {
    //         console.log("Play service error", err.code, err.message);
    //     })

    //     GoogleSignin.configure({
    //         webClientId: '120528953275-l9vpn7p45qc828vmm2726hus9jhit1si.apps.googleusercontent.com'
    //     });

    //     GoogleSignin.signIn()
    //         .then(accessTokenData => {
    //             // alert(JSON.stringify(accessTokenData))
    //             console.log(accessTokenData, "signin++++++++++++");
    //             const credential = firebase.auth.GoogleAuthProvider.credential(
    //                 accessTokenData
    //             );
    //             // alert(JSON.stringify(credential))
    //             firebase
    //                 .auth()
    //                 .signInWithCredential(credential)
    //                 .then(function (user) {
    //                     // alert(JSON.stringify(user))

    //                     console.log("Sign In Success", user);
    //                     Actions.Home({ type: 'fb' })
    //                 });
    //             GoogleSignin.signOut()
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             console.log(JSON.stringify(err))

    //             // console.log("WRONG SIGNIN----------", err);
    //         });

    // };

    render() {

        return (
            <View style={{
                flex: 1,
                // height: "100%" 
                backgroundColor: "#2A2E43"
            }}>


                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 15,
                    marginHorizontal: "10%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // marginTop:
                    // backgroundColor:"yellow",
                }}>

                    <Button
                        style={{
                            width: "45%", height: 40, justifyContent: "center",
                            alignItems: "center", borderRadius: 18,
                        }}
                        onPress={() =>
                            Actions.signIn()
                        }

                    >
                        <Text style={{ color: "white" }}>SIGN IN</Text>
                    </Button>


                    <Button
                        style={{
                            width: "45%", height: 40, justifyContent: "center",
                            alignItems: "center", borderRadius: 18, backgroundColor: "#2A2E43",
                            borderColor: "#2A2E43"
                        }}
                        onPress={() =>
                            Actions.signUp()
                        }
                    >
                        <Text style={{ color: "white" }} >SIGN UP</Text>
                    </Button>

                </View>



                <View
                    style={{
                        flex: 8,
                        marginHorizontal: "5%",
                        alignItems: "center",
                        marginTop: 25
                        // backgroundColor: "red",
                    }}
                >
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



                    {
                        (this.state.isLoader === true && this.props.isError === false) ?
                            (
                                <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                            ) :
                            (

                                <Button
                                    style={{ width: "100%", height: 49, justifyContent: "center", 
                                    alignItems: "center", borderRadius: 18, marginTop: 20 }}
                                    onPress={() => {
                                        this.props.getUserSignIn(this.state)
                                        this.setState({
                                            isLoader: true
                                        })
                                    }}
                                >
                                    <Text style={{ color: "white" }}>Sign In</Text>

                                </Button>
                            )
                    }

                    {
                        (this.props.isError === true) ? (
                            <View style={{ width: "90%" }}>
                                <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                            </View>

                        ) : null
                    }


                    <View style={{ marginTop: 20 }}>
                        <Text
                            onPress={() =>
                                Actions.forGotPassword()
                            }
                            style={{ color: "#959DAD", textDecorationLine: "underline" }}>Forgot Password?</Text>
                    </View>



                    <View style={{ marginTop: 25 }}>
                        <Item style={{ borderBottomColor: "#2A2E43" }}>
                            <View><Text style={{ top: -3, color: "#959DAD" }}>____________________</Text></View>
                            <Text
                                style={{ color: "red", marginHorizontal: 8 }}
                            >OR</Text>
                            <View><Text style={{ top: -3, color: "#959DAD" }}>____________________</Text></View>
                        </Item>
                    </View>


                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        marginTop: 15,
                        justifyContent: "space-between",
                        alignItems: "center",
                        // backgroundColor:"yellow",
                    }}>

                        <Button
                            style={{
                                width: "45%", height: 50, justifyContent: "center",
                                alignItems: "center", borderRadius: 10, backgroundColor: "#3A559F"
                            }}
                            onPress={this.facebookLogin}
                        >
                            <Icon name='facebook' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                            <Text style={{ color: "white", left: -10 }}>Facebook</Text>
                        </Button>


                        <Button
                            style={{
                                width: "45%", height: 50, justifyContent: "center",
                                alignItems: "center", borderRadius: 10, backgroundColor: "#ffff",
                                borderColor: "#2A2E43"
                            }}
                            onPress={this._signInGoogle}
                        >

                            <Image style={{ width: 30, height: 22, marginRight: 20 }}
                                source={require('../assets/Images/google.jpg')}
                                resizeMode="contain"
                            />

                            <Text style={{ color: "#2A2E43", left: -10 }} >Google</Text>
                        </Button>

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
        getUserSignIn: (data) => {
            dispatch(signinAction(data))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
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