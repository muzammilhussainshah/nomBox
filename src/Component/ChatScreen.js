import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image, Text, ActivityIndicator, StatusBar, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import Avatar from 'react-native-badge-avatar';
import firebase from 'react-native-firebase';
import Header from './Header'
import ChatInput from './ChatInput'
import Messages from './Messages'
import ActionTypes from '../Store/Constant/constant';
import { ActionSheet } from 'native-base';
const height = Dimensions.get('window').height;
import { connect } from "react-redux";

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewSession: true,
            chatId: ''
        }
    }

    checkSession = (isNewSession) => {
        console.log(isNewSession, "sessionFleg")
        this.setState({ isNewSession: isNewSession })
    }

    // componentWillUnmount() {
    //     this.props.clearMessages()
    // }

    componentDidMount() {
        let senderId = firebase.auth().currentUser.uid
        if (this.props.chatKeys == null || this.props.chatKeys == undefined) {  //newSession
            if (senderId > this.props.recieverId) {
                this.setState({ chatId: senderId + this.props.recieverId })
            }
            else {
                this.setState({ chatId: this.props.recieverId + senderId })
            }

            let sessionKey = firebase.database().ref('Chats/' + this.state.chatId + '/').push().key;
            this.setState({ sessionKey: sessionKey })
            // this.props.sentMessage(this.state.message, sessionKey, this.props.orderKey, this.props.isNewSession, this.props.chatKeys.recieverId, this.state.chatId)

        }

        // if (this.state.isNewSession == true) { //new session
        //     let sessionKey = firebase.database().ref('Chats/' + this.state.chatId + '/').push().key;
        //     this.setState({ sessionKey: sessionKey })
        //     this.props.sentMessage(this.state.message, sessionKey, this.props.orderKey, this.props.isNewSession, this.props.chatKeys.recieverId, this.state.chatId)

        // }
        // else {
        //     console.log('elsechatinput')
        //     this.props.sentMessage(this.state.message, this.state.sessionKey, this.props.orderKey, this.props.isNewSession, this.props.chatKeys.recieverId, chatId)

        // }
    }

    render() {
        console.log(height, "height")
        let recieverId = this.props.chatKeys == null ? this.props.recieverId : this.props.chatKeys.recieverId
        let orderKey = this.props.chatKeys == null ? this.props.orderKey : this.props.chatKeys.orderKey
        let sessionKey = this.props.chatKeys == null ? this.state.sessionKey : this.props.chatKeys.sessionKey
        console.log(recieverId, "recieverId")
        console.log(orderKey, "orderKey")
        return (
            <View style={{ flex: 1 }}>

                <Header screen={'ChatScreen'} chatName={'Test User'}  />
                <Messages recieverId={recieverId} checkSession={this.checkSession} orderKey={orderKey} sessionKey={sessionKey} />
                <ChatInput recieverId={recieverId} sessionKey={sessionKey} orderKey={orderKey} style={{ alignSelf: 'center' }} isNewSession={this.state.isNewSession} chatId={this.state.chatId} />

            </View >

        )
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        clearMessages: () => {
            dispatch({ type: ActionTypes.CLEARCHAT })
        }
    })
}
const styles = StyleSheet.create({
})
export default connect(null, mapDispatchToProps)(ChatScreen);
