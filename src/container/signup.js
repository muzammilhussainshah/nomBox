import React, { Component } from "react";
import { connect } from "react-redux";
import { signUpAction } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'

// import firebase from 'firebase'
import firebase from 'react-native-firebase'
import Loading from '../Component/Loader';
import ErrorMessage from '../Component/errorMessage';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
import ActionTypes from '../Store/Constant/constant'
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


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeatPassword: "",
            isLoader:false
        };


    }

    facebookSignup = async () => {
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
                console.log(credential, "credentails")
                this.props.socialCredentials(credential)
                let type = 'socialSignup'
                console.log(type)
                Actions.PhoneVerification({ authType: type })
            }
        } catch (e) {
            console.error(e);
        }
    }


    _signUpGoogle = async () => {
        try {
            // Add any configuration settings here:
            await GoogleSignin.configure();
            console.log('googelSignupo')
            const data = await GoogleSignin.signIn();
            console.log(data.idToken, "token")
            console.log(data.accessToken, "accessToken")

            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            console.log(credential, "GOOGLESIGNUPCREDS")
            alert(credential)
            this.props.socialCredentials(credential)
            let type = 'socialSignup'
            console.log(type)
            Actions.PhoneVerification({ authType: type })
        } catch (e) {
            console.error(e);
        }
    }


    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#2A2E43"

            }}>
                <View style={{
                    flexDirection: "row",
                    marginTop: 15,
                    marginHorizontal: "10%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                }}>

                    <Button
                        style={{
                            width: "45%", height: 40, justifyContent: "center",
                            alignItems: "center", borderRadius: 18, backgroundColor: "#2A2E43"
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
                            alignItems: "center", borderRadius: 18,
                            borderColor: "#2A2E43"
                        }}
                        onPress={() =>
                            Actions.signUp()
                        }
                    >
                        <Text style={{ color: "white" }} >SIGN UP</Text>
                    </Button>

                </View>
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                >
                    <View
                        style={{
                            marginHorizontal: "5%",
                            alignItems: "center",
                            marginTop: 5,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Button
                            style={{
                                width: "80%", height: 49, justifyContent: "center",
                                alignItems: "center", borderRadius: 18, marginTop: 20,
                                backgroundColor: "#ffff", marginHorizontal: "10%"
                            }}

                            onPress={this._signUpGoogle}
                        >

                            <Image style={{ width: 30, height: 22, marginRight: 20 }}
                                source={require('../assets/Images/google.jpg')}
                                resizeMode="contain"
                            />
                            <Text style={{ color: "#2A2E43" }}>Sign up with Google</Text>
                        </Button>
                        <Button
                            style={{
                                width: "80%", height: 49, justifyContent: "center",
                                alignItems: "center", borderRadius: 18, marginTop: 20,
                                marginHorizontal: "10%"
                            }}

                            onPress={this.facebookSignup}
                        >
                            <Icon name='facebook' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                            <Text style={{ color: "white" }}>Sign up with Facebook</Text>
                        </Button>


                        <View style={{ marginTop: 25 }}>
                            <Item style={{ borderBottomColor: "#2A2E43" }}>
                                <View><Text style={{ top: -3, color: "#959DAD" }}>____________________</Text></View>
                                <Text
                                    style={{ color: "red", marginHorizontal: 8 }}
                                >OR</Text>
                                <View><Text style={{ top: -3, color: "#959DAD" }}>____________________</Text></View>
                            </Item>
                        </View>


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

                        <Item style={styles.input}>
                            <Input
                                secureTextEntry
                                placeholder={"Confirm Password"}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="#b3b3b3"
                                style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                                onChangeText={(e) => { this.setState({ repeatPassword: e }) }}
                                value={this.state.repeatPassword}
                            />
                            <Icon name='cellphone-lock' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                        </Item>
                        {
                            (this.state.isLoader === true) ?
                                (
                                    <ActivityIndicator style={{ top: 10 }} />
                                ) :
                                (
                                    <Button
                                        style={{ width: "100%", height: 49, justifyContent: "center", alignItems: "center", borderRadius: 18, marginTop: 20 }}
                                        onPress={() => {
                                            this.setState({isLoader:true})
                                            this.props.credDispatch(this.state)
                                            Actions.PhoneVerification()
                                        }}
                                    >
                                        <Text style={{ color: "white" }}>CONTINUE</Text>
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
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: "#959DAD", }}>@–read terms of use</Text>
                        </View>
                    </View>
                </ScrollView>
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
        signUpAction: (data) => {
            dispatch(signUpAction(data))
        },
        credDispatch: (obj) => {
            dispatch({ type: ActionTypes.EMAILCREDENTIALS, payload: obj })
        },
        socialCredentials: (obj) => {
            dispatch({ type: ActionTypes.SOCIALCREDENTIALS, payload: obj })
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 50,

    },
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