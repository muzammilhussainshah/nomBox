import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Button, Input, Picker, Item } from 'native-base';
import FIcon from 'react-native-vector-icons/FontAwesome'
import { sentMessageAction } from '../Store/Action/action'
import { connect } from "react-redux";
import firebase from 'react-native-firebase'

class ChatInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            sessionKey: ''
        }
    }
    sendMessage = () => {
        this.props.sentMessage(this.state.message, this.props.sessionKey, this.props.orderKey, this.props.isNewSession, this.props.recieverId)
        this.setState({ message: '' })
    }

    render() {
        console.log(this.props.recieverId, "recieverId")
        console.log(this.props.orderKey, "orderKey")
        console.log(this.props.isNewSession, "this.props.isNewSession")
        console.log(this.props.sessionKey, "this.props.sessionKey")

        return (
            <View style={{ alignItems: 'center' }}>
                <Item style={styles.inputDescription} >
                    <Input
                        placeholder={"Say something..."}
                        placeholderTextColor="#999999"
                        onChangeText={(e) => { this.setState({ message: e }) }}
                        value={this.state.message}
                    />
                    {this.state.message !== '' ?
                        <TouchableOpacity onPress={this.sendMessage} style={styles.button}>
                            <FIcon name={'send'} size={26} color="#454F63" />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => console.log('Working')} style={styles.button}>
                            <Icon name={'plus'} size={26} color="#454F63" />
                        </TouchableOpacity>
                    }
                </Item>

            </View >

        )
    }
}

const styles = StyleSheet.create({
    button: {
        right: 16
    },
    inputDescription: {
        width: '97%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        height: 63
    },
})



let mapStateToProps = state => {
    return {


    };
};
function mapDispatchToProps(dispatch) {
    return ({
        sentMessage: (message, sessionKey, orderKey, isNewSession, recieverId) => {
            dispatch(sentMessageAction(message, sessionKey, orderKey, isNewSession, recieverId))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
