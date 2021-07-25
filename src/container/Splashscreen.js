import React, { Component } from 'react';
import firebase from 'react-native-firebase'
import ActionTypes from '../Store/Constant/constant';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux'
import { View, Text, ActivityIndicator, Alert } from 'react-native';
// import { deflateRawSync } from 'zlib';
class Splash extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("DIDMOUNT")
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                console.log(user, "USERSPLASH")
                console.log(user.email, "USERSPLASH")
                console.log(user.uid)
                // alert(Actions.currentScene, "ActionscurrentScene")
                console.log(Actions.currentScene, "CURRENTSCREEN")
                if (Actions.currentScene == 'CodeVerification') {
                    console.log(this.props.socialCredentials, "this.props.socialCredentials")
                    console.log(Object.keys(this.props.socialCredentials).length, "this.props.socialCredentials).length")
                    if (this.props.socialCredentials && Object.keys(this.props.socialCredentials).length !== 0) {
                        console.log('socialRegistration')
                        firebase.auth().currentUser.linkWithCredential(this.props.socialCredentials).then((userCred) => {
                            console.log(userCred, "userCred successfully")
                            Actions.SocialRegistration()
                        })
                    }
                    else {
                        let email = this.props.emailCredentials.email
                        let password = this.props.emailCredentials.password
                        const credential = firebase.auth.EmailAuthProvider.credential(email, password)
                        console.log(credential, "credentialEmail")
                        firebase.auth().currentUser.linkWithCredential(credential).then((userCred) => {
                            console.log(userCred, "userCred")
                            let userData = {
                                uid: userCred.user.uid,
                                userEmail: userCred.user.email,
                                phoneNumber: userCred.user.phoneNumber,
                                date: Date.now()
                            }
                            console.log(userData, "userData")
                            firebase.database().ref('users/' + user.uid + '/').set(userData)
                            Actions.RoleScreen({ uid: user.uid })
                        }).catch((error) => {
                            console.log(error, "ERROR")
                            alert(error)
                        })
                        Actions.RoleScreen({ uid: user.uid })
                    }
                } else if (Actions.currentScene === "forGotPassword") {
                    console.log('checkRouteSocial')
                    let user = firebase.auth().currentUser
                    let email = firebase.auth().currentUser.email
                    console.log(user, "USER", email, "EMAIL")
                    firebase.auth().signOut()
                    console.log(user, "USER", email, "EMAIL")
                    Actions.EmailVerification({ email })

                } else if (Actions.currentScene === "SocialRegistration") {
                    console.log('checkRouteSocial')
                    Actions.SocialRegistration()
                }
                else {

                    if (this.props.orderDetails == null || this.props.orderDetails.length == 0) {
                        console.log("CALLED BUYERHOME")
                        console.log(user.uid, 'userUIDINSIDE')
                        firebase.database().ref('users/' + user.uid + '/').once('value', (snapshot) => {
                            let data = snapshot.val()
                            console.log(data, "dataSplashScreen")
                            if (data.primary == "Seller") {
                                console.log("HOMESELLERROLESplash")
                                Actions.HomeSeller()
                            }
                            else if (data.primary == "Buyer") {
                                console.log("BUYER ROLEs splash")
                                Actions.BuyerHome()
                            }
                        })
                    }
                    else {
                        firebase.database().ref('users/' + user.uid + '/').set(this.props.roles)
                            .then(() => {
                                console.log(this.props.roles, "this.props.roles")
                                this.props.clearRoles()
                                Actions.PaymentCard()
                            })
                    }
                }

            }
            else {
                // if (Actions.currentScene !== 'EmailVerification') {

                //     Actions.signIn()
                // }
                Actions.RoleScreen()
                console.log('no user')
            }
        })
    }
    render() {
        return (
            <View style={{
                backgroundColor: "#2A2E43",
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View >
                    <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#fff', paddingVertical: 5 }}>
                        Nombox App
             </Text>

                </View>
                <ActivityIndicator size={100} color="#fff" style={{ paddingBottom: 5 }} />
                <View><Text style={{ color: '#fff', fontSize: 18 }}>Loading...</Text></View>
            </View>
        )
    }
}

let mapStateToProps = state => {
    console.log(state, 'REDUXSTATE')
    return {
        emailCredentials: state.root.emailCredentials,
        socialCredentials: state.root.socialCredentials,
        roles: state.root.roles,
        orderDetails: state.root.orderDetails,


    };
};
function mapDispatchToProps(dispatch) {
    return ({
        clearRoles: () => {
            dispatch({ type: ActionTypes.CLEARROLES })
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);