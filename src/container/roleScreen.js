import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Button, View } from 'native-base';
import * as Animatable from 'react-native-animatable';
import firebase from "react-native-firebase";
import ActionTypes from "../Store/Constant/constant";

class RoleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primary: 'Buyer',
            secondary: 'Seller',
            error: false,
            loader: false
        };


    }

    onRoleSubmit = () => {
        let obj = {}
        let user = firebase.auth().currentUser
        console.log(user, "currentUserDATA")
        if (this.state.primary === '') {
            this.setState({ error: true })
        } else {

            // obj.email = user.email,
            // obj.phoneNumber = user.phoneNumber,
            obj.primary = this.state.primary,
                obj.secondary = this.state.secondary
            this.props.roles(obj)

// when navigate back next button continoeusly loading
            // this.setState({ loader: true })
            
            
            if (obj.primary == 'Seller') {
                console.log("HOMESELLERROLE")
                Actions.HomeSeller()
            }
            else {
                console.log("BUYER ROLEs")
                Actions.BuyerHome()
            }

            // obj.uid = user.uid,
            // obj.date = Date.now()

            // firebase.database().ref('users/' + user.uid + '/').set(obj)
            //     .then(() => {
            //         if (obj.primary == 'Seller') {
            //             console.log("HOMESELLERROLE")
            //             Actions.HomeSeller()
            //         }
            //         else {
            //             console.log("BUYER ROLEs")
            //             Actions.BuyerHome()
            //         }
            //     })

        }
    }

    render() {
        // console.log(this.props.uid, "UID")
        return (
            <View style={{
                flex: 1,
                // backgroundColor: "#EFF1F3",
                // alignItems: 'center',
                justifyContent: 'center'
                // backgroundColor: "red",

            }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Animatable.View animation="slideInLeft" iterationCount={1} style={{ flex: 1, zIndex: 1000, position: 'absolute' }}>
                        <Image resizeMode='contain' source={require('../assets/role/drawable-ldpi/cloudLeft.png')} />
                    </Animatable.View>
                    <Animatable.View animation="slideInDown" iterationCount={1} style={{ marginLeft: '20%', flex: 1, zIndex: -1000 }}>
                        <Image source={require('../assets/role/drawable-ldpi/sun.png')} />
                    </Animatable.View>
                    <Animatable.View animation="slideInDown" iterationCount={1} style={{ flex: 1 }}>
                        <Image source={require('../assets/role/drawable-ldpi/cloudCenter.png')} />
                    </Animatable.View>
                    <Animatable.View animation="slideInRight" iterationCount={1} style={{ flex: 1 }}>
                        <Image source={require('../assets/role/drawable-ldpi/cloudRight.png')} />
                    </Animatable.View>
                </View>
                <View style={{ flex: 1, marginLeft: '8%' }}>
                    <Text style={{ fontSize: 40, color: 'black' }}>
                        Start as a...
                </Text>
                    {
                        this.state.error ? <Text style={{ color: 'red' }}>Please select a role</Text> : null}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '8%' }}>

                    <Animatable.View >
                        <TouchableOpacity onPress={() => this.setState({ primary: 'Buyer', secondary: 'Seller', error: false })}>
                            <Text style={{ fontSize: 30, color: 'black' }}>
                                Buyer
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View>
                        <TouchableOpacity onPress={() => this.setState({ primary: 'Seller', secondary: 'Buyer', error: false })}>
                            <Text style={{ fontSize: 30, color: 'black' }}>
                                Seller
                    </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                    {/* <Animatable.View > */}
                    {this.state.primary == "Buyer" ?
                        <Animatable.Image animation="bounceInLeft" iterationCount={1} source={require('../assets/role/drawable-mdpi/rectangle.png')} style={{ position: 'absolute', bottom: 21, left: 12 }} />
                        : null
                    }
                    {this.state.primary == "Seller" ?
                        <Animatable.Image animation="bounceInRight" iterationCount={1} source={require('../assets/role/drawable-mdpi/rectangle.png')} style={{ position: 'absolute', bottom: 21, right: 10 }} />
                        : null
                    }
                    {/* </Animatable.View> */}
                </View>

                <View style={{ bottom: 100, position: 'absolute', zIndex: 1000, flex: 3, flexDirection: 'row' }}>
                    <View style={{ marginTop: '40%', marginLeft: '10%', paddingLeft: '3%' }}>
                        <Image source={require('../assets/role/drawable-ldpi/umbrella.png')} />
                    </View>
                    <View style={{ marginLeft: '12%' }}>
                        <Image source={require('../assets/role/drawable-ldpi/person.png')} />
                    </View>
                </View>

                {this.state.loader == true ?
                    <Button
                        block
                        style={{ zIndex: 1000, bottom: 20, alignSelf: 'center', position: 'absolute', width: "80%", backgroundColor: '#7155FE', height: 49, borderRadius: 18, marginTop: 20 }}
                    >
                        <ActivityIndicator size={20} color='#fff' />
                    </Button> :
                    <Button
                        block
                        style={{ zIndex: 1000, bottom: 20, alignSelf: 'center', position: 'absolute', width: "80%", backgroundColor: '#7155FE', height: 49, borderRadius: 18, marginTop: 20 }}
                        onPress={this.onRoleSubmit}
                    >
                        <Text style={{ color: "white" }}>NEXT STEP</Text>
                    </Button>
                }


                <Animatable.View animation="slideInUp" iterationCount={1} style={{ flex: 3, alignSelf: 'center' }}>
                    <Image source={require('../assets/role/drawable-ldpi/mountain.png')} />
                </Animatable.View>


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
        roles: (obj) => {
            dispatch({ type: ActionTypes.ROLES, payload: obj })
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleScreen);
const styles = StyleSheet.create({



});