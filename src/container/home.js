import React, { Component } from "react";
import { connect } from "react-redux";
import ActionTypes from "../Store/Constant/constant";
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


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }
    logout = () => {
        // if(this.props.type === 'fb')
        // {
        //     console.log('fb')
        this.props.clearState()
        firebase.auth().signOut()
        // }
        // else{
        //     console.log('else')
        //     fb.auth().signOut() 

        // }
    }


    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#2A2E43",
                alignItems: 'center',
                justifyContent: 'center'
                // backgroundColor: "red",

            }}>
                <TouchableOpacity onPress={this.logout}>
                    <Text style={{ fontSize: 30, color: 'red', marginBottom: '4%' }}>Logout</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, color: 'white' }}>
                    Home
                </Text>



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
        clearState: () => {
            dispatch({type:ActionTypes.CLEARSTATE})
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
